"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
  fallbackAlt?: string
  containerClassName?: string
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  fallbackAlt,
  className,
  containerClassName,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {loading && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
      <Image
        src={error ? fallbackSrc : src}
        alt={error ? fallbackAlt || `Fallback for ${alt}` : alt}
        className={cn("transition-opacity duration-300", loading ? "opacity-0" : "opacity-100", className)}
        onError={() => setError(true)}
        onLoad={() => setLoading(false)}
        {...props}
      />
    </div>
  )
}
