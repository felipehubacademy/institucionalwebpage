"use client"

import { useState, useEffect, useRef } from "react"
import { optimizeSVG } from "@/utils/svg-optimizer"

interface OptimizedSVGProps {
  src: string
  alt: string
  className?: string
  width?: number | string
  height?: number | string
}

export function OptimizedSVG({ src, alt, className = "", width, height }: OptimizedSVGProps) {
  const [svgContent, setSvgContent] = useState<string | null>(null)
  const [error, setError] = useState<boolean>(false)
  const svgUrlRef = useRef<string | null>(null)

  useEffect(() => {
    if (!src.endsWith(".svg")) {
      setError(true)
      return
    }

    const fetchSVG = async () => {
      try {
        const response = await fetch(src)
        if (!response.ok) {
          throw new Error(`Failed to load SVG: ${response.statusText}`)
        }

        const svgString = await response.text()
        const optimized = optimizeSVG(svgString)
        setSvgContent(optimized)
      } catch (err) {
        console.error("Error loading SVG:", err)
        setError(true)
      }
    }

    fetchSVG()
  }, [src])

  useEffect(() => {
    if (svgContent) {
      // Create a blob URL for the SVG content
      const svgBlob = new Blob([svgContent], { type: "image/svg+xml" })
      svgUrlRef.current = URL.createObjectURL(svgBlob)
    }

    return () => {
      if (svgUrlRef.current) {
        URL.revokeObjectURL(svgUrlRef.current)
      }
    }
  }, [svgContent])

  if (error) {
    return (
      <div
        className={`optimized-svg-error ${className}`}
        style={{ width: width || "auto", height: height || "auto" }}
        role="img"
        aria-label={alt}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    )
  }

  if (!svgContent) {
    return (
      <div
        className={`optimized-svg-loading ${className}`}
        style={{ width: width || "auto", height: height || "auto" }}
        role="img"
        aria-label={`Loading ${alt}`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" opacity="0.25" />
          <path d="M12 2a10 10 0 0110 10" strokeLinecap="round">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 12 12"
              to="360 12 12"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
    )
  }

  return (
    <div className={`optimized-svg ${className}`} style={{ width: width || "auto", height: height || "auto" }}>
      <img
        src={svgUrlRef.current || "/placeholder.svg"}
        alt={alt}
        className="w-full h-full object-contain"
        style={{
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)",
          maxWidth: "100%",
          height: "auto",
        }}
      />
    </div>
  )
}
