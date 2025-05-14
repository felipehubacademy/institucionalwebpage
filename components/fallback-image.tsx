"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface FallbackImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
}

export function FallbackImage({ src, alt, fallbackSrc = "/placeholder.svg", className, ...props }: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(typeof src === "string" ? src : fallbackSrc)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Handle image load complete
  const handleLoadComplete = () => {
    setLoading(false)
  }

  // Handle image load error
  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      console.error(`Failed to load image: ${imgSrc}`)
      setImgSrc(fallbackSrc)
      setError(true)
    }
    setLoading(false)
  }

  return (
    <div className={cn("relative", className)}>
      {loading && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{
            width: typeof props.width === "number" ? `${props.width}px` : props.width,
            height: typeof props.height === "number" ? `${props.height}px` : props.height,
          }}
        />
      )}
      <Image
        src={imgSrc || "/placeholder.svg"}
        alt={error ? `Fallback for ${alt}` : alt}
        className={cn(loading ? "opacity-0" : "opacity-100", "transition-opacity duration-300")}
        onLoadingComplete={handleLoadComplete}
        onError={handleError}
        {...props}
      />
    </div>
  )
}
