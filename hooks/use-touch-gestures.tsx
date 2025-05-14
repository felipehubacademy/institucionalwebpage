"use client"

import { useState, useEffect, useCallback } from "react"

interface TouchGestureOptions {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  threshold?: number
  preventDefault?: boolean
}

export function useTouchGestures({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  preventDefault = true,
}: TouchGestureOptions) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)

  // Reset touch points
  const resetTouch = useCallback(() => {
    setTouchStart(null)
    setTouchEnd(null)
  }, [])

  // Handle touch start
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (preventDefault) {
        // Only prevent default if we're not in a scrollable element
        const target = e.target as HTMLElement
        const isScrollable = target.scrollHeight > target.clientHeight || target.scrollWidth > target.clientWidth

        if (!isScrollable) {
          e.preventDefault()
        }
      }

      setTouchEnd(null) // Reset touchEnd
      setTouchStart({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      })
    },
    [preventDefault],
  )

  // Handle touch move
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (preventDefault) {
        // Only prevent default if we're not in a scrollable element
        const target = e.target as HTMLElement
        const isScrollable = target.scrollHeight > target.clientHeight || target.scrollWidth > target.clientWidth

        if (!isScrollable) {
          e.preventDefault()
        }
      }

      setTouchEnd({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      })
    },
    [preventDefault],
  )

  // Handle touch end
  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return

    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY)

    // Detect swipe direction
    if (isHorizontalSwipe) {
      if (distanceX > threshold && onSwipeLeft) {
        onSwipeLeft()
      } else if (distanceX < -threshold && onSwipeRight) {
        onSwipeRight()
      }
    } else {
      if (distanceY > threshold && onSwipeUp) {
        onSwipeUp()
      } else if (distanceY < -threshold && onSwipeDown) {
        onSwipeDown()
      }
    }

    resetTouch()
  }, [touchStart, touchEnd, threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, resetTouch])

  // Add event listeners
  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, { passive: !preventDefault })
    document.addEventListener("touchmove", handleTouchMove, { passive: !preventDefault })
    document.addEventListener("touchend", handleTouchEnd)

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, preventDefault])

  return {
    touchStart,
    touchEnd,
    resetTouch,
  }
}

// Predefined swipe hooks
export function useSwipeNavigation(options: {
  onNext?: () => void
  onPrevious?: () => void
  threshold?: number
  preventDefault?: boolean
}) {
  return useTouchGestures({
    onSwipeLeft: options.onNext,
    onSwipeRight: options.onPrevious,
    threshold: options.threshold,
    preventDefault: options.preventDefault,
  })
}
