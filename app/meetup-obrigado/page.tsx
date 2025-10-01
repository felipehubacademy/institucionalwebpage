"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, Calendar, Mail, MessageCircle } from "lucide-react"
import { LogoImage } from "@/components/logo-image"
import Link from "next/link"

export default function MeetupObrigadoPage() {
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
    <div className="min-h-screen bg-gradient-to-b from-[#161533] to-[#232244] text-white">
      {/* Simple Header */}
      <header className="fixed top-0 z-50 w-full bg-[#161533] text-white h-16 shadow-md">
        <div className="container flex items-center justify-between h-full">
          <Link href="/" className="flex items-center">
            <LogoImage
              src="/images/Logo_horizontal_green.svg"
              alt="Logo Hub Academy"
              width={140}
              height={42}
              priority={true}
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 flex items-center justify-center min-h-screen">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto py-20">
          <div className="text-center space-y-10">
            {/* Success Icon with Animation */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-[#a3ff3c]/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative rounded-full bg-gradient-to-br from-[#a3ff3c]/20 to-[#92e636]/20 p-8 border-4 border-[#a3ff3c]/30">
                  <CheckCircle2 className="h-24 w-24 text-[#a3ff3c] animate-bounce" style={{ animationDuration: '2s' }} />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#a3ff3c]/10 border border-[#a3ff3c]/20 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a3ff3c] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a3ff3c]"></span>
                </span>
                <span className="text-sm font-medium text-[#a3ff3c]">Inscrição Confirmada</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                Tudo certo! ✅
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Nos vemos em <span className="text-[#a3ff3c] font-bold">22/10, às 18h30</span>, em{" "}
                <span className="text-[#a3ff3c] font-bold">São Paulo - Av. Paulista</span>.
              </p>
            </div>

            {/* Calendar Button */}
            <div className="pt-6">
              <Button
                onClick={handleAddToCalendar}
                className="group bg-gradient-to-r from-[#a3ff3c] to-[#92e636] hover:from-[#92e636] hover:to-[#a3ff3c] text-[#161533] rounded-full text-lg md:text-xl px-10 py-7 font-bold shadow-2xl shadow-[#a3ff3c]/30 hover:shadow-[#a3ff3c]/50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-3"
              >
                <Calendar className="h-6 w-6" />
                <span>Adicionar ao calendário</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Button>
              <p className="text-sm text-gray-400 mt-4">📅 Arquivo .ics compatível com Google, Outlook e Apple Calendar</p>
            </div>

            {/* Next Steps */}
            <div className="pt-12 space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">Próximos passos</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Email Card */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#a3ff3c] to-[#92e636] rounded-2xl flex items-center justify-center">
                      <Mail className="h-8 w-8 text-[#161533]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Confirmação por E-mail</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Você receberá todos os detalhes do evento em sua caixa de entrada nos próximos minutos.
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Card */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#a3ff3c] to-[#92e636] rounded-2xl flex items-center justify-center">
                      <MessageCircle className="h-8 w-8 text-[#161533]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Lembrete por WhatsApp</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Enviaremos informações adicionais e lembretes próximo à data do evento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="pt-6">
                <p className="text-gray-400">
                  Dúvidas? Entre em contato:{" "}
                  <a
                    href="mailto:contato@hubacademybr.com"
                    className="text-[#a3ff3c] hover:text-[#92e636] font-semibold underline transition-colors"
                  >
                    contato@hubacademybr.com
                  </a>
                </p>
              </div>
            </div>

            {/* Event Reminder */}
            <div className="pt-12 border-t border-white/10">
              <div className="bg-gradient-to-r from-[#a3ff3c]/10 to-[#92e636]/10 border border-[#a3ff3c]/20 rounded-3xl p-8 md:p-10">
                <h3 className="text-2xl md:text-3xl font-bold text-[#a3ff3c] mb-6">English Night Live – Hub Academy Immersive Meetup</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="text-4xl">📅</div>
                    <p className="text-sm text-gray-400">Data</p>
                    <p className="text-lg font-semibold">22 de Outubro</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl">🕕</div>
                    <p className="text-sm text-gray-400">Horário</p>
                    <p className="text-lg font-semibold">18h30</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl">📍</div>
                    <p className="text-sm text-gray-400">Local</p>
                    <p className="text-lg font-semibold">São Paulo - Av. Paulista</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="w-full border-t py-12 bg-gradient-to-b from-[#161533] to-[#0d0c24] text-white border-[#232244]">
        <div className="container text-center space-y-4">
          <Link href="/" className="inline-block">
            <LogoImage
              src="/images/Logo_horizontal_green.svg"
              alt="Logo Hub Academy"
              width={100}
              height={30}
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
          </Link>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Hub Academy. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}


