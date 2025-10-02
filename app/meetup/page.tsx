"use client"

import { useState, useEffect, type FormEvent, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, CheckCircle, Calendar, MapPin, Clock } from "lucide-react"
import CustomPhoneInput from "@/components/phone-input"
import { useRouter, useSearchParams } from "next/navigation"
import { LogoImage } from "@/components/logo-image"
import Link from "next/link"
import Image from "next/image"

function MeetupPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  const [lgpdConsent, setLgpdConsent] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Capture UTM parameters
  const [utmParams, setUtmParams] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  })

  useEffect(() => {
    setUtmParams({
      utm_source: searchParams.get("utm_source") || "",
      utm_medium: searchParams.get("utm_medium") || "",
      utm_campaign: searchParams.get("utm_campaign") || "",
      utm_term: searchParams.get("utm_term") || "",
      utm_content: searchParams.get("utm_content") || "",
    })
  }, [searchParams])

  const validateForm = (formData: FormData): boolean => {
    const errors: Record<string, string> = {}
    let isValid = true

    // Required fields validation
    const firstname = formData.get("firstname") as string
    const lastname = formData.get("lastname") as string
    const email = formData.get("email") as string
    const english_level = formData.get("english_level") as string

    if (!firstname?.trim()) {
      errors.firstname = "Nome é obrigatório"
      isValid = false
    }

    if (!lastname?.trim()) {
      errors.lastname = "Sobrenome é obrigatório"
      isValid = false
    }

    if (!email?.trim()) {
      errors.email = "E-mail é obrigatório"
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "E-mail inválido"
      isValid = false
    }

    if (!phoneNumber) {
      errors.phone = "Telefone é obrigatório"
      isValid = false
    } else if (!isPhoneValid) {
      errors.phone = "Número de telefone inválido"
      isValid = false
    }

    if (!english_level?.trim()) {
      errors.english_level = "Nível de inglês é obrigatório"
      isValid = false
    }

    if (!lgpdConsent) {
      errors.lgpdConsent = "Você precisa autorizar o contato para se inscrever"
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    // Add phone to form data
    formData.set("phone", phoneNumber)

    // Validate form
    if (!validateForm(formData)) {
      setSubmitError("Por favor, corrija os erros no formulário.")
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare submission data
      const submissionData = {
        firstname: formData.get("firstname"),
        lastname: formData.get("lastname"),
        email: formData.get("email"),
        phone: phoneNumber,
        english_level: formData.get("english_level"),
        lgpdConsent: lgpdConsent,
        ...utmParams,
        honeypot: formData.get("website") || "",
      }

      const response = await fetch("/api/register-meetup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      })

      const result = await response.json()

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Erro ao processar inscrição")
      }

      // Redirect to thank you page on success
      router.push("/meetup-obrigado")
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao processar sua inscrição. Por favor, tente novamente.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFieldChange = (fieldName: string) => {
    if (formErrors[fieldName]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[fieldName]
        return newErrors
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#161533]">
      {/* Invisible Header - Same color as hero */}
      <header className="w-full h-0 bg-[#161533]" />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="relative w-full pt-20 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-32 bg-gradient-to-br from-[#161533] via-[#1e1d4a] to-[#232244] text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          </div>
          
          <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="space-y-8 text-center lg:text-left">
                {/* Logo */}
                <div className="flex justify-center lg:justify-start">
                  <Link href="/" className="inline-block">
                    <LogoImage
                      src="/images/Logo_horizontal_green.svg"
                      alt="Logo Hub Academy"
                      width={140}
                      height={42}
                      priority={true}
                      className="hover:opacity-80 transition-opacity w-28 h-auto md:w-32 lg:w-[140px]"
                    />
                  </Link>
                </div>

                {/* Event Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#a3ff3c]/10 border border-[#a3ff3c]/20 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a3ff3c] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a3ff3c]"></span>
                  </span>
                  <span className="text-sm font-medium text-[#a3ff3c]">Evento Presencial e Gratuito</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
                    <span className="block text-white">English Night Live</span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl font-light text-gray-300">
                    Hub Academy Immersive Meetup
                  </p>
                </div>

                {/* Mobile Image - Show here on mobile */}
                <div className="lg:hidden">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src="/images/MeetUP02.png"
                      alt="English Night Live - Hub Academy Immersive Meetup"
                      width={800}
                      height={450}
                      className="w-full h-auto object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161533]/40 to-transparent" />
                  </div>
                </div>

                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  Uma noite exclusiva de networking e prática de inglês em um ambiente dinâmico e imersivo.
                </p>

                <div className="pt-4">
                  <Button
                    onClick={() => {
                      document.getElementById("inscricao")?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className="group relative bg-gradient-to-r from-[#a3ff3c] to-[#92e636] hover:from-[#92e636] hover:to-[#a3ff3c] text-[#161533] rounded-full text-base md:text-lg px-8 py-6 font-bold shadow-2xl shadow-[#a3ff3c]/20 hover:shadow-[#a3ff3c]/40 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                  >
                  <span className="relative z-10">Garantir minha vaga →</span>
                </Button>
                <p className="text-sm text-gray-400 mt-4">Inscrição gratuita • Vagas limitadas</p>
              </div>
              </div>

              {/* Right Column - Event Info Cards */}
              <div className="relative lg:block hidden space-y-6">
                {/* Event Info Cards */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <Calendar className="h-8 w-8 text-[#a3ff3c] mb-3" />
                    <p className="text-sm text-gray-400 mb-1">Data</p>
                    <p className="text-2xl font-semibold">22 de Outubro</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <Clock className="h-8 w-8 text-[#a3ff3c] mb-3" />
                    <p className="text-sm text-gray-400 mb-1">Horário</p>
                    <p className="text-2xl font-semibold">18h30</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <MapPin className="h-8 w-8 text-[#a3ff3c] mb-3" />
                    <p className="text-sm text-gray-400 mb-1">Local</p>
                    <p className="text-2xl font-semibold">SP - Av. Paulista</p>
                  </div>
                </div>
                {/* Decorative Element */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#a3ff3c]/5 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-[#161533] mb-4">
                O que você vai vivenciar
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Uma experiência completa de desenvolvimento profissional através do inglês
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {/* Benefit Card 1 */}
              <div className="group relative bg-white border-2 border-gray-100 rounded-3xl p-8 hover:border-[#a3ff3c] transition-all duration-300 hover:shadow-2xl hover:shadow-[#a3ff3c]/10 hover:-translate-y-2">
                <div className="absolute top-6 right-6 w-12 h-12 bg-[#a3ff3c]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-6 w-6 text-[#a3ff3c]" />
                </div>
                <div className="space-y-4 pt-4">
                  <h3 className="text-xl font-bold text-[#161533]">Prática Real de Negócios</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Dinâmicas reais de negócios e tomada de decisão, simulando situações do dia a dia corporativo.
                  </p>
                </div>
              </div>

              {/* Benefit Card 2 */}
              <div className="group relative bg-white border-2 border-gray-100 rounded-3xl p-8 hover:border-[#a3ff3c] transition-all duration-300 hover:shadow-2xl hover:shadow-[#a3ff3c]/10 hover:-translate-y-2">
                <div className="absolute top-6 right-6 w-12 h-12 bg-[#a3ff3c]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-6 w-6 text-[#a3ff3c]" />
                </div>
                <div className="space-y-4 pt-4">
                  <h3 className="text-xl font-bold text-[#161533]">Soft Skills Estratégicas</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Desenvolva negociação, problem solving e comunicação de impacto em inglês.
                  </p>
                </div>
              </div>

              {/* Benefit Card 3 */}
              <div className="group relative bg-white border-2 border-gray-100 rounded-3xl p-8 hover:border-[#a3ff3c] transition-all duration-300 hover:shadow-2xl hover:shadow-[#a3ff3c]/10 hover:-translate-y-2">
                <div className="absolute top-6 right-6 w-12 h-12 bg-[#a3ff3c]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-6 w-6 text-[#a3ff3c]" />
                </div>
                <div className="space-y-4 pt-4">
                  <h3 className="text-xl font-bold text-[#161533]">Networking de Alto Nível</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Conecte-se com profissionais de diversas áreas que buscam crescimento através do idioma.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center bg-gradient-to-r from-[#161533] to-[#232244] rounded-3xl p-10 md:p-12">
              <p className="text-xl md:text-2xl text-white font-medium max-w-3xl mx-auto leading-relaxed">
                Este não é apenas mais um encontro de conversação — é uma{" "}
                <span className="text-[#a3ff3c] font-bold">experiência criada para quem entende</span> que inglês é
                ferramenta de trabalho e deseja se destacar em um mercado cada vez mais competitivo.
              </p>
            </div>
          </div>
        </section>

        {/* Registration Form Section */}
        <section id="inscricao" className="relative w-full py-20 md:py-28 bg-white overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#a3ff3c]/5 rounded-full blur-3xl -z-0" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#161533]/5 rounded-full blur-3xl -z-0" />
          
          <div className="container px-4 md:px-6 max-w-3xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#a3ff3c]/10 border border-[#a3ff3c]/20 mb-6">
                <span className="text-sm font-semibold text-[#161533]">🎟️ Vagas Limitadas</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#161533] mb-4">
                Garanta sua vaga
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Preencha o formulário abaixo e receba a confirmação por e-mail e WhatsApp
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white border-2 border-gray-100 p-8 md:p-12 rounded-3xl shadow-2xl shadow-gray-200/50">
              {/* Honeypot field */}
              <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

              {/* Name fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label htmlFor="firstname" className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    Nome <span className="text-[#a3ff3c] text-xs">●</span>
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    className={`flex h-14 w-full rounded-xl border-2 ${formErrors.firstname ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"} px-5 py-3 text-base font-medium transition-all focus:border-[#a3ff3c] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#a3ff3c]/10 disabled:cursor-not-allowed disabled:opacity-50 hover:border-gray-300`}
                    placeholder="Seu nome"
                    disabled={isSubmitting}
                    onChange={() => handleFieldChange("firstname")}
                  />
                  {formErrors.firstname && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <span>⚠️</span> {formErrors.firstname}
                    </p>
                  )}
                </div>
                <div className="space-y-3">
                  <label htmlFor="lastname" className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    Sobrenome <span className="text-[#a3ff3c] text-xs">●</span>
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    className={`flex h-14 w-full rounded-xl border-2 ${formErrors.lastname ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"} px-5 py-3 text-base font-medium transition-all focus:border-[#a3ff3c] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#a3ff3c]/10 disabled:cursor-not-allowed disabled:opacity-50 hover:border-gray-300`}
                    placeholder="Seu sobrenome"
                    disabled={isSubmitting}
                    onChange={() => handleFieldChange("lastname")}
                  />
                  {formErrors.lastname && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <span>⚠️</span> {formErrors.lastname}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-3">
                <label htmlFor="email" className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  E-mail <span className="text-[#a3ff3c] text-xs">●</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`flex h-14 w-full rounded-xl border-2 ${formErrors.email ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"} px-5 py-3 text-base font-medium transition-all focus:border-[#a3ff3c] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#a3ff3c]/10 disabled:cursor-not-allowed disabled:opacity-50 hover:border-gray-300`}
                  placeholder="seu@email.com"
                  disabled={isSubmitting}
                  onChange={() => handleFieldChange("email")}
                />
                {formErrors.email && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span>⚠️</span> {formErrors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-3">
                <label htmlFor="phone" className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  Telefone <span className="text-[#a3ff3c] text-xs">●</span>
                </label>
                <CustomPhoneInput
                  value={phoneNumber}
                  onChange={(value) => {
                    setPhoneNumber(value || "")
                    handleFieldChange("phone")
                  }}
                  disabled={isSubmitting}
                  placeholder="+55 11 99999-9999"
                  required={true}
                  onValidationChange={setIsPhoneValid}
                />
                {formErrors.phone && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span>⚠️</span> {formErrors.phone}
                  </p>
                )}
              </div>

              {/* English Level */}
              <div className="space-y-3">
                <label htmlFor="english_level" className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  Nível de Inglês <span className="text-[#a3ff3c] text-xs">●</span>
                </label>
                <select
                  id="english_level"
                  name="english_level"
                  className={`flex h-14 w-full rounded-xl border-2 ${formErrors.english_level ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"} px-5 py-3 text-base font-medium transition-all focus:border-[#a3ff3c] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#a3ff3c]/10 disabled:cursor-not-allowed disabled:opacity-50 hover:border-gray-300 appearance-none bg-no-repeat bg-right pr-12`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23161533' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundPosition: "right 1rem center",
                  }}
                  disabled={isSubmitting}
                  onChange={() => handleFieldChange("english_level")}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecione seu nível
                  </option>
                  <option value="Básico">Básico</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </select>
                {formErrors.english_level && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span>⚠️</span> {formErrors.english_level}
                  </p>
                )}
              </div>

              {/* LGPD Consent */}
              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3 p-4 md:p-5 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-[#a3ff3c]/30 transition-colors">
                  <Checkbox
                    id="lgpdConsent"
                    checked={lgpdConsent}
                    onCheckedChange={(checked) => {
                      setLgpdConsent(checked === true)
                      handleFieldChange("lgpdConsent")
                    }}
                    disabled={isSubmitting}
                    className="mt-0.5 h-5 w-5 flex-shrink-0 data-[state=checked]:bg-[#a3ff3c] data-[state=checked]:border-[#a3ff3c]"
                  />
                  <label htmlFor="lgpdConsent" className="text-sm text-gray-700 cursor-pointer leading-relaxed flex-1">
                    Autorizo o contato da Hub Academy com informações sobre este evento.{" "}
                    <span className="text-[#a3ff3c] font-bold">*</span>
                  </label>
                </div>
                {formErrors.lgpdConsent && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span>⚠️</span> {formErrors.lgpdConsent}
                  </p>
                )}
              </div>

              {/* Submit error */}
              {submitError && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5 flex items-start gap-3">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <p className="font-bold text-red-900 mb-1">Ops! Algo deu errado</p>
                    <p className="text-sm text-red-700">{submitError}</p>
                  </div>
                </div>
              )}

              {/* Submit button */}
              <div className="pt-4 flex flex-col items-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full md:w-auto md:min-w-[400px] bg-gradient-to-r from-[#a3ff3c] to-[#92e636] hover:from-[#92e636] hover:to-[#a3ff3c] text-[#161533] rounded-full text-lg md:text-xl py-7 px-12 font-bold shadow-2xl shadow-[#a3ff3c]/30 hover:shadow-[#a3ff3c]/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span>Processando sua inscrição...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>Confirmar inscrição</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  )}
                </Button>
                <div className="mt-4 flex items-center justify-center gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <span className="text-[#a3ff3c]">●</span> Campos obrigatórios
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">🔒 Seus dados estão seguros</span>
                </div>
              </div>
            </form>
          </div>
        </section>
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

export default function MeetupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#161533] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#a3ff3c]" />
      </div>
    }>
      <MeetupPageContent />
    </Suspense>
  )
}


