"use client"

import { useState, useEffect } from "react"
import { VideoModal } from "@/components/video-modal"

// Paleta base (substitua pelos tokens oficiais da Hub)
const colors = {
  hubPrimary: "#0F172A", // azul/midnight (placeholder)
  hubAccent: "#6366F1", // accent violeta/azulado (placeholder)
  hubWarm: "#F59E0B", // acento quente
  hubBg: "#0B1020", // fundo escuro premium
  hubMuted: "#94A3B8", // texto secundário
  success: "#10B981",
  danger: "#EF4444",
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={"w-5 h-5 " + className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={"w-5 h-5 " + className}
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M6.5 5.5l7 4.5-7 4.5v-9z" />
    </svg>
  )
}

export default function HubAssessmentLanding() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const [firstErrorField, setFirstErrorField] = useState<string | null>(null)

  // Campos do formulário
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    level: "B1 (consigo, mas travo)",
    preferredTime: "",
    consent: false,
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
  })

  useEffect(() => {
    // Coleta UTM automática
    const params = new URLSearchParams(window.location.search)
    const updates: Record<string, string> = {}
    ;["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((k) => {
      const v = params.get(k) || ""
      if (v) updates[k] = v
    })
    setForm((f) => ({ ...f, ...updates }))
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    // Limpar erro quando usuário começa a digitar
    if (firstErrorField === name) {
      setFirstErrorField(null)
      setError("")
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    setFirstErrorField(null)

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Falha ao enviar. Tente novamente.")
      }

      // Disparar evento de conversão para tracking
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "generate_lead",
          lead_type: "assessment",
        })
      }

      // Meta Pixel
      if (typeof window !== "undefined" && (window as any).fbq) {
        ;(window as any).fbq("track", "Lead", {
          content_name: "Assessment Gratuito",
        })
      }

      // LinkedIn Insight Tag
      if (typeof window !== "undefined" && (window as any).lintrk) {
        const linkedinPid =
          (window as any).__NEXT_DATA__?.env?.NEXT_PUBLIC_LINKEDIN_PID ||
          process.env.NEXT_PUBLIC_LINKEDIN_PID
        if (linkedinPid) {
          ;(window as any).lintrk("track", { conversion_id: linkedinPid })
        }
      }

      // Redirecionar para página de obrigado
      window.location.href = "/obrigado"
    } catch (err: any) {
      setError(err.message || "Erro inesperado.")
      setLoading(false)
    }
  }

  return (
    <div style={{ background: colors.hubBg }} className="min-h-screen text-white">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur" />
          <span className="font-semibold tracking-tight text-lg">Hub Academy</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <a className="hover:text-white" href="#como-funciona">
            Como funciona
          </a>
          <a className="hover:text-white" href="#spo">
            Método SPO
          </a>
          <a className="hover:text-white" href="#comparativo">
            Comparativo
          </a>
          <a className="hover:text-white" href="#depoimentos">
            Resultados
          </a>
        </nav>
        <a
          href="#formulario"
          className="hidden md:inline-flex px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 transition font-medium"
        >
          Agendar meu assessment gratuito
        </a>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <div
            className="w-[800px] h-[800px] rounded-full blur-3xl opacity-20 -translate-x-1/3 -translate-y-1/4"
            style={{ background: colors.hubAccent }}
          />
        </div>
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-20 relative">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-slate-300">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: colors.hubWarm }}
                />
                Assessment individual com expert
              </span>
              <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
                Destrave sua comunicação em inglês e{" "}
                <span className="text-indigo-300">pare de perder oportunidades</span>
              </h1>
              <p className="mt-4 text-slate-300 text-lg">
                Você já entende inglês, mas não sente confiança para demonstrar seu potencial? Em
                um encontro gratuito, um expert da Hub vai diagnosticar seu nível, mapear suas
                travas e te mostrar o caminho até o próximo nível.
              </p>

              {/* Barra de progresso simples */}
              <ol id="como-funciona" className="mt-8 grid grid-cols-3 gap-3">
                {["Preencha", "Agende", "Converse"].map((step, i) => (
                  <li key={step} className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-sm text-slate-300">
                      {i + 1}. {step}
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#formulario"
                  className="px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 transition font-semibold"
                >
                  Agendar meu assessment gratuito
                </a>
                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5"
                >
                  <PlayIcon /> Ver vídeo (2min)
                </button>
                <span className="text-xs text-slate-400">
                  *placeholder — vídeo breve sobre a experiência
                </span>
              </div>

              {/* Sinais de dor e identificação */}
              <div className="mt-10 grid sm:grid-cols-2 gap-3">
                {[
                  "Entendo, mas travo na hora de falar.",
                  "Evito riscos por causa do inglês e perco chances.",
                  "Já estudei anos, mas não comunico com confiança.",
                  "Tenho medo de errar em reuniões e apresentações.",
                ].map((d) => (
                  <div
                    key={d}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <CheckIcon className="text-emerald-400 mt-0.5" />
                    <p className="text-slate-200 text-sm">{d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Card do formulário no Hero */}
            <div id="formulario" className="md:translate-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h2 className="text-xl font-semibold">Agende seu Assessment Gratuito</h2>
                <p className="text-slate-300 text-sm mt-1">
                  Conversa 1:1 com um expert da Hub • 30–40 minutos
                </p>

                <form onSubmit={handleSubmit} className="mt-5 grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-slate-300">Nome</label>
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                        placeholder="Seu nome"
                        autoFocus={firstErrorField === "firstName"}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-300">Sobrenome</label>
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                        placeholder="Seu sobrenome"
                        autoFocus={firstErrorField === "lastName"}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-slate-300">E-mail corporativo</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                        placeholder="voce@empresa.com"
                        autoFocus={firstErrorField === "email"}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-300">WhatsApp</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                        placeholder="(11) 9 9999-9999"
                        autoFocus={firstErrorField === "phone"}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-slate-300">Empresa</label>
                      <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                        placeholder="Sua empresa"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-300">Cargo</label>
                      <input
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                        placeholder="Ex: Gerente de Projetos"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-slate-300">Seu nível hoje</label>
                      <select
                        name="level"
                        value={form.level}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                      >
                        {[
                          "A1 (iniciante)",
                          "A2 (básico)",
                          "B1 (consigo, mas travo)",
                          "B2 (me viro, falta fluidez)",
                          "C1 (avançado)",
                        ].map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0B1020]">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-slate-300">Melhor horário</label>
                      <input
                        name="preferredTime"
                        value={form.preferredTime}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                        placeholder="Ex: seg/qua à noite"
                      />
                    </div>
                  </div>

                  {/* Consentimento LGPD */}
                  <label className="mt-2 flex items-start gap-3 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={form.consent}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                    <span>
                      Autorizo o contato por WhatsApp/e-mail para agendamento e receberei materiais
                      sobre o programa. Você pode cancelar a qualquer momento.{" "}
                      <a
                        href="/politica-de-privacidade"
                        className="text-indigo-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Política de Privacidade
                      </a>
                      .
                    </span>
                  </label>

                  {/* UTM hidden */}
                  {(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const).map(
                    (k) => (
                      <input key={k} type="hidden" name={k} value={form[k] || ""} />
                    )
                  )}

                  {error && (
                    <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-2">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-1 inline-flex justify-center items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 transition font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Enviando..." : "Agendar meu assessment gratuito"}
                  </button>
                  <p className="text-xs text-slate-400">Tempo médio: 30–40 min • 100% gratuito</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção: Método SPO + Comunicação Real */}
      <section id="spo" className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-bold">Método SPO + Comunicação Real</h2>
            <p className="mt-4 text-slate-300">
              Nosso método une <strong>Structure</strong> (bases sólidas),{" "}
              <strong>Personal Growth</strong> (autoconfiança e mindset) e <strong>Oratory</strong>{" "}
              (fala persuasiva no contexto de negócios). Você não vai apenas "passar por aulas": vai{" "}
              <em>desbloquear</em> sua comunicação no que realmente importa — reuniões, apresentações,
              negociações e liderança.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Diagnóstico preciso do seu nível e das travas reais.",
                "Plano prático para avançar de B1 para B2/C1 com segurança.",
                "Treino focado em situações de trabalho — não frases de livro.",
                "Feedback honesto e aplicável já no primeiro encontro.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon className="text-emerald-400 mt-0.5" />
                  <span className="text-slate-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold">Por que a maioria trava?</h3>
            <ul className="mt-3 text-sm text-slate-300 space-y-2 list-disc list-inside">
              <li>
                Aprendeu gramática, mas não treinou <em>oratória</em> e <em>tom de voz</em> para
                negócios.
              </li>
              <li>
                Falta de exposição guiada a conversas reais — com correção no que importa.
              </li>
              <li>Medo de errar → evita reuniões → perde oportunidades de visibilidade.</li>
              <li>
                Sem plano claro de evolução (do nível atual até a performance desejada).
              </li>
            </ul>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-slate-400">Hoje</div>
                <div className="font-semibold">Entendo, mas travo</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-slate-400">Próximo passo</div>
                <div className="font-semibold">Falo com confiança e clareza</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparativo: Inglês tradicional x Método Hub */}
      <section id="comparativo" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold">Inglês Tradicional × Método Hub</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6 text-sm">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold mb-3">Tradicional</h3>
            <ul className="space-y-2 list-disc list-inside text-slate-300">
              <li>Aulas genéricas, pouca conexão com seu trabalho.</li>
              <li>Foco em regras → pouca prática de fala real.</li>
              <li>Medo de errar não é trabalhado.</li>
              <li>Sem plano claro para avançar de nível.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold mb-3">Hub (SPO + Comunicação Real)</h3>
            <ul className="space-y-2 list-disc list-inside text-slate-300">
              <li>
                Personalização para cenários de reuniões, apresentações e liderança.
              </li>
              <li>Correção ativa e treino de oratória para negócios.</li>
              <li>Segurança psicológica e estratégias anti-trava.</li>
              <li>Roadmap de evolução do seu nível atual ao objetivo.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Depoimentos / Prova social */}
      <section id="depoimentos" className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              quote:
                "Destravei meu inglês e fui promovido em 3 meses. A diferença foi treinar situações reais do trabalho.",
              name: "Rafael — Gerente de Projetos",
            },
            {
              quote:
                "Pare de estudar no escuro. Em uma sessão já entendi meu gargalo e o que fazer toda semana.",
              name: "Marina — Product Manager",
            },
            {
              quote:
                "Hoje participo de calls globais com confiança. É treino de oratória, não só gramática.",
              name: "Carlos — Sales Director",
            },
          ].map((d) => (
            <figure key={d.name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <blockquote className="text-slate-200">"{d.quote}"</blockquote>
              <figcaption className="mt-4 text-sm text-slate-400">{d.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ + Schema (implementar JSON-LD no projeto real) */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold">Perguntas frequentes</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6 text-slate-300">
          {[
            {
              q: "Quanto tempo dura o assessment?",
              a: "Entre 30 e 40 minutos, totalmente 1:1 com um expert da Hub.",
            },
            {
              q: "É realmente gratuito?",
              a: "Sim. É uma experiência de valor para você sair com diagnóstico e próximos passos.",
            },
            {
              q: "Meu nível é B1. Isso serve para mim?",
              a: "Sim — especialmente para quem entende, mas trava para se comunicar no trabalho.",
            },
            {
              q: "E se eu for iniciante?",
              a: "Também funciona. O expert adapta a conversa e te entrega um plano de evolução.",
            },
          ].map((f) => (
            <div key={f.q} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="font-semibold">{f.q}</div>
              <div className="mt-1 text-sm">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600/20 to-indigo-300/5 p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            Pronto para <span className="text-indigo-300">parar de travar</span> e crescer na
            carreira?
          </h2>
          <p className="mt-2 text-slate-300">
            Agende seu assessment gratuito com um expert da Hub.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <a
              href="#formulario"
              className="px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 transition font-semibold"
            >
              Agendar meu assessment gratuito
            </a>
            <a
              href={`https://wa.me/5500000000000?text=Olá%20Hub!%20Quero%20agendar%20meu%20assessment.`}
              className="px-5 py-3 rounded-xl border border-white/10 hover:bg-white/5"
              target="_blank"
              rel="noreferrer"
            >
              Falar no WhatsApp agora
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-slate-400 grid md:grid-cols-3 gap-6">
          <div>
            <div className="font-semibold text-white">Hub Academy</div>
            <p className="mt-2">Inglês como ferramenta de trabalho. Método SPO + comunicação real.</p>
          </div>
          <div>
            <div className="font-semibold text-white">Contato</div>
            <p className="mt-2">São Paulo, Brasil • contato@hubacademy.com.br</p>
          </div>
          <div>
            <div className="font-semibold text-white">LGPD</div>
            <p className="mt-2">
              Tratamos dados conforme a LGPD. Política de Privacidade disponível no site.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal de vídeo */}
      <VideoModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} />
    </div>
  )
}

