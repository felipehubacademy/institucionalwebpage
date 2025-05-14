"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Quote } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ClientLogosCarousel } from "@/components/client-logos-carousel"
import { TouchCarousel } from "@/components/touch-carousel"
import { useIsMobile } from "@/hooks/use-media-query"
import { useEffect } from "react"

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
  const isMobile = useIsMobile()

  useEffect(() => {
    // Add swipe functionality for mobile
    if (typeof window !== "undefined" && isMobile) {
      const handleSwipe = () => {
        // Show swipe indicators briefly
        const indicators = document.querySelectorAll(".swipe-indicator")
        indicators.forEach((indicator) => {
          indicator.classList.add("active")
          setTimeout(() => {
            indicator.classList.remove("active")
          }, 1500)
        })
      }

      // Show swipe indicators on page load
      handleSwipe()

      // Optional: Add event listeners for touch start to show indicators again
      const carousel = document.querySelector(".touch-carousel-mobile")
      if (carousel) {
        carousel.addEventListener("touchstart", handleSwipe)

        return () => {
          carousel.removeEventListener("touchstart", handleSwipe)
        }
      }
    }
  }, [isMobile])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <SiteHeader />

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
            <div className="my-8 md:my-12 max-w-full overflow-hidden px-4">
              <ClientLogosCarousel logos={clientLogos} />
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

            <div className="relative max-w-full mx-auto overflow-hidden px-4">
              {/* Video carousel with touch gestures */}
              <div className="swipe-indicator-container">
                <div className="swipe-indicator left"></div>
                <div className="swipe-indicator right"></div>
              </div>
              <TouchCarousel
                slidesToShow={isMobile ? 1 : 3}
                gap={16}
                showDots={true}
                loop={true}
                enableSwipe={true}
                swipeThreshold={10}
                touchEnabled={true}
                preventDefault={false}
                className="touch-carousel-mobile"
              >
                <div className="w-full pointer-events-auto">
                  <div className="bg-white rounded-xl overflow-hidden shadow-md h-full">
                    <div className="relative h-0 pb-[177.77%]">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/6eF14dFaPz8"
                        title="Depoimento de Cliente Hub Academy"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                </div>

                <div className="w-full pointer-events-auto">
                  <div className="bg-white rounded-xl overflow-hidden shadow-md h-full">
                    <div className="relative h-0 pb-[177.77%]">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/ZIZppX_zxaQ"
                        title="Depoimento de Cliente Hub Academy"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                </div>

                <div className="w-full pointer-events-auto">
                  <div className="bg-white rounded-xl overflow-hidden shadow-md h-full">
                    <div className="relative h-0 pb-[177.77%]">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/pFoCoO9icLg"
                        title="Depoimento de Cliente Hub Academy"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                </div>

                <div className="w-full pointer-events-auto">
                  <div className="bg-white rounded-xl overflow-hidden shadow-md h-full">
                    <div className="relative h-0 pb-[177.77%]">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/Jt_YDsEIzKI"
                        title="Depoimento de Cliente Hub Academy"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </TouchCarousel>
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
                    loading="lazy"
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
                  <Quote className="h-8 w-8 md:h-10 md:w-10 text-[#a3ff3c] flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 italic text-sm md:text-lg">
                      "A Hub traz uma coisa mais jovem, mais atualizada, uma abordagem voltada ao negócio. Os
                      professores têm uma energia lá no alto, colocam os alunos no alto, mostram para os alunos o que
                      eles devem fazer para melhorar."
                    </p>
                    <p className="text-right mt-4 font-medium text-[#161533] text-sm md:text-base">
                      Alessandro Cantalejo, IDEMIA do Brasil
                    </p>
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
              <Link href="/contato#formulario">
                <Button className="bg-[#a3ff3c] text-[#161533] hover:bg-[#92e636] rounded-full w-full sm:w-auto">
                  Solicitar uma proposta
                </Button>
              </Link>
              <Link
                href="https://wa.me/551152865668?text=Olá,%20gostaria%20de%20agendar%20uma%20avaliação%20gratuita."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="bg-white text-[#161533] border-white hover:bg-[#161533] hover:text-[#a3ff3c] transition-colors rounded-full w-full sm:w-auto"
                >
                  Agendar uma consultoria gratuita
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
