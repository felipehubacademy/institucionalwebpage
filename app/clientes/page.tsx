"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, User, Quote } from "lucide-react"
import Image from "next/image"

// Array com informações dos logos
const clientLogos = [
  { name: "Avalara", file: "Logo_Avalara.svg", width: 260, height: 72 },
  { name: "JBS", file: "Logo_JBS.svg", width: 260, height: 108 },
  { name: "Renaissance", file: "Logo_Renaissance.svg", width: 248, height: 140 },
  { name: "Boehringer", file: "Logo_Boehringer.svg", width: 260, height: 93 },
  { name: "Collinson", file: "Logo_Collinson.svg", width: 260, height: 73 },
  { name: "Honeywell", file: "Logo_Honeywell.svg", width: 260, height: 63 },
  { name: "IDEMIA", file: "Logo_IDEMIA.svg", width: 260, height: 83 },
  { name: "Eureciclo", file: "Logo_Eureciclo.svg", width: 260, height: 97 },
  { name: "Libbs", file: "Logo_Libbs.svg", width: 260, height: 138 },
  { name: "Amazon", file: "Logo_Amazon.svg", width: 240, height: 93 },
]

export default function ClientesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-[#161533] text-white">
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
    animation: scroll 60s linear infinite; /* Animação mais lenta de 60s */
    width: fit-content;
  }
  
  .logo-carousel:hover {
    animation-play-state: paused;
  }
  
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc((-180px - 16px) * 10));
    }
  }
  
  .logo-slide {
    flex: 0 0 auto;
  }

.video-carousel {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.video-carousel::-webkit-scrollbar {
  display: none;  /* Chrome, Safari, Opera */
}
`}</style>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#161533] text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Link href="/" className="flex items-center text-[#a3ff3c] hover:text-[#92e636] mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para a Página Inicial
              </Link>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Nossos Clientes</h1>
                <p className="max-w-[700px] text-gray-300 md:text-xl">
                  Conheça as empresas e profissionais que confiam na Hub Academy para o desenvolvimento de idiomas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2 flex flex-col items-center text-center w-full">
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
                    className="logo-slide bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-20 w-[180px] mx-2"
                  >
                    <Image
                      src={`/images/logos/${logo.file}`}
                      width={logo.width}
                      height={logo.height}
                      alt={`Logo de ${logo.name}`}
                      className="max-h-10 w-auto max-w-[150px]"
                    />
                  </div>
                ))}
                {/* Duplicação dos logos para efeito de rolagem infinita */}
                {clientLogos.map((logo, i) => (
                  <div
                    key={`logo-2-${i}`}
                    className="logo-slide bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-20 w-[180px] mx-2"
                  >
                    <Image
                      src={`/images/logos/${logo.file}`}
                      width={logo.width}
                      height={logo.height}
                      alt={`Logo de ${logo.name}`}
                      className="max-h-10 w-auto max-w-[150px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2 flex flex-col items-center text-center w-full">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-[#161533]">
                  Depoimentos de Alunos
                </h2>
                <p className="max-w-[700px] text-gray-600 md:text-xl mx-auto">
                  Veja o que nossos alunos dizem sobre sua experiência com a Hub Academy.
                </p>
              </div>
            </div>

            <div className="relative max-w-4xl mx-auto">
              {/* Controles do carrossel */}
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#161533] p-2 rounded-full shadow-md -ml-4 md:-ml-6"
                onClick={() => {
                  const container = document.querySelector(".video-carousel")
                  if (container) {
                    container.scrollBy({ left: -300, behavior: "smooth" })
                  }
                }}
                aria-label="Vídeo anterior"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#161533] p-2 rounded-full shadow-md -mr-4 md:-mr-6"
                onClick={() => {
                  const container = document.querySelector(".video-carousel")
                  if (container) {
                    container.scrollBy({ left: 300, behavior: "smooth" })
                  }
                }}
                aria-label="Próximo vídeo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>

              {/* Container do carrossel */}
              <div className="video-carousel flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6 -mx-4 px-4">
                <div className="flex-shrink-0 w-[280px] snap-center mx-3">
                  <div className="bg-white rounded-xl overflow-hidden shadow-md">
                    <div className="relative h-0 pb-[177.77%]">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/6eF14dFaPz8"
                        title="Depoimento de Cliente Hub Academy"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 w-[280px] snap-center mx-3">
                  <div className="bg-white rounded-xl overflow-hidden shadow-md">
                    <div className="relative h-0 pb-[177.77%]">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/ZIZppX_zxaQ"
                        title="Depoimento de Cliente Hub Academy"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 w-[280px] snap-center mx-3">
                  <div className="bg-white rounded-xl overflow-hidden shadow-md">
                    <div className="relative h-0 pb-[177.77%]">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/pFoCoO9icLg"
                        title="Depoimento de Cliente Hub Academy"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 w-[280px] snap-center mx-3">
                  <div className="bg-white rounded-xl overflow-hidden shadow-md">
                    <div className="relative h-0 pb-[177.77%]">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/Jt_YDsEIzKI"
                        title="Depoimento de Cliente Hub Academy"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2 flex flex-col items-center text-center w-full">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-[#161533]">Casos de Sucesso</h2>
                <p className="max-w-[700px] text-gray-600 md:text-xl mx-auto">
                  Conheça histórias reais de transformação através do domínio de idiomas.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white rounded-xl overflow-hidden shadow-md max-w-2xl mb-8">
                <div className="relative h-0 pb-[56.25%]">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/fXu0KCpnMfo?rel=0&modestbranding=1&controls=1"
                    title="Alessandro Cantalejo - IDEMIA"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#161533] mb-2">IDEMIA do Brasil</h3>
                  <p className="text-gray-600 mb-4">
                    A IDEMIA Brasil implementou um programa de inglês para seus funcionários, com a parceria da Hub, que
                    resultou em melhorias significativas na comunicação internacional e no desenvolvimento profissional
                    da equipe.
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#a3ff3c]"></div>
                      <p className="text-sm font-medium">Melhoria na comunicação em reuniões internacionais</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#a3ff3c]"></div>
                      <p className="text-sm font-medium">Aumento de engajamento e motivação</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#a3ff3c]"></div>
                      <p className="text-sm font-medium">Aproximação com o corporativo global</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#a3ff3c]"></div>
                      <p className="text-sm font-medium">Desenvolvimento contínuo e acompanhamento</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#a3ff3c]"></div>
                      <p className="text-sm font-medium">Cultura de aprendizado</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Citação do Alessandro Cantalejo */}
              <div className="max-w-2xl bg-[#f8f9fa] border-l-4 border-[#a3ff3c] p-6 rounded-xl shadow-sm">
                <div className="flex gap-4">
                  <Quote className="h-10 w-10 text-[#a3ff3c] flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 italic text-lg">
                      "A Hub traz uma coisa mais jovem, mais atualizada, uma abordagem voltada ao negócio. Os
                      professores têm uma energia lá no alto, colocam os alunos no alto, mostram para os alunos o que
                      eles devem fazer para melhorar."
                    </p>
                    <p className="text-right mt-4 font-medium text-[#161533]">Alessandro Cantalejo, IDEMIA do Brasil</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#161533] text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-6">
              Junte-se às empresas que estão transformando o aprendizado de idiomas
            </h2>
            <p className="max-w-[700px] mx-auto text-white/80 md:text-xl mb-8">
              Descubra como podemos desenvolver uma solução personalizada para sua empresa ou carreira.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#a3ff3c] text-[#161533] hover:bg-[#92e636] rounded-full">
                Solicitar uma proposta
              </Button>
              <Button
                variant="outline"
                className="bg-white text-[#161533] border-white hover:bg-[#161533] hover:text-[#a3ff3c] transition-colors rounded-full"
              >
                Agendar uma consultoria gratuita
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0 bg-[#161533] text-white border-[#232244]">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="/images/Logo_horizontal_green.svg"
                alt="Logo Hub Academy"
                width={120}
                height={36}
                className="h-6 w-auto"
              />
            </Link>
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
            <Link href="/contato" className="text-sm text-gray-400 hover:text-[#a3ff3c]">
              Contato
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
