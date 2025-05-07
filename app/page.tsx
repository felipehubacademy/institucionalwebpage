"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Globe, Users, Volume2, VolumeX, User } from "lucide-react"
import Image from "next/image"
import { useState, useRef } from "react"

// Modifique o array clientLogos para colocar os logos problemáticos mais próximos do início
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

export default function Home() {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 z-40 w-full bg-[#161533] text-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="/images/Logo_horizontal_green.svg"
                alt="Logo Hub Academy"
                width={140}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-[#a3ff3c] transition-colors">
              Home
            </Link>
            <Link href="/sobre" className="text-sm font-medium hover:text-[#a3ff3c] transition-colors">
              Sobre
            </Link>
            <Link href="/metodologia" className="text-sm font-medium hover:text-[#a3ff3c] transition-colors">
              Metodologia
            </Link>
            <Link href="/solucoes" className="text-sm font-medium hover:text-[#a3ff3c] transition-colors">
              Soluções
            </Link>
            <Link href="/clientes" className="text-sm font-medium hover:text-[#a3ff3c] transition-colors">
              Clientes
            </Link>
            <Link href="/impacto" className="text-sm font-medium hover:text-[#a3ff3c] transition-colors">
              Impacto
            </Link>
            <Link href="/contato" className="text-sm font-medium hover:text-[#a3ff3c] transition-colors">
              Contato
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="https://lms.hubacademybr.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-[#a3ff3c] transition-colors flex items-center gap-1"
            >
              <User size={14} />
              Login
            </Link>
          </div>
        </div>
      </header>

      <style jsx>{`
  .logo-carousel-container {
    position: relative;
    overflow: hidden;
    padding: 20px 0;
  }
  
  .logo-carousel {
    display: flex;
    animation: scroll 60s linear infinite; /* Alterado de 30s para 60s para tornar mais lento */
    width: fit-content; /* Garantir que o carrossel tenha largura suficiente */
  }
  
  .logo-carousel:hover {
    animation-play-state: paused;
  }
  
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc((-180px - 16px) * 10)); /* Ajustado para incluir o espaçamento (mx-2 = 8px de cada lado = 16px total) */
    }
  }
  
  .logo-slide {
    flex: 0 0 auto;
  }
`}</style>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[#161533] text-white relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-position-[50%_80%] opacity-60"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
            Seu navegador não suporta vídeos HTML5.
          </video>
          <div className="absolute inset-0 bg-[#161533]/40"></div>
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white z-10 transition-colors"
            aria-label={isMuted ? "Ativar som" : "Desativar som"}
          >
            {isMuted ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-6">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Domine o inglês e o espanhol com <br />
                  <span className="text-[#a3ff3c]">confiança e propósito</span>
                </h1>
                <p className="max-w-[600px] text-gray-300 md:text-xl">
                  Aprenda idiomas como ferramenta de crescimento profissional. A Hub entrega desenvolvimento real, com
                  método e acompanhamento estratégico para profissionais e{" "}
                  <span className="text-[#a3ff3c]">empresas</span>.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="https://api.whatsapp.com/send/?phone=551152865668&text=Oi%2C+vim+do+site+da+Hub+e+gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+os+programas.&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-[#a3ff3c] hover:bg-[#92e636] text-[#161533] rounded-full">
                    Fale com um especialista
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
                  A Hub é pioneira em aplicar qualidade, estratégia e personalização ao ensino de inglês e espanhol para
                  profissionais. Nosso método exclusivo garante resultados reais e mensuráveis para sua carreira.
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
              {/* Textura superior */}
              <div className="absolute w-[120%] h-[120%] -top-[10%] -right-[10%] -z-10 opacity-100">
                <Image
                  src="/images/texture-site.svg"
                  alt="Textura decorativa superior"
                  width={800}
                  height={800}
                  className="w-full h-full object-contain transform rotate-45"
                />
              </div>

              {/* Imagem principal */}
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MeetUp_2024-iDmVS9iLSU0XQPlLqZyu5yg1rbNYZN.png"
                width={600}
                height={600}
                alt="Encontro de alunos da Hub Academy mostrando participantes com ecobags da marca"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover relative z-10"
              />

              {/* Textura inferior */}
              <div className="absolute w-[120%] h-[120%] -bottom-[10%] -left-[10%] -z-10 opacity-100">
                <Image
                  src="/images/texture-site.svg"
                  alt="Textura decorativa inferior"
                  width={800}
                  height={800}
                  className="w-full h-full object-contain transform -rotate-45"
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
                Oferecemos programas adaptados para profissionais e empresas que buscam desenvolvimento real em idiomas.
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

          {/* Carrossel de logos */}
          <div className="logo-carousel-container w-full overflow-hidden relative my-12">
            <div className="logo-carousel flex items-center">
              {/* Primeiro conjunto de logos */}
              {clientLogos.map((logo, i) => (
                <div
                  key={`logo-1-${i}`}
                  className="logo-slide bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-20 w-[180px] mx-2" // Reduzido o padding, altura e margem
                >
                  <Image
                    src={`/images/logos/${logo.file}`}
                    width={logo.width}
                    height={logo.height}
                    alt={`Logo de ${logo.name}`}
                    className="max-h-10 w-auto max-w-[150px]" // Limitando a largura máxima
                  />
                </div>
              ))}
              {/* Duplicação dos logos para efeito de rolagem infinita */}
              {clientLogos.map((logo, i) => (
                <div
                  key={`logo-2-${i}`}
                  className="logo-slide bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-20 w-[180px] mx-2" // Reduzido o padding, altura e margem
                >
                  <Image
                    src={`/images/logos/${logo.file}`}
                    width={logo.width}
                    height={logo.height}
                    alt={`Logo de ${logo.name}`}
                    className="max-h-10 w-auto max-w-[150px]" // Limitando a largura máxima
                  />
                </div>
              ))}
            </div>
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
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  {/* Update 1 */}
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-[#a3ff3c]"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 italic">
                    "Foco individualizado. Ao invés de ser um conteúdo genérico para todos os alunos, o professor
                    realmente está atento e buscando o que realmente fará diferença na sua evolução e aprendizado."
                  </p>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="rounded-full bg-gray-200 p-1">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kerollaine_avatar-Jei2YFzrw9LATdNn6PThUi7JcwMdc3.png"
                        width={40}
                        height={40}
                        alt="Foto de Kerollaine Lauto"
                        className="rounded-full grayscale"
                      />
                    </div>
                    <div>
                      <p className="font-medium">Kerollaine Lauto</p>
                      <p className="text-sm text-gray-500">Hub Academy - Student</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-[#a3ff3c]"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 italic">
                    "Acredito que a metodologia personalizada, que busca entender quais são os desafios de cada pessoa é
                    o maior diferencial. Nós conseguimos mapear as minhas fraquezas e necessidades para trabalhar e elas
                    deixarem de atrapalhar meu cotidiano."
                  </p>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="rounded-full bg-gray-200 p-1">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Nayla_avatar-xUHAWdxofxyPugRu4mnOU3qNohOS6P.png"
                        width={40}
                        height={40}
                        alt="Foto de Nayla Andrade"
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium">Nayla Andrade</p>
                      <p className="text-sm text-gray-500">Hub Academy - Student</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-[#a3ff3c]"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 italic">
                    "Tenho me sentido mais confiante para falar inglês, mesmo ainda cometendo alguns erros. O método é
                    menos engessado."
                  </p>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="rounded-full bg-gray-200 p-1">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Caroline_avatar-Ocz2dOICLBMxVcpHUqky8RTbnq4NyI.png"
                        width={40}
                        height={40}
                        alt="Foto de Caroline Cruz de Morais"
                        className="rounded-full grayscale"
                      />
                    </div>
                    <div>
                      <p className="font-medium">Caroline Cruz de Morais</p>
                      <p className="text-sm text-gray-500">Hub Academy - Student</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Pronto para transformar seu domínio de idiomas?
                </h2>
                <p className="max-w-[600px] text-gray-300 md:text-xl">
                  Agende uma consulta gratuita com nossos especialistas e descubra como podemos ajudar você a alcançar
                  seus objetivos profissionais através do domínio de idiomas.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="https://api.whatsapp.com/send/?phone=551152865668&text=Oi%2C+vim+do+site+da+Hub+e+gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+os+programas.&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-[#a3ff3c] hover:bg-[#92e636] text-[#161533] rounded-full">
                    Falar com um especialista
                  </Button>
                </Link>
                <Link href="/solucoes">
                  <Button
                    variant="outline"
                    className="text-[#161533] bg-white border-white hover:bg-white/10 hover:text-[#a3ff3c]"
                  >
                    Conhecer mais sobre nossos programas
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <Card className="border-none shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="text-[#161533]">Entre em contato</CardTitle>
                  <CardDescription>Preencha o formulário abaixo e retornaremos em até 24 horas.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="first-name" className="text-sm font-medium leading-none">
                          Nome
                        </label>
                        <input
                          id="first-name"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Digite seu nome"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium leading-none">
                          Sobrenome
                        </label>
                        <input
                          id="last-name"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Digite seu sobrenome"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium leading-none">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Digite seu email"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium leading-none">
                        Telefone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Digite seu telefone"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="interest" className="text-sm font-medium leading-none">
                        Interesse
                      </label>
                      <select
                        id="interest"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Selecione uma opção</option>
                        <option value="individual">Programa Individual</option>
                        <option value="corporate">Programa Corporativo</option>
                        <option value="other">Outro</option>
                      </select>
                    </div>
                    <Button className="w-full bg-[#a3ff3c] hover:bg-[#92e636] text-[#161533] rounded-full">
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#161533] text-white py-8 border-t border-[#232244]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/Logo_horizontal_green.svg"
                alt="Logo Hub Academy"
                width={120}
                height={36}
                className="h-6 w-auto"
              />
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Hub Academy. Todos os direitos reservados.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/politica-de-privacidade" className="text-sm text-gray-400 hover:text-[#a3ff3c]">
                Política de Privacidade
              </Link>
              <Link href="/termos-de-uso" className="text-sm text-gray-400 hover:text-[#a3ff3c]">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
