"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"

interface LogoImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  loading?: "lazy" | "eager"
}

export function LogoImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 100,
  loading,
}: LogoImageProps) {
  const [error, setError] = useState(false)
  const [devicePixelRatio, setDevicePixelRatio] = useState(1)
  const [isMobile, setIsMobile] = useState(false)

  // Memoize device detection to prevent unnecessary re-renders
  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateDeviceInfo = () => {
        setDevicePixelRatio(window.devicePixelRatio || 1)
        setIsMobile(window.innerWidth <= 768)
      }

      updateDeviceInfo()
      window.addEventListener("resize", updateDeviceInfo)
      return () => window.removeEventListener("resize", updateDeviceInfo)
    }
  }, [])

  // Memoize optimal dimensions calculation
  const optimalDimensions = useMemo(() => {
    if (!width || !height) return { width, height }

    if (isMobile) {
      return {
        width: Math.round(width * 0.8),
        height: Math.round(height * 0.8),
      }
    }

    if (devicePixelRatio > 1) {
      return {
        width: Math.round(width * 1.5),
        height: Math.round(height * 1.5),
      }
    }

    return { width, height }
  }, [width, height, isMobile, devicePixelRatio])

  const { width: optimalWidth, height: optimalHeight } = optimalDimensions

  // Common image styles
  const imageStyles = {
    maxWidth: "100%",
    maxHeight: "100%",
    width: "auto",
    height: "auto",
    margin: "auto",
    position: "relative" as const,
    imageRendering: "-webkit-optimize-contrast" as const,
    transform: "translateZ(0)",
    backfaceVisibility: "hidden" as const,
    WebkitFontSmoothing: "antialiased" as const,
    MozOsxFontSmoothing: "grayscale" as const,
  }

  // Common container styles
  const containerStyles = {
    width: width ? `${width}px` : "auto",
    height: height ? `${height}px` : "auto",
  }

  // Image props that are common to both SVG and non-SVG cases
  const commonImageProps = {
    src: error ? "/placeholder.svg" : src,
    alt,
    width: optimalWidth,
    height: optimalHeight,
    className: "object-contain",
    quality: src.endsWith(".svg") ? 100 : quality,
    onError: () => setError(true),
    style: imageStyles,
    ...(priority ? { priority: true } : { loading: loading || "lazy" }),
  }

  // Handle SVG files with optimized rendering
  if (src.endsWith(".svg") && !error) {
    return (
      <div
        className={`logo-container relative flex items-center justify-center ${className}`}
        style={containerStyles}
        role="img"
        aria-label={alt}
      >
        <Image {...commonImageProps} />
      </div>
    )
  }

  // Fallback for non-SVG or error cases
  return (
    <div
      className={`logo-container relative flex items-center justify-center ${className}`}
      style={containerStyles}
      role="img"
      aria-label={alt}
    >
      <Image {...commonImageProps} />
    </div>
  )
}
