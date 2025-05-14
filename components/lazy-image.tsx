"use client"

import { useState, useEffect, useRef } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface LazyImageProps extends Omit<ImageProps, "onLoad" | "onLoadingComplete"> {
  lowQualitySrc?: string
  showLoadingState?: boolean
}

export function LazyImage({ src, alt, className, lowQualitySrc, showLoadingState = true, ...props }: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isInView, setIsInView] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc || src)
  const imageRef = useRef<HTMLDivElement>(null)

  // Use intersection observer to only load when in viewport
  useEffect(() => {
    if (!imageRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" }, // Start loading when within 200px of viewport
    )

    observer.observe(imageRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Load high quality image when in view
  useEffect(() => {
    if (isInView && lowQualitySrc) {
      const img = new Image()
      img.src = src as string
      img.onload = () => {
        setCurrentSrc(src)
        setIsLoading(false)
      }
    } else if (isInView) {
      setIsLoading(false)
    }
  }, [isInView, lowQualitySrc, src])

  return (
    <div ref={imageRef} className={cn("relative overflow-hidden", className)}>
      {showLoadingState && isLoading && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}

      {isInView && (
        <Image
          src={currentSrc || "/placeholder.svg"}
          alt={alt}
          className={cn("transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100")}
          onLoadingComplete={() => setIsLoading(false)}
          {...props}
        />
      )}

      {!isInView && (
        <div
          style={{
            height: typeof props.height === "number" ? `${props.height}px` : props.height,
            width: typeof props.width === "number" ? `${props.width}px` : props.width,
          }}
          className="bg-gray-100"
        />
      )}
    </div>
  )
}
