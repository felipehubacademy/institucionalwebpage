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
    const adjustedWidth = width ? Math.round(width * (devicePixelRatio > 1 ? 1.5 : 1)) : undefined
    const adjustedHeight = height ? Math.round(height * (devicePixelRatio > 1 ? 1.5 : 1)) : undefined

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
          quality={quality}
          onError={() => setError(true)}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            margin: "auto",
            position: "relative",
            // Apply special rendering for high DPI screens
            imageRendering: devicePixelRatio > 1 ? "-webkit-optimize-contrast" : "auto",
            transform: "translateZ(0)", // Hardware acceleration
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
        width={width}
        height={height}
        className="object-contain"
        priority={priority}
        quality={quality}
        onError={() => setError(true)}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          width: "auto",
          height: "auto",
          margin: "auto",
          position: "relative",
        }}
      />
    </div>
  )
}
