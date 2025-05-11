"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Verificar se o usuário já aceitou os cookies
    const cookieConsent = localStorage.getItem("cookie-consent")
    if (!cookieConsent) {
      setIsVisible(true)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all")
    setIsVisible(false)
  }

  const acceptEssential = () => {
    localStorage.setItem("cookie-consent", "essential")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 md:p-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1 pr-0 md:pr-8">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-[#161533] mb-2">Política de Cookies</h3>
              <button
                onClick={acceptEssential}
                className="text-gray-500 hover:text-gray-700 md:hidden"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Este site utiliza cookies para melhorar sua experiência de navegação, personalizar conteúdo e analisar
              nosso tráfego. Ao continuar navegando, você concorda com nossa política de cookies em conformidade com a
              LGPD e GDPR.
            </p>
            <div className="text-sm text-gray-600">
              <Link href="/politica-de-privacidade" className="text-[#161533] underline hover:text-[#a3ff3c]">
                Saiba mais sobre nossa política de privacidade
              </Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <Button
              onClick={acceptEssential}
              variant="outline"
              className="border-[#161533] text-[#161533] hover:bg-gray-100"
            >
              Apenas Essenciais
            </Button>
            <Button onClick={acceptAll} className="bg-[#a3ff3c] hover:bg-[#92e636] text-[#161533]">
              Aceitar Todos
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
