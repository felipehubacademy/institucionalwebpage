"use client"

import { TouchCarousel } from "@/components/touch-carousel"
import Image from "next/image"
import { useIsMobile, useIsTablet } from "@/hooks/use-media-query"
import { useState } from "react"
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

  // Determine how many slides to show based on screen size
  const slidesToShow = isMobile ? 2 : isTablet ? 3 : 4

  // Handle image error
  const handleImageError = (logoFile: string) => {
    setFailedLogos((prev) => ({
      ...prev,
      [logoFile]: true,
    }))
    console.error(`Failed to load logo: ${logoFile}`)
  }

  return (
    <>
      <TouchCarousel
        className={className}
        slidesToShow={slidesToShow}
        autoPlay={true}
        autoPlayInterval={3000}
        showArrows={!isMobile}
        showDots={false}
        loop={true}
        gap={16}
        onSlideChange={(index) => {
          setCurrentIndex(Math.floor(index / slidesToShow))
        }}
      >
        {logos.map((logo, index) => (
          <div
            key={index}
            className="bg-white p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center h-16 md:h-24 w-full"
          >
            <Image
              src={failedLogos[logo.file] ? "/placeholder.svg" : `/images/logos/${logo.file}`}
              width={logo.width}
              height={logo.height}
              alt={`Logo de ${logo.name}`}
              className="max-h-10 md:max-h-14 w-auto object-contain"
              onError={() => handleImageError(logo.file)}
              quality={90}
              priority={index < 4}
            />
          </div>
        ))}
      </TouchCarousel>
      <div className="carousel-dots-container">
        {Array.from({ length: Math.ceil(logos.length / slidesToShow) }).map((_, index) => (
          <button
            key={index}
            className={cn("carousel-dot", currentIndex === index && "active")}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to logo group ${index + 1}`}
          />
        ))}
      </div>
    </>
  )
}
