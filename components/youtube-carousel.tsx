"use client"

import { TouchCarousel } from "@/components/touch-carousel"
import { useIsMobile } from "@/hooks/use-media-query"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface YouTubeCarouselProps {
  videos: {
    id: string
    title: string
  }[]
  className?: string
  showArrows?: boolean
  showDots?: boolean
}

export function YouTubeCarousel({ videos, className, showArrows = true, showDots = true }: YouTubeCarouselProps) {
  const isMobile = useIsMobile()
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null)

  return (
    <TouchCarousel
      slidesToShow={isMobile ? 1 : 3}
      gap={16}
      showDots={showDots}
      loop={true}
      showArrows={showArrows}
      className={cn("touch-carousel-mobile", className)}
    >
      {videos.map((video, index) => (
        <div key={video.id} className="w-full h-full">
          <div className="bg-white rounded-xl overflow-hidden shadow-md h-full">
            <div className="relative w-full h-0 pb-[177.77%]">
              <iframe
                className={cn(
                  "absolute inset-0 w-full h-full",
                  isMobile && activeVideoIndex !== index && "pointer-events-none"
                )}
                src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1&controls=1&playsinline=1`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
              {isMobile && (
                <div
                  className={cn(
                    "absolute inset-0 z-10",
                    activeVideoIndex !== index ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
                  )}
                  onTouchStart={(e) => {
                    if (activeVideoIndex === index) return;
                    setActiveVideoIndex(index);
                    e.preventDefault();
                  }}
                  onTouchEnd={() => setActiveVideoIndex(null)}
                  style={{ touchAction: 'none' }}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </TouchCarousel>
  )
} 