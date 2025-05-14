"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface LogoImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
}

export function LogoImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 100,
}: LogoImageProps) {
  const [error, setError] = useState(false)
  const [devicePixelRatio, setDevicePixelRatio] = useState(1)

  // Detect device pixel ratio for better quality on high DPI screens
  useEffect(() => {
    if (typeof window !== "undefined") {
      setDevicePixelRatio(window.devicePixelRatio || 1)
    }
  }, [])

  // For SVG files, use a different approach to ensure crisp rendering
  if (src.endsWith(".svg") && !error) {
    // Calculate dimensions based on device pixel ratio for better quality
    const adjustedWidth = width ? Math.round(width * (devicePixelRatio > 1 ? 2 : 1.5)) : undefined
    const adjustedHeight = height ? Math.round(height * (devicePixelRatio > 1 ? 2 : 1.5)) : undefined

    return (
      <div
        className={`logo-container relative flex items-center justify-center ${className}`}
        style={{
          width: width ? `${width}px` : "auto",
          height: height ? `${height}px` : "auto",
        }}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={adjustedWidth}
          height={adjustedHeight}
          className="object-contain"
          priority={priority}
          quality={100} // Force maximum quality
          onError={() => setError(true)}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            margin: "auto",
            position: "relative",
            // Enhanced rendering for SVGs
            imageRendering: "-webkit-optimize-contrast",
            transform: "translateZ(0)", // Hardware acceleration
            backfaceVisibility: "hidden", // Prevent blurring during animations
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
        />
      </div>
    )
  }

  // Fallback for non-SVG or error cases
  return (
    <div
      className={`logo-container relative flex items-center justify-center ${className}`}
      style={{
        width: width ? `${width}px` : "auto",
        height: height ? `${height}px` : "auto",
      }}
    >
      <Image
        src={error ? "/placeholder.svg" : src}
        alt={alt}
        width={width ? Math.round(width * 1.5) : width}
        height={height ? Math.round(height * 1.5) : height}
        className="object-contain"
        priority={priority}
        quality={100} // Force maximum quality
        onError={() => setError(true)}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          width: "auto",
          height: "auto",
          margin: "auto",
          position: "relative",
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      />
    </div>
  )
}
