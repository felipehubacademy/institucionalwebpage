"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import Link from "next/link"
import { VideoModal } from "@/components/video-modal"
import { LogoImage } from "@/components/logo-image"
import { PhoneInput } from "@/components/phone-input"

// Cores oficiais da Hub Academy
const HUB_COLORS = {
  primary: "#a3ff3c", // Verde Hub
  primaryDark: "#92e636",
  secondary: "#161533", // Azul escuro Hub
  background: "#0B1020",
  backgroundLight: "#161533",
  textPrimary: "#ffffff",
  textSecondary: "#94A3B8",
  textMuted: "#64748B",
  accent: "#6366F1",
  success: "#10B981",
  danger: "#EF4444",
  warning: "#F59E0B",
} as const

// Icones otimizados como componentes
function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-5 h-5 flex-shrink-0 ${className}`}
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
      className={`w-5 h-5 flex-shrink-0 ${className}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M6.5 5.5l7 4.5-7 4.5v-9z" />
    </svg>
  )
}

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-5 h-5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  )
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  role: string
  level: string
  preferredTime: string
  consent: boolean
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
}

interface FieldError {
  field: string
  message: string
}

export default function HubAssessmentLanding() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isScrolled, setIsScrolled] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [form, setForm] = useState<FormData>({
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

  // Scroll detection para header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Coleta UTM automática
  useEffect(() => {
    if (typeof window === "undefined") return
    const params = new URLSearchParams(window.location.search)
    const updates: Partial<FormData> = {}
    ;["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((k) => {
      const v = params.get(k)
      if (v) updates[k as keyof FormData] = v
    })
    if (Object.keys(updates).length > 0) {
      setForm((f) => ({ ...f, ...updates }))
    }
  }, [])

  // Validação em tempo real
  const validateField = useCallback((name: string, value: string | boolean) => {
    const errors: Record<string, string> = {}
    
    switch (name) {
      case "firstName":
      case "lastName":
        if (typeof value === "string" && value.length < 2) {
          errors[name] = "Mínimo de 2 caracteres"
        }
        break
      case "email":
        if (typeof value === "string") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(value)) {
            errors.email = "E-mail inválido"
          }
        }
        break
      case "phone":
        if (typeof value === "string") {
          const digits = value.replace(/\D/g, "")
          if (digits.length < 10) {
            errors.phone = "Telefone inválido"
          }
        }
        break
    }

    setFieldErrors((prev) => {
      const newErrors = { ...prev }
      if (errors[name]) {
        newErrors[name] = errors[name]
      } else {
        delete newErrors[name]
      }
      return newErrors
    })
  }, [])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target
      const checked = (e.target as HTMLInputElement).checked
      const newValue = type === "checkbox" ? checked : value

      setForm((prev) => ({
        ...prev,
        [name]: newValue,
      }))

      // Validação em tempo real
      if (type !== "checkbox") {
        validateField(name, newValue as string)
      }

      // Limpar erro geral quando usuário edita
      if (error) setError("")
    },
    [error, validateField]
  )

  const handlePhoneChange = useCallback((value: string) => {
    setForm((prev) => ({ ...prev, phone: value }))
    validateField("phone", value)
    if (error) setError("")
  }, [error, validateField])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      setError("")
      setFieldErrors({})

      // Validação final
      const errors: Record<string, string> = {}
      if (!form.firstName || form.firstName.length < 2) errors.firstName = "Nome obrigatório"
      if (!form.lastName || form.lastName.length < 2) errors.lastName = "Sobrenome obrigatório"
      if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = "E-mail inválido"
      }
      const phoneDigits = form.phone.replace(/\D/g, "")
      if (!form.phone || phoneDigits.length < 10) {
        errors.phone = "Telefone inválido"
      }
      if (!form.consent) {
        errors.consent = "Você deve concordar com os termos"
      }

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors)
        setLoading(false)
        // Focar no primeiro erro
        const firstErrorField = Object.keys(errors)[0]
        const field = formRef.current?.querySelector(`[name="${firstErrorField}"]`) as HTMLElement
        field?.focus()
        field?.scrollIntoView({ behavior: "smooth", block: "center" })
        return
      }

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

        // Tracking events
        if (typeof window !== "undefined") {
          // GTM
          if (window.dataLayer) {
            window.dataLayer.push({
              event: "generate_lead",
              lead_type: "assessment",
              form_location: "assessment_landing",
            })
          }

          // Meta Pixel
          if ((window as any).fbq) {
            ;(window as any).fbq("track", "Lead", {
              content_name: "Assessment Gratuito",
              content_category: "Assessment",
            })
          }

          // LinkedIn
          if ((window as any).lintrk) {
            const linkedinPid =
              (window as any).__NEXT_DATA__?.env?.NEXT_PUBLIC_LINKEDIN_PID ||
              process.env.NEXT_PUBLIC_LINKEDIN_PID
            if (linkedinPid) {
              ;(window as any).lintrk("track", { conversion_id: linkedinPid })
            }
          }
        }

        // Redirecionar
        window.location.href = "/obrigado"
      } catch (err: any) {
        setError(err.message || "Erro inesperado. Por favor, tente novamente.")
        setLoading(false)
      }
    },
    [form]
  )

  // Smooth scroll para âncoras
  const handleAnchorClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href")
    if (href?.startsWith("#")) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }, [])

  // Memoized values
  const whatsappUrl = useMemo(
    () =>
      process.env.NEXT_PUBLIC_WHATSAPP_URL ||
      "https://wa.me/551152865668?text=Olá%20Hub!%20Quero%20agendar%20meu%20assessment.",
    []
  )

  const isFormValid = useMemo(
    () =>
      form.firstName.length >= 2 &&
      form.lastName.length >= 2 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
      form.phone.replace(/\D/g, "").length >= 10 &&
      form.consent,
    [form]
  )

  return (
    <div className="min-h-screen bg-[#0B1020] text-white antialiased">
      {/* Header fixo com scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#161533]/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <LogoImage
                src="/images/Logo_horizontal_green.svg"
                alt="Hub Academy"
                width={isScrolled ? 120 : 140}
                height={isScrolled ? 36 : 42}
                priority={true}
                className="transition-all duration-300"
              />
            </Link>
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {[
                { href: "#como-funciona", label: "Como funciona" },
                { href: "#spo", label: "Método SPO" },
                { href: "#comparativo", label: "Comparativo" },
                { href: "#depoimentos", label: "Resultados" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleAnchorClick}
                  className="text-sm font-medium text-slate-300 hover:text-[#a3ff3c] transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href="#formulario"
              onClick={handleAnchorClick}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#a3ff3c] text-[#161533] hover:bg-[#92e636] transition-all duration-200 font-semibold text-sm shadow-lg shadow-[#a3ff3c]/20 hover:shadow-[#a3ff3c]/30"
            >
              Agendar grátis
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute top-0 -left-1/4 w-[800px] h-[800px] bg-[#6366F1]/20 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 -right-1/4 w-[600px] h-[600px] bg-[#a3ff3c]/10 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Conteúdo à esquerda */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#a3ff3c]/10 border border-[#a3ff3c]/20">
                <span className="w-2 h-2 rounded-full bg-[#a3ff3c] animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#a3ff3c]">
                  Assessment individual com expert
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Destrave sua comunicação em inglês e{" "}
                <span className="text-[#a3ff3c]">pare de perder oportunidades</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
                Você já entende inglês, mas não sente confiança para demonstrar seu potencial? Em
                um encontro gratuito, um expert da Hub vai diagnosticar seu nível, mapear suas
                travas e te mostrar o caminho até o próximo nível.
              </p>

              {/* Steps */}
              <div id="como-funciona" className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { step: "1", label: "Preencha", desc: "o formulário" },
                  { step: "2", label: "Agende", desc: "seu horário" },
                  { step: "3", label: "Converse", desc: "com expert" },
                ].map((item, i) => (
                  <div
                    key={item.step}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="text-2xl font-bold text-[#a3ff3c] mb-1">{item.step}</div>
                    <div className="text-sm font-semibold text-white">{item.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#formulario"
                  onClick={handleAnchorClick}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#a3ff3c] text-[#161533] hover:bg-[#92e636] transition-all duration-200 font-semibold shadow-lg shadow-[#a3ff3c]/30 hover:shadow-[#a3ff3c]/40 hover:scale-105 active:scale-95"
                >
                  Agendar meu assessment gratuito
                  <ArrowRightIcon />
                </a>
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-200 font-medium backdrop-blur-sm"
                  aria-label="Ver vídeo sobre o assessment"
                >
                  <PlayIcon />
                  Ver vídeo (2min)
                </button>
              </div>

              {/* Pain points */}
              <div className="grid sm:grid-cols-2 gap-3 pt-6">
                {[
                  "Entendo, mas travo na hora de falar.",
                  "Evito riscos por causa do inglês e perco chances.",
                  "Já estudei anos, mas não comunico com confiança.",
                  "Tenho medo de errar em reuniões e apresentações.",
                ].map((text, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-200"
                  >
                    <CheckIcon className="text-[#a3ff3c] mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-200 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulário à direita */}
            <div id="formulario" className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Agende seu Assessment Gratuito</h2>
                  <p className="text-slate-300 text-sm">
                    Conversa 1:1 com um expert da Hub • 30–40 minutos • 100% gratuito
                  </p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Nome e Sobrenome */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-1.5">
                        Nome <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        className={`w-full rounded-xl bg-white/10 border ${
                          fieldErrors.firstName
                            ? "border-red-400/50 focus:border-red-400"
                            : "border-white/10 focus:border-[#a3ff3c]"
                        } px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-[#a3ff3c]/20 transition-all duration-200`}
                        placeholder="Seu nome"
                      />
                      {fieldErrors.firstName && (
                        <p className="mt-1 text-xs text-red-400">{fieldErrors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-1.5">
                        Sobrenome <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        className={`w-full rounded-xl bg-white/10 border ${
                          fieldErrors.lastName
                            ? "border-red-400/50 focus:border-red-400"
                            : "border-white/10 focus:border-[#a3ff3c]"
                        } px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-[#a3ff3c]/20 transition-all duration-200`}
                        placeholder="Seu sobrenome"
                      />
                      {fieldErrors.lastName && (
                        <p className="mt-1 text-xs text-red-400">{fieldErrors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Email e Telefone */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                        E-mail corporativo <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className={`w-full rounded-xl bg-white/10 border ${
                          fieldErrors.email
                            ? "border-red-400/50 focus:border-red-400"
                            : "border-white/10 focus:border-[#a3ff3c]"
                        } px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-[#a3ff3c]/20 transition-all duration-200`}
                        placeholder="voce@empresa.com"
                      />
                      {fieldErrors.email && (
                        <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1.5">
                        WhatsApp <span className="text-red-400">*</span>
                      </label>
                      <PhoneInput
                        value={form.phone}
                        onChange={handlePhoneChange}
                        className={`w-full rounded-xl bg-white/10 border ${
                          fieldErrors.phone
                            ? "border-red-400/50 focus-within:border-red-400"
                            : "border-white/10 focus-within:border-[#a3ff3c]"
                        } focus-within:ring-2 focus-within:ring-[#a3ff3c]/20 transition-all duration-200`}
                      />
                      {fieldErrors.phone && (
                        <p className="mt-1 text-xs text-red-400">{fieldErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Empresa e Cargo */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-1.5">
                        Empresa
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-[#a3ff3c] focus:ring-2 focus:ring-[#a3ff3c]/20 transition-all duration-200"
                        placeholder="Sua empresa"
                      />
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-1.5">
                        Cargo
                      </label>
                      <input
                        id="role"
                        name="role"
                        type="text"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-[#a3ff3c] focus:ring-2 focus:ring-[#a3ff3c]/20 transition-all duration-200"
                        placeholder="Ex: Gerente de Projetos"
                      />
                    </div>
                  </div>

                  {/* Nível e Horário */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="level" className="block text-sm font-medium text-slate-300 mb-1.5">
                        Seu nível hoje
                      </label>
                      <select
                        id="level"
                        name="level"
                        value={form.level}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#a3ff3c] focus:ring-2 focus:ring-[#a3ff3c]/20 transition-all duration-200 [&>option]:bg-[#161533]"
                      >
                        {[
                          "A1 (iniciante)",
                          "A2 (básico)",
                          "B1 (consigo, mas travo)",
                          "B2 (me viro, falta fluidez)",
                          "C1 (avançado)",
                        ].map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="preferredTime" className="block text-sm font-medium text-slate-300 mb-1.5">
                        Melhor horário
                      </label>
                      <input
                        id="preferredTime"
                        name="preferredTime"
                        type="text"
                        value={form.preferredTime}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-[#a3ff3c] focus:ring-2 focus:ring-[#a3ff3c]/20 transition-all duration-200"
                        placeholder="Ex: seg/qua à noite"
                      />
                    </div>
                  </div>

                  {/* Consentimento LGPD */}
                  <div>
                    <label className="flex items-start gap-3 text-sm text-slate-300 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={form.consent}
                        onChange={handleChange}
                        required
                        className="mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-[#a3ff3c] focus:ring-2 focus:ring-[#a3ff3c]/20 transition-all duration-200"
                      />
                      <span className="flex-1">
                        Autorizo o contato por WhatsApp/e-mail para agendamento e receberei
                        materiais sobre o programa. Você pode cancelar a qualquer momento.{" "}
                        <Link
                          href="/politica-de-privacidade"
                          className="text-[#a3ff3c] hover:underline group-hover:text-[#92e636] transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Política de Privacidade
                        </Link>
                        .
                      </span>
                    </label>
                    {fieldErrors.consent && (
                      <p className="mt-1 text-xs text-red-400">{fieldErrors.consent}</p>
                    )}
                  </div>

                  {/* UTM hidden */}
                  {(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const).map(
                    (k) => (
                      <input key={k} type="hidden" name={k} value={form[k] || ""} />
                    )
                  )}

                  {/* Error message */}
                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                      <p className="text-sm text-red-400 font-medium">{error}</p>
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={loading || !isFormValid}
                    className={`w-full inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                      loading || !isFormValid
                        ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                        : "bg-[#a3ff3c] text-[#161533] hover:bg-[#92e636] shadow-lg shadow-[#a3ff3c]/30 hover:shadow-[#a3ff3c]/40 hover:scale-[1.02] active:scale-[0.98]"
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Agendar meu assessment gratuito
                        <ArrowRightIcon />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-center text-slate-400">
                    Tempo médio: 30–40 min • 100% gratuito • Sem compromisso
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção: Método SPO */}
      <section id="spo" className="py-16 md:py-24 bg-gradient-to-b from-[#0B1020] to-[#161533]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                Método SPO + Comunicação Real
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                Nosso método une <strong className="text-white">Structure</strong> (bases sólidas),{" "}
                <strong className="text-white">Personal Growth</strong> (autoconfiança e mindset) e{" "}
                <strong className="text-white">Oratory</strong> (fala persuasiva no contexto de
                negócios). Você não vai apenas "passar por aulas": vai{" "}
                <em className="text-[#a3ff3c]">desbloquear</em> sua comunicação no que realmente
                importa — reuniões, apresentações, negociações e liderança.
              </p>
              <ul className="space-y-4">
                {[
                  "Diagnóstico preciso do seu nível e das travas reais.",
                  "Plano prático para avançar de B1 para B2/C1 com segurança.",
                  "Treino focado em situações de trabalho — não frases de livro.",
                  "Feedback honesto e aplicável já no primeiro encontro.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckIcon className="text-[#a3ff3c] mt-0.5 flex-shrink-0" />
                    <span className="text-slate-200 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 lg:p-8 space-y-6">
              <h3 className="text-xl font-semibold">Por que a maioria trava?</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#a3ff3c] mt-1">•</span>
                  <span>
                    Aprendeu gramática, mas não treinou <em>oratória</em> e <em>tom de voz</em> para
                    negócios.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#a3ff3c] mt-1">•</span>
                  <span>
                    Falta de exposição guiada a conversas reais — com correção no que importa.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#a3ff3c] mt-1">•</span>
                  <span>
                    Medo de errar → evita reuniões → perde oportunidades de visibilidade.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#a3ff3c] mt-1">•</span>
                  <span>
                    Sem plano claro de evolução (do nível atual até a performance desejada).
                  </span>
                </li>
              </ul>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Hoje</div>
                  <div className="font-semibold text-white">Entendo, mas travo</div>
                </div>
                <div className="p-4 rounded-xl bg-[#a3ff3c]/10 border border-[#a3ff3c]/20">
                  <div className="text-xs text-[#a3ff3c] uppercase tracking-wider mb-1">
                    Próximo passo
                  </div>
                  <div className="font-semibold text-white">Falo com confiança e clareza</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparativo */}
      <section id="comparativo" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center">
            Inglês Tradicional × Método Hub
          </h2>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 backdrop-blur-sm p-6 lg:p-8">
              <h3 className="text-xl font-semibold mb-4 text-red-400">Tradicional</h3>
              <ul className="space-y-3 text-slate-300">
                {[
                  "Aulas genéricas, pouca conexão com seu trabalho.",
                  "Foco em regras → pouca prática de fala real.",
                  "Medo de errar não é trabalhado.",
                  "Sem plano claro para avançar de nível.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#a3ff3c]/20 bg-[#a3ff3c]/5 backdrop-blur-sm p-6 lg:p-8">
              <h3 className="text-xl font-semibold mb-4 text-[#a3ff3c]">
                Hub (SPO + Comunicação Real)
              </h3>
              <ul className="space-y-3 text-slate-300">
                {[
                  "Personalização para cenários de reuniões, apresentações e liderança.",
                  "Correção ativa e treino de oratória para negócios.",
                  "Segurança psicológica e estratégias anti-trava.",
                  "Roadmap de evolução do seu nível atual ao objetivo.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckIcon className="text-[#a3ff3c] mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-16 md:py-24 bg-gradient-to-b from-[#161533] to-[#0B1020]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center">
            Resultados Reais
          </h2>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                quote:
                  "Destravei meu inglês e fui promovido em 3 meses. A diferença foi treinar situações reais do trabalho.",
                name: "Rafael",
                role: "Gerente de Projetos",
              },
              {
                quote:
                  "Parei de estudar no escuro. Em uma sessão já entendi meu gargalo e o que fazer toda semana.",
                name: "Marina",
                role: "Product Manager",
              },
              {
                quote:
                  "Hoje participo de calls globais com confiança. É treino de oratória, não só gramática.",
                name: "Carlos",
                role: "Sales Director",
              },
            ].map((testimonial, idx) => (
              <figure
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 lg:p-8 hover:bg-white/10 transition-all duration-200"
              >
                <blockquote className="text-slate-200 leading-relaxed mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <figcaption className="text-sm">
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-slate-400">{testimonial.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center">
            Perguntas frequentes
          </h2>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
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
            ].map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all duration-200"
              >
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#a3ff3c]/10 via-[#6366F1]/10 to-[#a3ff3c]/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 lg:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Pronto para <span className="text-[#a3ff3c]">parar de travar</span> e crescer na
              carreira?
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Agende seu assessment gratuito com um expert da Hub.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#formulario"
                onClick={handleAnchorClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#a3ff3c] text-[#161533] hover:bg-[#92e636] transition-all duration-200 font-semibold shadow-lg shadow-[#a3ff3c]/30 hover:shadow-[#a3ff3c]/40 hover:scale-105 active:scale-95"
              >
                Agendar meu assessment gratuito
                <ArrowRightIcon />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-200 font-medium backdrop-blur-sm"
              >
                Falar no WhatsApp agora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#161533]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8 text-sm">
            <div>
              <div className="font-semibold text-white mb-3">Hub Academy</div>
              <p className="text-slate-400 leading-relaxed">
                Inglês como ferramenta de trabalho. Método SPO + comunicação real.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white mb-3">Contato</div>
              <p className="text-slate-400">
                São Paulo, Brasil
                <br />
                <a
                  href="mailto:contato@hubacademy.com.br"
                  className="text-[#a3ff3c] hover:underline"
                >
                  contato@hubacademy.com.br
                </a>
              </p>
            </div>
            <div>
              <div className="font-semibold text-white mb-3">LGPD</div>
              <p className="text-slate-400 leading-relaxed">
                Tratamos dados conforme a LGPD.{" "}
                <Link href="/politica-de-privacidade" className="text-[#a3ff3c] hover:underline">
                  Política de Privacidade
                </Link>{" "}
                disponível no site.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-slate-500 text-xs">
            © {new Date().getFullYear()} Hub Academy. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Modal de vídeo */}
      <VideoModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} />
    </div>
  )
}
