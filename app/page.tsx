"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Globe, Users, Volume2, VolumeX } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { CookieBanner } from "@/components/cookie-banner"
import StructuredData from "@/components/structured-data"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Image from "next/image"
import { ClientLogosCarousel } from "@/components/client-logos-carousel"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { validateImagePaths } from "@/utils/image-validator"
import HubSpotForm from "@/components/hubspot-form"

// Client logos data
const clientLogos = [
  { name: "Avalara", file: "Logo_Avalara.svg", width: 260, height: 72 },
  { name: "Eureciclo", file: "Logo_Eureciclo.svg", width: 260, height: 97 },
  { name: "Libbs", file: "Logo_Libbs.svg", width: 260, height: 138 },
  { name: "JBS", file: "Logo_JBS.svg", width: 260, height: 108 },
  { name: "Amazon", file: "Logo_Amazon.svg", width: 240, height: 93 },
  { name: "Renaissance", file: "Logo_Renaissance.svg", width: 248, height: 140 },
  { name: "Boehringer", file: "Logo_Boehringer.svg", width: 260, height: 93 },
  { name: "Collinson", file: "Logo_Collinson.svg", width: 260, height: 73 },
  { name: "Honeywell", file: "Logo_Honeywell.svg", width: 260, height: 63 },
  { name: "IDEMIA", file: "Logo_IDEMIA.svg", width: 260, height: 83 },
]

// Testimonials data
const testimonials = [
  {
    name: "Kerollaine Lauto",
    role: "Hub Academy - Student",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kerollaine_avatar-Jei2YFzrw9LATdNn6PThUi7JcwMdc3.png",
    text: "Foco individualizado. Ao invés de ser um conteúdo genérico para todos os alunos, o professor realmente está atento e buscando o que realmente fará diferença na sua evolução e aprendizado.",
    rating: 5,
  },
  {
    name: "Nayla Andrade",
    role: "Hub Academy - Student",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Nayla_avatar-xUHAWdxofxyPugRu4mnOU3qNohOS6P.png",
    text: "Acredito que a metodologia personalizada, que busca entender quais são os desafios de cada pessoa é o maior diferencial. Nós conseguimos mapear as minhas fraquezas e necessidades para trabalhar e elas deixarem de atrapalhar meu cotidiano.",
    rating: 5,
  },
  {
    name: "Caroline Cruz de Morais",
    role: "Hub Academy - Student",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Caroline_avatar-Ocz2dOICLBMxVcpHUqky8RTbnq4NyI.png",
    text: "Tenho me sentido mais confiante para falar inglês, mesmo ainda cometendo alguns erros. O método é menos engessado.",
    rating: 5,
  },
]

export default function Home() {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Validate image paths on client side
  useEffect(() => {
    validateImagePaths()
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  // Dados estruturados para a página
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Hub Academy",
    description: "Escola de idiomas especializada em inglês e espanhol para profissionais e empresas.",
    url: "https://hubacademybr.com",
    logo: "https://hubacademybr.com/images/Logo_horizontal_green.svg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    telephone: "+551152865668",
    email: "hub@hubacademybr.com",
    sameAs: ["https://www.instagram.com/hubacademybr/", "https://www.linkedin.com/company/hub-academy-br/"],
    offers: {
      "@type": "Offer",
      name: "Cursos de Inglês e Espanhol para Profissionais",
      description: "Programas personalizados de inglês e espanhol para profissionais e empresas.",
    },
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="overflow-x-hidden">
        {/* Header */}
        <SiteHeader />

        {/* Hero Section */}
        <section className="w-full pt-8 pb-24 md:py-24 lg:py-32 xl:py-48 bg-[#161533] text-white relative overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full pt-16">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              preload="metadata"
            >
              <source src="/videos/hero-video.mp4" type="video/mp4" />
              Seu navegador não suporta vídeos HTML5.
            </video>
            <div className="absolute inset-0 bg-[#161533]/40"></div>
            <button
              onClick={toggleMute}
              className="audio-control-btn"
              aria-label={isMuted ? "Ativar som" : "Desativar som"}
            >
              {isMuted ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6">
              <div className="flex flex-col justify-center space-y-4 pt-0 md:pt-4">
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-5xl xl:text-6xl/none">
                    Domine o inglês e o espanhol com <br className="hidden sm:inline" />
                    <span className="text-[#a3ff3c]">confiança e propósito</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-300 text-base md:text-xl">
                    Aprenda idiomas como ferramenta de crescimento profissional. A Hub entrega desenvolvimento real, com
                    método e acompanhamento estratégico para profissionais e{" "}
                    <span className="text-[#a3ff3c]">empresas</span>.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-2 mb-16 md:mb-8">
                  <Link
                    href="https://wa.me/551152865668?text=Olá,%20gostaria%20de%20agendar%20uma%20aula%20demonstrativa."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full sm:w-auto bg-[#a3ff3c] hover:bg-[#92e636] text-[#161533] rounded-full">
                      Agendar uma demonstração gratuita
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Profissionalizando Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white overflow-hidden relative">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-[#161533]">
                    Profissionalizando o ensino de idiomas no Brasil
                  </h2>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    A Hub é pioneira em aplicar qualidade, estratégia e personalização ao ensino de inglês e espanhol
                    para profissionais. Nosso método exclusivo garante resultados reais e mensuráveis para sua carreira.
                  </p>
                </div>
                <div className="flex flex-col gap-4 pt-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#a3ff3c] mt-1" />
                    <div>
                      <h3 className="font-medium text-[#161533]">Metodologia exclusiva</h3>
                      <p className="text-gray-600">
                        Desenvolvida para profissionais que buscam resultados rápidos e eficazes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#a3ff3c] mt-1" />
                    <div>
                      <h3 className="font-medium text-[#161533]">Acompanhamento estratégico</h3>
                      <p className="text-gray-600">Suporte contínuo para garantir seu desenvolvimento consistente</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#a3ff3c] mt-1" />
                    <div>
                      <h3 className="font-medium text-[#161533]">Foco em resultados</h3>
                      <p className="text-gray-600">
                        Aprendizado orientado para aplicação prática no ambiente profissional
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                {/* Imagem principal */}
                <div className="relative z-10 overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src="/images/MeetUP02.png"
                    width={600}
                    height={450}
                    alt="Encontro de alunos da Hub Academy mostrando participantes com ecobags da marca"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Soluções Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50" id="solucoes">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#e8ffd4] px-3 py-1 text-sm text-[#161533]">
                  Nossas Soluções
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-[#161533]">
                  Soluções personalizadas para cada necessidade
                </h2>
                <p className="max-w-[700px] text-gray-600 md:text-xl">
                  Oferecemos programas adaptados para profissionais e empresas que buscam desenvolvimento real em
                  idiomas.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              <Card className="overflow-hidden border-none shadow-lg">
                <CardHeader className="bg-[#161533] text-white pb-8">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-[#a3ff3c]/20 p-2">
                      <Users className="h-5 w-5 text-[#a3ff3c]" />
                    </div>
                    <CardTitle>Para Profissionais</CardTitle>
                  </div>
                  <CardDescription className="text-gray-300">
                    Desenvolvimento personalizado para sua carreira
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Aulas individuais ou em pequenos grupos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Conteúdo adaptado à sua área de atuação</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Flexibilidade de horários e formatos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Acompanhamento de progresso contínuo</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-center border-t p-6">
                  <Link href="/solucoes">
                    <Button className="bg-[#a3ff3c] hover:bg-[#92e636] text-[#161533] rounded-full">
                      Conhecer programas
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="overflow-hidden border-none shadow-lg">
                <CardHeader className="bg-[#161533] text-white pb-8">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-[#a3ff3c]/20 p-2">
                      <Globe className="h-5 w-5 text-[#a3ff3c]" />
                    </div>
                    <CardTitle>Para Empresas</CardTitle>
                  </div>
                  <CardDescription className="text-gray-300">
                    Soluções corporativas para equipes e lideranças
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Programas in-company ou remotos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Treinamentos específicos para cada setor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Relatórios de desempenho e ROI</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Gestão 360º do programa educacional</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-center border-t p-6">
                  <Link href="#contato">
                    <Button className="bg-[#a3ff3c] hover:bg-[#92e636] text-[#161533] rounded-full">
                      Solicitar proposta
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Metodologia Section */}
        <section className="w-full py-12 md:py-24 lg:py-32" id="metodologia">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#e8ffd4] px-3 py-1 text-sm text-[#161533]">
                  Nossa Metodologia
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-[#161533]">
                  Método exclusivo para resultados reais
                </h2>
                <p className="max-w-[700px] text-gray-600 md:text-xl">
                  Nossa abordagem combina técnicas comprovadas com personalização para garantir seu desenvolvimento
                  efetivo.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="rounded-full bg-[#e8ffd4] p-2 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-[#161533]">1</span>
                  </div>
                  <CardTitle>Diagnóstico Estratégico</CardTitle>
                  <CardDescription>
                    Avaliação completa do seu nível atual e objetivos profissionais para criar um plano personalizado.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="rounded-full bg-[#e8ffd4] p-2 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-[#161533]">2</span>
                  </div>
                  <CardTitle>Imersão Contextualizada</CardTitle>
                  <CardDescription>
                    Aprendizado baseado em situações reais do seu ambiente profissional para aplicação imediata.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="rounded-full bg-[#e8ffd4] p-2 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-[#161533]">3</span>
                  </div>
                  <CardTitle>Acompanhamento Contínuo</CardTitle>
                  <CardDescription>
                    Monitoramento constante do seu progresso com ajustes estratégicos para maximizar resultados.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="rounded-full bg-[#e8ffd4] p-2 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-[#161533]">4</span>
                  </div>
                  <CardTitle>Prática Intensiva</CardTitle>
                  <CardDescription>
                    Sessões focadas em desenvolver fluência e confiança através de simulações e exercícios práticos.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="rounded-full bg-[#e8ffd4] p-2 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-[#161533]">5</span>
                  </div>
                  <CardTitle>Tecnologia Integrada</CardTitle>
                  <CardDescription>
                    Plataformas digitais e recursos de inteligência artificial (AI) que potencializam o aprendizado.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="rounded-full bg-[#e8ffd4] p-2 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-[#161533]">6</span>
                  </div>
                  <CardTitle>Avaliação de Resultados</CardTitle>
                  <CardDescription>
                    Métricas claras e objetivas para mensurar seu desenvolvimento e retorno sobre investimento.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Clientes Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50" id="clientes">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 text-center w-full flex flex-col items-center">
                <div className="inline-block rounded-lg bg-[#e8ffd4] px-3 py-1 text-sm text-[#161533]">
                  Nossos Clientes
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-[#161533]">
                  Algumas das empresas que confiam na Hub Academy
                </h2>
                <p className="max-w-[700px] text-gray-600 md:text-xl mx-auto">
                  Atendemos empresas de diversos setores que buscam desenvolver suas equipes com excelência.
                </p>
              </div>
            </div>

            {/* Carrossel de logos com touch gestures */}
            <div className="my-8 md:my-12">
              <ClientLogosCarousel logos={clientLogos} />
            </div>

            <div className="flex justify-center">
              <Link href="/clientes">
                <Button className="bg-[#a3ff3c] hover:bg-[#92e636] text-[#161533] rounded-full">Ver mais</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Depoimentos Section */}
        <section className="w-full py-12 md:py-24 lg:py-32" id="depoimentos">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#e8ffd4] px-3 py-1 text-sm text-[#161533]">Depoimentos</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-[#161533]">
                  O que dizem nossos alunos
                </h2>
                <p className="max-w-[700px] text-gray-600 md:text-xl">
                  Conheça as histórias de profissionais que transformaram suas carreiras com a Hub Academy.
                </p>
              </div>
            </div>

            {/* Testimonial carousel with touch gestures */}
            <div className="py-12">
              <TestimonialCarousel testimonials={testimonials} showArrows={false} />
            </div>
          </div>
        </section>

        {/* Footer */}
        {/* Footer / CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#161533] text-white" id="contato">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tighter md:text-4xl">
                    Pronto para transformar seu domínio de idiomas?
                  </h2>
                  <p className="max-w-[600px] text-gray-300 text-base md:text-xl">
                    Agende uma consulta gratuita com nossos especialistas e descubra como podemos ajudar você a alcançar
                    seus objetivos profissionais através do domínio de idiomas.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="https://api.whatsapp.com/send/?phone=551152865668&text=Oi%2C+vim+do+site+da+Hub+e+gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+os+programas.&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full sm:w-auto bg-[#a3ff3c] hover:bg-[#92e636] text-[#161533] rounded-full">
                      Falar com um especialista
                    </Button>
                  </Link>
                  <Link href="/solucoes">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto mt-2 sm:mt-0 text-[#161533] bg-white border-white hover:bg-white/10 hover:text-[#a3ff3c]"
                    >
                      Conhecer mais sobre nossos programas
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mt-8 lg:mt-0">
                <Card className="border-none shadow-lg bg-white">
                  <CardHeader>
                    <CardTitle className="text-[#161533]">Entre em contato</CardTitle>
                    <CardDescription>Preencha o formulário abaixo e retornaremos em até 24 horas.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <HubSpotForm portalId="49530565" formId="8486bf2d-b6a7-457c-a228-3b4c032da860" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <SiteFooter />
        {/* Adicione o CookieBanner aqui, antes do fechamento da div principal */}
        <CookieBanner />
      </div>
    </>
  )
}
