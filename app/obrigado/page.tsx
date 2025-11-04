import Link from "next/link"
import { CheckCircle, MessageCircle, Calendar, FileText } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Obrigado! – Hub Academy",
  description: "Seu assessment gratuito foi agendado. Alguém da Hub vai entrar em contato em breve.",
  robots: {
    index: false, // Não indexar página de obrigado
    follow: false,
  },
}

export default function ObrigoPage() {
  const whatsappUrl =
    process.env.NEXT_PUBLIC_WHATSAPP_URL ||
    "https://wa.me/551152865668?text=Olá%20Hub!%20Quero%20agendar%20meu%20assessment."

  return (
    <div className="min-h-screen bg-[#0B1020] text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Confirmação */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Cadastro realizado com sucesso!
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Alguém da Hub vai te chamar no WhatsApp para agendar seu assessment gratuito.
          </p>
        </div>

        {/* Próximos passos */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6">Próximos passos</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">1. Aguarde nosso contato</h3>
                <p className="text-slate-300 text-sm">
                  Em até 24 horas, alguém da equipe Hub entrará em contato via WhatsApp para
                  confirmar o melhor horário para seu assessment.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">2. Agende seu assessment</h3>
                <p className="text-slate-300 text-sm">
                  Durante a conversa, vamos alinhar o melhor horário para sua sessão individual de
                  30–40 minutos com um expert.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">3. Receba seu diagnóstico</h3>
                <p className="text-slate-300 text-sm">
                  No assessment, você vai descobrir seu nível atual, identificar travas e receber um
                  plano personalizado para avançar.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botão WhatsApp */}
        <div className="text-center mb-8">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 transition font-semibold"
          >
            <MessageCircle className="w-5 h-5" />
            Falar agora no WhatsApp
          </a>
        </div>

        {/* Microcopy LGPD */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-sm text-slate-400">
          <p className="mb-2">
            <strong className="text-white">LGPD:</strong> Seus dados são tratados conforme a Lei
            Geral de Proteção de Dados (LGPD). Você pode solicitar a exclusão ou correção de seus
            dados a qualquer momento.
          </p>
          <p>
            Para mais informações, consulte nossa{" "}
            <Link
              href="/politica-de-privacidade"
              className="text-indigo-400 hover:underline"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </div>

        {/* Link para voltar */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-slate-400 hover:text-white transition-colors text-sm"
          >
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}

