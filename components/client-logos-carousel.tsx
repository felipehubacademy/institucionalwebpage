"use client"

import { TouchCarousel } from "@/components/touch-carousel"
import { LogoImage } from "@/components/logo-image"
import { useIsMobile, useIsTablet } from "@/hooks/use-media-query"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ClientLogo {
  name: string
  file: string
  width: number
  height: number
}

interface ClientLogosCarouselProps {
  logos: ClientLogo[]
  className?: string
}

export function ClientLogosCarousel({ logos, className }: ClientLogosCarouselProps) {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const [failedLogos, setFailedLogos] = useState<Record<string, boolean>>({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<any>(null)

  // Define a fallback SVG for missing logos
  const fallbackLogo = "/placeholder.svg"

  // Determine how many slides to show based on screen size
  const slidesToShow = isMobile ? 2 : isTablet ? 3 : 4

  // Handle image error with better logging
  const handleImageError = (logoFile: string) => {
    console.error(`Failed to load logo: ${logoFile} - Please check the file path and format.`)
    setFailedLogos((prev) => ({
      ...prev,
      [logoFile]: true,
    }))
  }

  // Create a duplicated array of logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos]

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="carousel-track">
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="bg-white p-2 md:p-3 rounded-lg shadow-sm flex items-center justify-center h-14 md:h-20 w-[140px] md:w-[180px] min-h-[56px]"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <LogoImage
                src={failedLogos[logo.file] ? fallbackLogo : `/images/logos/${logo.file}`}
                alt={`Logo de ${logo.name}`}
                width={logo.width}
                height={logo.height}
                className="max-h-8 md:max-h-12 w-auto"
                priority={index < 4}
                quality={100}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-dots-container">
        {Array.from({ length: Math.ceil(logos.length / slidesToShow) }).map((_, index) => (
          <button
            key={index}
            className={cn("carousel-dot", currentIndex === index && "active")}
            onClick={() => {
              setCurrentIndex(index)
            }}
            aria-label={`Go to logo group ${index + 1}`}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: currentIndex === index ? "#161533" : "#a3ff3c",
              margin: "0 4px",
              padding: 0,
              border: "none",
            }}
          />
        ))}
      </div>
    </div>
  )
}
