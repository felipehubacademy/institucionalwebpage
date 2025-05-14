"use client"

import type React from "react"
import { useState, useRef, useEffect, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
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
            padding: "4px 0",
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

      {showArrows && !isMobile && children.length > slidesToShow && (
        <>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white w-8 h-8 md:w-10 md:h-10",
              !loop && currentIndex === 0 && "opacity-50 cursor-not-allowed",
            )}
            onClick={goToPrev}
            disabled={!loop && currentIndex === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white w-8 h-8 md:w-10 md:h-10",
              !loop && currentIndex === maxIndex && "opacity-50 cursor-not-allowed",
            )}
            onClick={goToNext}
            disabled={!loop && currentIndex === maxIndex}
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </>
      )}

      {showDots && totalSlides > slidesToShow && (
        <div className="carousel-dots-container">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={cn("carousel-dot", currentIndex === index && "active")}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
