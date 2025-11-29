import Link from "next/link"
import { MessageCircle, Calendar, Sparkles, ArrowRight } from "lucide-react"
import { LogoImage } from "@/components/logo-image"
import { LeadTracking } from "@/components/lead-tracking"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Interesse Registrado – Hub Academy",
  description: "Recebemos seu interesse no Assessment Gratuito. Em breve entraremos em contato para agendar sua conversa 1:1 com um expert.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ObrigoPage() {
  const whatsappUrl =
    process.env.NEXT_PUBLIC_WHATSAPP_URL ||
    "https://wa.me/5511990239079?text=Olá%20Hub!%20Quero%20agendar%20meu%20assessment."

  return (
    <div className="min-h-screen bg-[#0B1020] text-white antialiased overflow-x-hidden">
      <LeadTracking />
      {/* Background gradient - igual ao assessment */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#6366F1]/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#a3ff3c]/10 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#161533]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <LogoImage
                src="/images/Logo_horizontal_green.svg"
                alt="Hub Academy"
                width={120}
                height={36}
                priority={true}
                className="transition-all duration-300"
              />
            </Link>
            <Link
              href="/assessment"
              className="text-sm font-medium text-slate-300 hover:text-[#a3ff3c] transition-colors duration-200"
            >
              Voltar ao Assessment
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-24">
        {/* Hero de Confirmação */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#a3ff3c]/10 border border-[#a3ff3c]/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#a3ff3c]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#a3ff3c]">
              Interesse Registrado
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Recebemos seu interesse!{" "}
            <span className="text-[#a3ff3c]">Em breve entraremos em contato</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Um expert da Hub vai te chamar no WhatsApp para agendar sua conversa 1:1 de 30–40 minutos.
            Você vai descobrir seu nível atual, identificar travas e receber um plano personalizado.
          </p>
        </div>

        {/* CTA WhatsApp */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#a3ff3c] text-[#161533] hover:bg-[#92e636] transition-all duration-200 font-semibold text-base sm:text-lg shadow-lg shadow-[#a3ff3c]/30 hover:shadow-[#a3ff3c]/40 hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              Falar agora no WhatsApp
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-sm text-slate-400">
              Ou aguarde nosso contato em breve
            </p>
          </div>
        </div>

        {/* Próximos Passos - Cards modernos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {[
            {
              icon: MessageCircle,
              step: "1",
              title: "Aguarde nosso WhatsApp",
              description: "Em breve, alguém da Hub vai entrar em contato para confirmar o melhor horário para seu assessment.",
            },
            {
              icon: Calendar,
              step: "2",
              title: "Agende seu horário",
              description: "Vamos alinhar o melhor momento para sua sessão individual de 30–40 minutos com um expert.",
            },
            {
              icon: Sparkles,
              step: "3",
              title: "Receba seu diagnóstico",
              description: "Descubra seu nível atual, identifique travas e receba um plano personalizado para avançar.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 hover:bg-white/10 hover:border-[#a3ff3c]/20 transition-all duration-200 group"
            >
              <div className="absolute top-4 right-4 text-2xl sm:text-3xl font-bold text-[#a3ff3c]/20 group-hover:text-[#a3ff3c]/30 transition-colors">
                {item.step}
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#a3ff3c]/10 border border-[#a3ff3c]/20 flex items-center justify-center group-hover:bg-[#a3ff3c]/20 transition-colors">
                  <item.icon className="w-6 h-6 text-[#a3ff3c]" />
                </div>
                <h3 className="font-semibold text-lg text-white">{item.title}</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Microcopy LGPD */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-sm text-slate-400">
          <p className="mb-2">
            <strong className="text-white">LGPD:</strong> Seus dados são tratados conforme a Lei
            Geral de Proteção de Dados. Você pode solicitar a exclusão ou correção de seus dados a
            qualquer momento.
          </p>
          <p>
            Para mais informações, consulte nossa{" "}
            <Link
              href="/politica-de-privacidade"
              className="text-[#a3ff3c] hover:underline transition-colors"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </div>

        {/* Link para voltar */}
        <div className="text-center mt-8 sm:mt-12">
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-[#a3ff3c] transition-colors text-sm sm:text-base group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            Voltar para a página de Assessment
          </Link>
        </div>
      </div>
    </div>
  )
}
