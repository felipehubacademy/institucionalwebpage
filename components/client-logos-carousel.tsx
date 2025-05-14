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
            <Image
              src={failedLogos[logo.file] ? "/placeholder.svg" : `/images/logos/${logo.file}`}
              width={logo.width}
              height={logo.height}
              alt={`Logo de ${logo.name}`}
              className="max-h-10 md:max-h-14 w-auto object-contain"
              onError={() => handleImageError(logo.file)}
              quality={100}
              priority={index < 4}
              loading={index < 4 ? "eager" : "lazy"}
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
            style={{
              width: isMobile ? "2px !important" : "1px",
              height: isMobile ? "2px !important" : "1px",
              borderRadius: "50% !important",
              backgroundColor: "#a3ff3c !important", // Using bright color for all dots
              margin: "0 3px !important",
              padding: 0,
              border: isMobile ? "1px solid #161533 !important" : "none",
              minWidth: isMobile ? "2px !important" : "1px",
              minHeight: isMobile ? "2px !important" : "1px",
              display: "block !important",
              opacity: "1 !important",
              ...(currentIndex === index && {
                width: isMobile ? "6px !important" : "3px",
                height: isMobile ? "2px !important" : "1px",
                borderRadius: isMobile ? "1px !important" : "0",
                backgroundColor: "#161533 !important", // Dark color for active dot
                border: isMobile ? "1px solid #a3ff3c !important" : "none",
              }),
            }}
          />
        ))}
      </div>
    </>
  )
}
