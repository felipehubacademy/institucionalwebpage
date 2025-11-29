"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import Link from "next/link"
import { LogoImage } from "@/components/logo-image"
import { PhoneInput } from "@/components/phone-input"
import { AssessmentQualificationFlow } from "@/components/assessment-qualification-flow"
import { Menu, X, XCircle, Check } from "lucide-react"

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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showQualification, setShowQualification] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
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
        if (typeof value === "string" && value.length > 0) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          
          // Verificar formato básico
          if (!emailRegex.test(value)) {
            errors.email = "E-mail inválido"
          } else {
            // Verificar domínio válido (pelo menos 2 caracteres após o ponto)
            const emailParts = value.split("@")
            const domainMatch = value.match(/@([^.]+)\.(.+)$/)
            if (domainMatch && emailParts.length === 2) {
              const [, domain, tld] = domainMatch
              const username = emailParts[0]
              
              // Lista de typos comuns em domínios conhecidos
              const commonTypos: Record<string, string> = {
                "gmail.copm": "gmail.com",
                "gmail.con": "gmail.com",
                "gmail.co": "gmail.com",
                "hotmail.con": "hotmail.com",
                "hotmail.co": "hotmail.com",
                "hotmail.copm": "hotmail.com",
                "outlook.con": "outlook.com",
                "outlook.co": "outlook.com",
                "yahoo.con": "yahoo.com",
                "yahoo.co": "yahoo.com",
              }
              
              const domainKey = `${domain}.${tld}`
              if (commonTypos[domainKey]) {
                errors.email = `Domínio inválido. Você quis dizer ${username}@${commonTypos[domainKey]}?`
              } else if (tld.length < 2) {
                errors.email = "Domínio inválido. Verifique o final do e-mail (ex: .com, .com.br)"
              } else if (domain.length < 1) {
                errors.email = "Domínio inválido"
              }
            }
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
      
      // Validação de email melhorada
      if (!form.email) {
        errors.email = "E-mail obrigatório"
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(form.email)) {
          errors.email = "E-mail inválido"
        } else {
          // Verificar domínio válido
          const emailParts = form.email.split("@")
          const domainMatch = form.email.match(/@([^.]+)\.(.+)$/)
          if (domainMatch && emailParts.length === 2) {
            const [, domain, tld] = domainMatch
            const username = emailParts[0]
            
            // Lista de typos comuns em domínios conhecidos
            const commonTypos: Record<string, string> = {
              "gmail.copm": "gmail.com",
              "gmail.con": "gmail.com",
              "gmail.co": "gmail.com",
              "hotmail.con": "hotmail.com",
              "hotmail.co": "hotmail.com",
              "hotmail.copm": "hotmail.com",
              "outlook.con": "outlook.com",
              "outlook.co": "outlook.com",
              "yahoo.con": "yahoo.com",
              "yahoo.co": "yahoo.com",
            }
            
            const domainKey = `${domain}.${tld}`
            if (commonTypos[domainKey]) {
              errors.email = `Domínio inválido. Você quis dizer ${username}@${commonTypos[domainKey]}?`
            } else if (tld.length < 2) {
              errors.email = "Domínio inválido. Verifique o final do e-mail (ex: .com, .com.br)"
            }
          }
        }
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

        // Tracking events via dataLayer (GTM gerencia Meta Pixel, LinkedIn, etc)
        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "generate_lead",
            lead_type: "assessment",
            form_location: "assessment_landing",
            // Meta Pixel - evento Lead (GTM vai capturar e enviar)
            fb_event: "Lead",
            fb_content_name: "Assessment Gratuito",
            fb_content_category: "Assessment",
          })
        }

        // Mostrar modal de qualificação ao invés de redirecionar
        setLoading(false)
        setShowQualification(true)
      } catch (err: any) {
        setError(err.message || "Erro inesperado. Por favor, tente novamente.")
        setLoading(false)
      }
    },
    [form]
  )

  // Handler para completar qualificação
  const handleQualificationComplete = useCallback(
    async (answers: {
      career_level: string
      english_situation: string
      english_pain_points: string
      motivation: string
      timeline: string
      previous_investment: string
      budget: string
      personalized_plan: string
    }) => {
      try {
        const res = await fetch("/api/lead/qualification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            career_level: answers.career_level,
            english_situation: answers.english_situation,
            english_pain_points: answers.english_pain_points,
            motivation: answers.motivation,
            timeline: answers.timeline,
            previous_investment: answers.previous_investment,
            budget: answers.budget,
            personalized_plan: answers.personalized_plan,
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || "Falha ao finalizar qualificação. Tente novamente.")
        }

        // Redirecionar para obrigado após sucesso
        window.location.href = "/obrigado"
      } catch (err: any) {
        console.error("Error completing qualification:", err)
        setError(err.message || "Erro ao finalizar qualificação. Você já está cadastrado!")
        setShowQualification(false)
      }
    },
    [form.email]
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

  const isFormValid = useMemo(
    () => {
      // Verificar se há erros de validação
      const hasErrors = Object.keys(fieldErrors).length > 0
      
      // Validação básica dos campos obrigatórios
      const basicValidation =
        form.firstName.length >= 2 &&
        form.lastName.length >= 2 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
        form.phone.replace(/\D/g, "").length >= 10 &&
        form.consent
      
      // Formulário válido apenas se não houver erros E passar na validação básica
      return !hasErrors && basicValidation
    },
    [form, fieldErrors]
  )

  return (
    <div className="min-h-screen bg-[#0B1020] text-white antialiased overflow-x-hidden">
      {/* Header fixo com scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#161533] backdrop-blur-md shadow-lg border-b border-white/10"
            : "bg-[#161533]/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <LogoImage
                src="/images/Logo_horizontal_green.svg"
                alt="Hub Academy"
                width={isScrolled ? 100 : 120}
                height={isScrolled ? 30 : 36}
                priority={true}
                className="transition-all duration-300 sm:w-[120px] sm:h-[36px] md:w-[140px] md:h-[42px]"
              />
            </Link>
            
            {/* Desktop Navigation */}
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

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#formulario"
                onClick={handleAnchorClick}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#a3ff3c] text-[#161533] hover:bg-[#92e636] transition-all duration-200 font-semibold text-sm shadow-lg shadow-[#a3ff3c]/20 hover:shadow-[#a3ff3c]/30"
              >
                Agendar grátis
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 bg-[#161533]/95 backdrop-blur-md">
              <nav className="flex flex-col py-4 space-y-2">
                {[
                  { href: "#como-funciona", label: "Como funciona" },
                  { href: "#spo", label: "Método SPO" },
                  { href: "#comparativo", label: "Comparativo" },
                  { href: "#depoimentos", label: "Resultados" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      handleAnchorClick(e)
                      setMobileMenuOpen(false)
                    }}
                    className="px-4 py-3 text-base font-medium text-white/90 hover:text-[#a3ff3c] hover:bg-white/5 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#formulario"
                  onClick={(e) => {
                    handleAnchorClick(e)
                    setMobileMenuOpen(false)
                  }}
                  className="mx-4 mt-4 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#a3ff3c] text-[#161533] hover:bg-[#92e636] transition-all duration-200 font-semibold"
                >
                  Agendar grátis
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-24">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute top-0 -left-1/4 w-[800px] h-[800px] bg-[#6366F1]/20 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 -right-1/4 w-[600px] h-[600px] bg-[#a3ff3c]/10 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Conteúdo à esquerda - aparece primeiro no mobile */}
            <div className="space-y-6 order-1 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#a3ff3c]/10 border border-[#a3ff3c]/20">
                <span className="w-2 h-2 rounded-full bg-[#a3ff3c] animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#a3ff3c]">
                  Assessment individual com expert
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Pare de perder oportunidades e{" "}
                <span className="text-[#a3ff3c]">destrave sua comunicação em inglês!</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
                Você já entende inglês, mas não sente confiança para demonstrar seu potencial? Em
                um encontro gratuito, um expert da Hub vai diagnosticar seu nível, mapear suas
                travas e te mostrar o caminho até o próximo nível.
              </p>

              {/* Steps */}
              <div id="como-funciona" className="grid grid-cols-3 gap-2 sm:gap-4 pt-4">
                {[
                  { step: "1", label: "Preencha", desc: "o formulário" },
                  { step: "2", label: "Agende", desc: "seu horário" },
                  { step: "3", label: "Converse", desc: "com expert" },
                ].map((item, i) => (
                  <div
                    key={item.step}
                    className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="text-xl sm:text-2xl font-bold text-[#a3ff3c] mb-1">{item.step}</div>
                    <div className="text-xs sm:text-sm font-semibold text-white">{item.label}</div>
                    <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5 hidden sm:block">{item.desc}</div>
                  </div>
                ))}
              </div>

              {/* CTA Button - Apenas no mobile */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4 lg:hidden">
                <a
                  href="#formulario"
                  onClick={handleAnchorClick}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#a3ff3c] text-[#161533] hover:bg-[#92e636] transition-all duration-200 font-semibold text-sm sm:text-base shadow-lg shadow-[#a3ff3c]/30 hover:shadow-[#a3ff3c]/40 hover:scale-105 active:scale-95 w-full sm:w-auto"
                >
                  Agendar meu assessment gratuito
                  <ArrowRightIcon className="hidden sm:block" />
                </a>
              </div>
            </div>

            {/* Formulário à direita - aparece depois no mobile */}
            <div id="formulario" className="lg:sticky lg:top-24 order-2 lg:order-last">
              <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6 lg:p-8 shadow-2xl">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Agende seu Assessment Gratuito</h2>
                  <p className="text-slate-300 text-sm">
                    Conversa 1:1 com um expert da Hub • 30–40 minutos • 100% gratuito
                  </p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-3 sm:space-y-4" noValidate>
                  {/* Nome e Sobrenome */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                            ? "border-red-400/50 focus:border-red-400"
                            : "border-white/10 focus:border-[#a3ff3c]"
                        } px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-[#a3ff3c]/20 transition-all duration-200`}
                      />
                      {fieldErrors.phone && (
                        <p className="mt-1 text-xs text-red-400">{fieldErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Empresa e Cargo */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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

                  {/* Melhor horário */}
                  <div>
                    <label htmlFor="preferredTime" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Melhor horário
                    </label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={form.preferredTime}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white outline-none focus:border-[#a3ff3c] focus:ring-2 focus:ring-[#a3ff3c]/20 transition-all duration-200 [&>option]:bg-[#161533]"
                    >
                      <option value="">Selecione um horário</option>
                      {["Manhã", "Tarde", "Noite"].map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Consentimento LGPD */}
                  <div>
                    <label className="flex items-start gap-3 text-sm text-slate-300 cursor-pointer group">
                      <div className="relative mt-1 flex-shrink-0">
                        <input
                          type="checkbox"
                          name="consent"
                          checked={form.consent}
                          onChange={handleChange}
                          required
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                            form.consent
                              ? "bg-[#a3ff3c] border-[#a3ff3c]"
                              : "bg-white/10 border-white/20 group-hover:border-[#a3ff3c]/50"
                          }`}
                        >
                          {form.consent && (
                            <Check className="w-3 h-3 text-[#161533] stroke-[3]" />
                          )}
                        </div>
                      </div>
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

      {/* Seção: Antes e Depois */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-[#161533] to-[#0B1020]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Essa é sua realidade?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Card Único: Talvez essa seja sua realidade */}
            <div className="rounded-2xl border border-red-500/20 bg-white/5 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-xl hover:border-red-500/30 hover:bg-white/10 transition-all duration-200">
              <div className="flex items-center gap-3 mb-6 sm:mb-8 pb-4 border-b border-red-500/20">
                <XCircle className="text-red-400 flex-shrink-0" size={28} />
                <h3 className="text-xl sm:text-2xl font-bold text-red-400">Talvez essa seja sua realidade</h3>
              </div>
              <ul className="space-y-4 sm:space-y-5">
                {[
                  "Não me comunico com segurança e não sou levado a sério em reuniões com clientes ou líderes estrangeiros.",
                  "Dependo de colegas para traduzir ideias e mensagens importantes, o que me faz parecer menos autônomo.",
                  "Perco oportunidades de projetos internacionais ou promoções por falta de fluência.",
                  "Evito participar de reuniões em inglês e acabo ficando invisível nas decisões estratégicas.",
                  "Minha comunicação em inglês é superficial, o que limita minha capacidade de argumentar e negociar.",
                  "Fico inseguro ao escrever e-mails ou apresentações, o que afeta minha imagem profissional.",
                ].map((text, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <XCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{text}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card Único: Onde você já deveria estar */}
            <div className="rounded-2xl border border-[#a3ff3c]/20 bg-white/5 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-xl hover:border-[#a3ff3c]/30 hover:bg-white/10 transition-all duration-200">
              <div className="flex items-center gap-3 mb-6 sm:mb-8 pb-4 border-b border-[#a3ff3c]/20">
                <CheckIcon className="text-[#a3ff3c] flex-shrink-0" />
                <h3 className="text-xl sm:text-2xl font-bold text-[#a3ff3c]">Onde você já deveria estar</h3>
              </div>
              <ul className="space-y-4 sm:space-y-5">
                {[
                  "Consigo me expressar com segurança e profundidade, sou percebido como um profissional confiante e preparado.",
                  "Comunico minhas ideias com clareza e autoridade, sem precisar de intermediários.",
                  "Amplio meu campo de atuação e sou considerado para projetos e cargos globais.",
                  "Participo ativamente de discussões globais e tenho voz nas decisões da empresa.",
                  "Consigo argumentar com profundidade, negociar melhor e transmitir credibilidade.",
                  "Produzo comunicações profissionais, elegantes e estratégicas, que reforçam minha marca pessoal.",
                ].map((text, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckIcon className="text-[#a3ff3c] flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Seção: Método SPO */}
      <section id="spo" className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-[#0B1020] to-[#161533]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
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
      <section id="comparativo" className="py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center">
            Inglês Tradicional × Método Hub
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
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
      <section id="depoimentos" className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-[#161533] to-[#0B1020]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center">
            Resultados Reais
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
      <section className="py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center">
            Perguntas frequentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
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
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-[#a3ff3c]/10 via-[#6366F1]/10 to-[#a3ff3c]/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 lg:p-12 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Pronto para <span className="text-[#a3ff3c]">parar de travar</span> e crescer na
              carreira?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Agende seu assessment gratuito com um expert da Hub.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="#formulario"
                onClick={handleAnchorClick}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#a3ff3c] text-[#161533] hover:bg-[#92e636] transition-all duration-200 font-semibold text-sm sm:text-base shadow-lg shadow-[#a3ff3c]/30 hover:shadow-[#a3ff3c]/40 hover:scale-105 active:scale-95"
              >
                Agendar meu assessment gratuito
                <ArrowRightIcon className="hidden sm:block" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#161533]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-sm">
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
                  href="mailto:contato@hubacademybr.com"
                  className="text-[#a3ff3c] hover:underline"
                >
                  contato@hubacademybr.com
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

      {/* Modal de Qualificação */}
      <AssessmentQualificationFlow
        isOpen={showQualification}
        onClose={() => setShowQualification(false)}
        onComplete={handleQualificationComplete}
        userEmail={form.email}
      />
    </div>
  )
}
