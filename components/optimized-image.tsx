"use client"

import Image from "next/image"
import { useState } from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export default function OptimizedImage({ src, alt, width, height, className, priority = false }: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`overflow-hidden ${className || ""}`}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className={`
          duration-700 ease-in-out
          ${isLoading ? "scale-110 blur-sm" : "scale-100 blur-0"}
        `}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  )
}
