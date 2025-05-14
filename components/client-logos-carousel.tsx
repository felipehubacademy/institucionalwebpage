"use client"

import { TouchCarousel } from "@/components/touch-carousel"
import Image from "next/image"
import { useIsMobile, useIsTablet } from "@/hooks/use-media-query"
import { useState } from "react"

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
    <TouchCarousel
      className={className}
      slidesToShow={slidesToShow}
      autoPlay={true}
      autoPlayInterval={3000}
      showArrows={!isMobile}
      showDots={true}
      loop={true}
      gap={16}
    >
      {logos.map((logo, index) => (
        <div
          key={index}
          className="bg-white p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center h-14 md:h-20 w-full"
          style={{ minHeight: "80px" }}
        >
          <Image
            src={failedLogos[logo.file] ? "/placeholder.svg" : `/images/logos/${logo.file}`}
            width={logo.width / 2}
            height={logo.height / 2}
            alt={`Logo de ${logo.name}`}
            className="max-h-8 md:max-h-10 w-auto max-w-[100px] md:max-w-[150px] object-contain"
            onError={() => handleImageError(logo.file)}
          />
        </div>
      ))}
    </TouchCarousel>
  )
}
