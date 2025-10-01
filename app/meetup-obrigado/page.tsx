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

  const handleAddToCalendar = async () => {
    try {
      const response = await fetch("/api/meetup-ics")
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "english-night-live-meetup.ics"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading calendar file:", error)
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
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center text-white">
          {/* Logo */}
          <div className="mb-12">
            <Link href="/" className="inline-block">
              <LogoImage
                src="/images/Logo_horizontal_green.svg"
                alt="Logo Hub Academy"
                width={160}
                height={48}
                priority={true}
                className="hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Success Icon */}
          <div className="mb-8">
            <CheckCircle2 className="h-20 w-20 md:h-24 md:w-24 text-[#a3ff3c] animate-bounce mx-auto" style={{ animationDuration: '2s' }} />
          </div>

          {/* Success Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#a3ff3c]/10 border border-[#a3ff3c]/20 backdrop-blur-md mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a3ff3c] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a3ff3c]"></span>
            </span>
            <span className="text-sm font-medium text-[#a3ff3c]">Inscrição Confirmada</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl">
            Tudo certo!
          </h1>

          {/* Event Details */}
          <div className="space-y-4 mb-10">
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
              Nos vemos no <span className="text-[#a3ff3c] font-bold">English Night Live</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-base md:text-lg">
              <span className="text-white/90">📅 22 de Outubro</span>
              <span className="hidden sm:inline text-white/50">•</span>
              <span className="text-white/90">🕕 18h30</span>
              <span className="hidden sm:inline text-white/50">•</span>
              <span className="text-white/90">📍 SP - Av. Paulista</span>
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
            Você receberá confirmação por e-mail e WhatsApp
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
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
                  href="mailto:contato@hubacademybr.com"
                  className="text-[#161533] hover:text-[#a3ff3c] font-semibold transition-colors"
                >
                  contato@hubacademybr.com
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
