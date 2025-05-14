"use client"

import { TouchCarousel } from "@/components/touch-carousel"
import { LogoImage } from "@/components/logo-image"
import { useIsMobile, useIsTablet } from "@/hooks/use-media-query"
import { useState, useRef } from "react"
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

  return (
    <>
      <TouchCarousel
        ref={carouselRef}
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
            className="bg-white p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center h-16 md:h-24 w-full min-h-[80px]"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <LogoImage
                src={failedLogos[logo.file] ? fallbackLogo : `/images/logos/${logo.file}`}
                alt={`Logo de ${logo.name}`}
                width={logo.width}
                height={logo.height}
                className="max-h-10 md:max-h-14 w-auto"
                priority={index < 4}
                quality={100}
              />
            </div>
          </div>
        ))}
      </TouchCarousel>
      <div className="carousel-dots-container">
        {Array.from({ length: Math.ceil(logos.length / slidesToShow) }).map((_, index) => (
          <button
            key={index}
            className={cn("carousel-dot", currentIndex === index && "active")}
            onClick={() => {
              // Just update the visual state for now
              setCurrentIndex(index)

              // Add a note for developers
              console.log(
                `Dot ${index + 1} clicked. To make this fully functional, the TouchCarousel component needs to expose a goToSlide method.`,
              )
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
              minWidth: "8px",
              minHeight: "8px",
              display: "block",
              opacity: 1,
              cursor: "pointer", // Add cursor pointer to indicate clickability
            }}
          />
        ))}
      </div>
    </>
  )
}
