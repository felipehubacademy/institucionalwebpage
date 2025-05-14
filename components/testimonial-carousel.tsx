"use client"

import { TouchCarousel } from "@/components/touch-carousel"
import { LazyImage } from "@/components/lazy-image"
import { Card, CardContent } from "@/components/ui/card"
import { useIsMobile } from "@/hooks/use-media-query"

interface Testimonial {
  name: string
  role: string
  image: string
  text: string
  rating: number
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  className?: string
}

export function TestimonialCarousel({ testimonials, className }: TestimonialCarouselProps) {
  const isMobile = useIsMobile()

  // Determine how many slides to show based on screen size
  const slidesToShow = isMobile ? 1 : 3

  return (
    <TouchCarousel
      className={className}
      slidesToShow={slidesToShow}
      autoPlay={true}
      autoPlayInterval={5000}
      showArrows={!isMobile}
      showDots={true}
      loop={true}
      gap={16}
    >
      {testimonials.map((testimonial, index) => (
        <Card key={index} className="bg-white border-none shadow-md h-full">
          <CardContent className="pt-6 h-full">
            <div className="flex flex-col gap-4 h-full">
              <div className="flex gap-0.5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4 md:h-5 md:w-5 text-[#a3ff3c]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic flex-grow text-sm md:text-base">{testimonial.text}</p>
              <div className="flex items-center gap-3 pt-4">
                <div className="rounded-full bg-gray-200 p-1">
                  <LazyImage
                    src={testimonial.image}
                    width={36}
                    height={36}
                    alt={`Foto de ${testimonial.name}`}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="font-medium text-sm md:text-base">{testimonial.name}</p>
                  <p className="text-xs md:text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </TouchCarousel>
  )
}
