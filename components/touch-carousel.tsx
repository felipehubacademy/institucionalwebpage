"use client"

import type React from "react"
import { useState, useRef, useEffect, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-media-query"

interface TouchCarouselProps {
  children: ReactNode[]
  className?: string
  itemClassName?: string
  showArrows?: boolean
  showDots?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
  loop?: boolean
  slidesToShow?: number
  gap?: number
  onSlideChange?: (index: number) => void
}

export function TouchCarousel({
  children,
  className,
  itemClassName,
  showArrows = true,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  loop = true,
  slidesToShow = 1,
  gap = 16,
  onSlideChange,
}: TouchCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState(0)
  const [touchEndX, setTouchEndX] = useState(0)
  const [isTouching, setIsTouching] = useState(false)
  const [translateX, setTranslateX] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const totalSlides = children.length
  const maxIndex = Math.max(0, totalSlides - slidesToShow)

  // Update container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  // Handle auto play
  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      if (!isTouching) {
        goToNext()
      }
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, currentIndex, isTouching])

  // Calculate the width of each slide
  const getSlideWidth = () => {
    if (containerWidth === 0) return 0
    return (containerWidth - gap * (slidesToShow - 1)) / slidesToShow
  }

  // Navigate to a specific slide
  const goToSlide = (index: number) => {
    let targetIndex = index

    if (loop) {
      if (index < 0) targetIndex = maxIndex
      if (index > maxIndex) targetIndex = 0
    } else {
      if (index < 0) targetIndex = 0
      if (index > maxIndex) targetIndex = maxIndex
    }

    setCurrentIndex(targetIndex)
    setTranslateX(-(getSlideWidth() + gap) * targetIndex)

    if (onSlideChange) {
      onSlideChange(targetIndex)
    }
  }

  const goToPrev = () => goToSlide(currentIndex - 1)
  const goToNext = () => goToSlide(currentIndex + 1)

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true)
    setTouchStartX(e.touches[0].clientX)
    setTouchEndX(e.touches[0].clientX)

    // Prevent default only for horizontal swipes
    const touchStartY = e.touches[0].clientY

    // Store the initial Y position for later comparison
    const handleTouchMove = (moveEvent: TouchEvent) => {
      const touchCurrentY = moveEvent.touches[0].clientY
      const touchCurrentX = moveEvent.touches[0].clientX

      // Calculate the horizontal and vertical distance moved
      const deltaX = Math.abs(touchCurrentX - e.touches[0].clientX)
      const deltaY = Math.abs(touchCurrentY - touchStartY)

      // If horizontal movement is greater than vertical, it's likely a swipe
      // and we should prevent default to avoid page scrolling
      if (deltaX > deltaY && deltaX > 10) {
        moveEvent.preventDefault()
      }

      setTouchEndX(touchCurrentX)
    }

    const handleTouchEnd = () => {
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)

      setIsTouching(false)

      const diff = touchStartX - touchEndX
      const threshold = getSlideWidth() * 0.2 // 20% of slide width

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          goToNext()
        } else {
          goToPrev()
        }
      } else {
        // Return to current slide if threshold not met
        goToSlide(currentIndex)
      }
    }

    document.addEventListener("touchmove", handleTouchMove, { passive: false })
    document.addEventListener("touchend", handleTouchEnd)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX)

    const diff = touchStartX - touchEndX
    const slideWidth = getSlideWidth() + gap

    // Calculate the new position with resistance at edges
    let newTranslateX = -(currentIndex * slideWidth) - diff

    // Add resistance at edges if not looping
    if (!loop) {
      if (newTranslateX > 0) {
        newTranslateX = newTranslateX / 3
      } else if (newTranslateX < -(maxIndex * slideWidth)) {
        const overscroll = newTranslateX + maxIndex * slideWidth
        newTranslateX = -(maxIndex * slideWidth) + overscroll / 3
      }
    }

    setTranslateX(newTranslateX)
  }

  const handleTouchEnd = () => {
    setIsTouching(false)

    const diff = touchStartX - touchEndX
    const threshold = getSlideWidth() * 0.2 // 20% of slide width

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNext()
      } else {
        goToPrev()
      }
    } else {
      // Return to current slide if threshold not met
      goToSlide(currentIndex)
    }
  }

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsTouching(true)
    setTouchStartX(e.clientX)
    setTouchEndX(e.clientX)

    const handleMouseMove = (e: MouseEvent) => {
      setTouchEndX(e.clientX)

      const diff = touchStartX - touchEndX
      const slideWidth = getSlideWidth() + gap

      // Calculate the new position with resistance at edges
      let newTranslateX = -(currentIndex * slideWidth) - diff

      // Add resistance at edges if not looping
      if (!loop) {
        if (newTranslateX > 0) {
          newTranslateX = newTranslateX / 3
        } else if (newTranslateX < -(maxIndex * slideWidth)) {
          const overscroll = newTranslateX + maxIndex * slideWidth
          newTranslateX = -(maxIndex * slideWidth) + overscroll / 3
        }
      }

      setTranslateX(newTranslateX)
    }

    const handleMouseUp = () => {
      setIsTouching(false)

      const diff = touchStartX - touchEndX
      const threshold = getSlideWidth() * 0.2 // 20% of slide width

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          goToNext()
        } else {
          goToPrev()
        }
      } else {
        // Return to current slide if threshold not met
        goToSlide(currentIndex)
      }

      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  // Initialize translateX on mount and when window resizes
  useEffect(() => {
    const handleResize = () => {
      goToSlide(currentIndex)
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Initialize on mount

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [currentIndex, containerWidth])

  // Ensure we have slides to show
  if (children.length === 0) {
    return <div className={className}>No slides to display</div>
  }

  return (
    <div className={cn("relative touch-carousel-container", className)}>
      <div
        ref={containerRef}
        className="overflow-hidden px-1 py-2 max-w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        style={{ cursor: isTouching ? "grabbing" : "grab" }}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(${isTouching ? translateX : -(currentIndex * (getSlideWidth() + gap))}px)`,
            gap: `${gap}px`,
            transitionProperty: isTouching ? "none" : "transform",
            padding: "8px 0",
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className={cn("flex-shrink-0 flex items-stretch", itemClassName)}
              style={{ width: `${getSlideWidth()}px` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Arrows removed as requested */}

      {showDots && totalSlides > slidesToShow && (
        <div className="carousel-dots-container">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={cn("carousel-dot", currentIndex === index && "active")}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: currentIndex === index ? "#a3ff3c" : "#d1d5db",
                margin: "0 4px",
                padding: 0,
                border: "none",
                display: "block",
                opacity: 1,
                visibility: "visible",
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
