"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle2, Volume2, VolumeX } from "lucide-react"
import { LogoImage } from "@/components/logo-image"
import Link from "next/link"

export default function MeetupObrigadoPage() {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleAddToCalendar = () => {
    // Event details
    const eventTitle = "English Night Live – Hub Academy Immersive Meetup"
    const eventLocation = "Av. Paulista, 1374 - 12º andar - Brazilian Financial Center, São Paulo"
    const eventDescription = "Uma noite exclusiva de networking e prática de inglês em um ambiente dinâmico e imersivo. Pratique inglês em dinâmicas reais de negócios, desenvolva soft skills estratégicas e conecte-se com profissionais de diversas áreas."
    
    // Event date: October 22, 2025, 18:30 to 22:00
    const startDate = new Date("2025-10-22T18:30:00-03:00") // São Paulo timezone
    const endDate = new Date("2025-10-22T22:00:00-03:00")
    
    // Format dates for different calendar services
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }
    
    const startFormatted = formatDate(startDate)
    const endFormatted = formatDate(endDate)
    
    // Generate Google Calendar URL
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startFormatted}/${endFormatted}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}`
    
    // Generate Outlook URL
    const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(eventTitle)}&startdt=${startFormatted}&enddt=${endFormatted}&body=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}`
    
    // Generate Apple Calendar data URL
    const appleCalendarData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Hub Academy//English Night Live//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:meetup-${Date.now()}@hubacademybr.com`,
      `DTSTAMP:${formatDate(new Date())}`,
      `DTSTART:${startFormatted}`,
      `DTEND:${endFormatted}`,
      `SUMMARY:${eventTitle}`,
      `DESCRIPTION:${eventDescription.replace(/\n/g, "\\n")}`,
      `LOCATION:${eventLocation}`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n")
    
    const appleUrl = `data:text/calendar;charset=utf8,${encodeURIComponent(appleCalendarData)}`
    
    // Detect device and open appropriate calendar
    const userAgent = navigator.userAgent.toLowerCase()
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
    const isIOS = /iphone|ipad|ipod/i.test(userAgent)
    const isAndroid = /android/i.test(userAgent)
    
    if (isIOS) {
      // iOS - try to open Apple Calendar directly
      // First try the data URL approach
      const link = document.createElement('a')
      link.href = appleUrl
      link.download = 'meetup.ics'
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Fallback to Google Calendar after a short delay
      setTimeout(() => {
        window.open(googleUrl, '_blank')
      }, 1000)
    } else if (isAndroid) {
      // Android - try Google Calendar
      window.open(googleUrl, '_blank')
    } else {
      // Desktop - try to detect default calendar app
      // For now, open Google Calendar as it's the most universal
      window.open(googleUrl, '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-[#161533]">
      {/* Video Hero Section */}
      <section className="relative w-full h-screen overflow-hidden bg-[#161533]">
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          preload="auto"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#161533]/60 via-[#161533]/40 to-[#161533]" />

        {/* Audio Control Button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center group"
          aria-label={isMuted ? "Ativar som" : "Desativar som"}
        >
          {isMuted ? (
            <Volume2 className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
          ) : (
            <VolumeX className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
          )}
        </button>

        {/* Content Over Video */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 pt-4 text-center text-white">
          {/* Logo */}
          <div className="mb-6 md:mb-8">
            <Link href="/" className="inline-block">
              <LogoImage
                src="/images/Logo_horizontal_green.svg"
                alt="Logo Hub Academy"
                width={160}
                height={48}
                priority={true}
                className="hover:opacity-80 transition-opacity w-28 h-auto md:w-36 lg:w-40"
              />
            </Link>
          </div>

          {/* Success Icon */}
          <div className="mb-6">
            <CheckCircle2 className="h-20 w-20 md:h-24 md:w-24 text-[#a3ff3c] animate-bounce mx-auto" style={{ animationDuration: '2s' }} />
          </div>

          {/* Success Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#a3ff3c]/10 border border-[#a3ff3c]/20 backdrop-blur-md mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a3ff3c] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a3ff3c]"></span>
            </span>
            <span className="text-sm font-medium text-[#a3ff3c]">Inscrição Confirmada</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-3xl">
            Tudo certo!
          </h1>

          {/* Event Details */}
          <div className="space-y-4 mb-6">
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
              Nos vemos no <span className="text-[#a3ff3c] font-bold">English Night Live</span>
            </p>
            <div className="flex flex-col items-center justify-center gap-2 text-base md:text-lg">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
                <span className="text-white/90">📅 22 de Outubro</span>
                <span className="hidden sm:inline text-white/50">•</span>
                <span className="text-white/90">🕕 18h30 às 22h</span>
              </div>
              <div className="text-center">
                <span className="text-white/90">📍 Av. Paulista, 1374 - 12º andar - Brazilian Financial Center, São Paulo</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleAddToCalendar}
            className="group bg-gradient-to-r from-[#a3ff3c] to-[#92e636] hover:from-[#92e636] hover:to-[#a3ff3c] text-[#161533] rounded-full text-lg md:text-xl px-10 py-7 font-bold shadow-2xl shadow-[#a3ff3c]/30 hover:shadow-[#a3ff3c]/50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-3 mb-4"
          >
            <Calendar className="h-6 w-6" />
            <span>Adicionar ao calendário</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Button>

          {/* Helper Text */}
          <p className="text-sm text-gray-400">
            Abre automaticamente no seu calendário
          </p>
        </div>

        {/* Scroll Indicator - Desktop */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 hidden md:block animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Scroll Indicator - Mobile */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 md:hidden animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="relative w-full py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6 max-w-2xl mx-auto">
          <div className="text-center space-y-8">
            {/* Simple confirmation text */}
            <div className="space-y-4">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Você receberá a confirmação por <span className="font-semibold text-[#161533]">e-mail</span> e{" "}
                <span className="font-semibold text-[#161533]">WhatsApp</span>.
              </p>
            </div>

            {/* Divider */}
            <div className="w-16 h-0.5 bg-[#a3ff3c] mx-auto" />

            {/* Contact */}
            <div>
              <p className="text-sm text-gray-600">
                Dúvidas?{" "}
                <a
                  href="mailto:hub@hubacademybr.com"
                  className="text-[#161533] hover:text-[#a3ff3c] font-semibold transition-colors"
                >
                  hub@hubacademybr.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t py-12 bg-[#161533] text-white border-[#232244]">
        <div className="container text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Hub Academy. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
