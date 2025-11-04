"use client"

import { X } from "lucide-react"
import { useEffect } from "react"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  // Fechar com ESC
  useEffect(() => {
    if (!isOpen) return

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isOpen, onClose])

  // Prevenir scroll do body quando modal aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Vídeo sobre o assessment"
    >
      <div
        className="relative w-full max-w-4xl mx-4 bg-[#0B1020] rounded-2xl border border-white/10 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-indigo-400 transition-colors"
          aria-label="Fechar modal"
        >
          <X size={24} />
        </button>

        <div className="aspect-video bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
          <div className="text-center text-white/60">
            <p className="text-lg mb-2">Vídeo em breve</p>
            <p className="text-sm">Este espaço será usado para um vídeo de 2 minutos sobre a experiência do assessment</p>
          </div>
        </div>
      </div>
    </div>
  )
}

