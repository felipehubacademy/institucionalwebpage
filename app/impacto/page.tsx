"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BarChart, Globe, Users, BookOpen, Award } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { useIsMobile } from "@/hooks/use-media-query"

export default function ImpactoPage() {
  const isMobile = useIsMobile();

  return (
    <div>
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Nosso Impacto</h1>
                <p className="max-w-[700px] text-gray-300 md:text-xl">
                  Transformando carreiras e empresas através do domínio de idiomas como ferramenta estratégica.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#161533] mb-6">Transformando o Aprendizado em Resultados</h2>
                <p className="text-gray-600 mb-4">
                  Na Hub Academy, acreditamos que o aprendizado de idiomas deve ir além da fluência linguística. Nossa
                  missão é transformar o domínio de idiomas em uma ferramenta estratégica para o crescimento
                  profissional e empresarial.
                </p>
                <p className="text-gray-600">
                  Através de nossa metodologia exclusiva e abordagem personalizada, temos ajudado profissionais a
                  avançarem em suas carreiras e empresas a expandirem seus horizontes no mercado global. Nosso impacto é
                  medido não apenas pelo nível de proficiência alcançado, mas pelos resultados concretos que nossos
                  alunos e clientes corporativos obtêm.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <Award className="h-12 w-12 text-[#a3ff3c] mb-4" />
                  <h3 className="font-bold text-xl text-[#161533] mb-2">Reconhecimento do mercado</h3>
                  <p className="text-gray-600">Referência em ensino profissionalizante de idiomas no Brasil</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <Users className="h-12 w-12 text-[#a3ff3c] mb-4" />
                  <h3 className="font-bold text-xl text-[#161533] mb-2">Comunidade em crescimento</h3>
                  <p className="text-gray-600">Mais de 500 profissionais e diversas empresas impactadas</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <Globe className="h-12 w-12 text-[#a3ff3c] mb-4" />
                  <h3 className="font-bold text-xl text-[#161533] mb-2">Alcance internacional</h3>
                  <p className="text-gray-600">Alunos e empresas atuando em mais de 5 países</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-[#161533]">
                  Nosso Impacto em Números
                </h2>
                <p className="max-w-[700px] text-gray-600 md:text-xl">
                  Resultados concretos que demonstram a eficácia de nossa metodologia
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-none shadow-md text-center">
                <CardHeader className="pb-2">
                  <div className="w-16 h-16 rounded-full bg-[#e8ffd4] flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-[#161533]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-4xl font-bold text-[#161533] mb-2">500+</h3>
                  <p className="text-gray-600">Profissionais capacitados</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md text-center">
                <CardHeader className="pb-2">
                  <div className="w-16 h-16 rounded-full bg-[#e8ffd4] flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-[#161533]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-4xl font-bold text-[#161533] mb-2">30+</h3>
                  <p className="text-gray-600">Empresas atendidas</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md text-center">
                <CardHeader className="pb-2">
                  <div className="w-16 h-16 rounded-full bg-[#e8ffd4] flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-[#161533]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-4xl font-bold text-[#161533] mb-2">5+</h3>
                  <p className="text-gray-600">Países de atuação</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md text-center">
                <CardHeader className="pb-2">
                  <div className="w-16 h-16 rounded-full bg-[#e8ffd4] flex items-center justify-center mx-auto mb-4">
                    <BarChart className="h-8 w-8 text-[#161533]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-4xl font-bold text-[#161533] mb-2">98%</h3>
                  <p className="text-gray-600">Taxa de satisfação</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-[#161533]">
                  Impacto nas Carreiras
                </h2>
                <p className="max-w-[700px] text-gray-600 md:text-xl">
                  Como o domínio de idiomas tem transformado a trajetória profissional de nossos alunos
                </p>
              </div>
            </div>

            {/* Testimonial carousel for Impacto nas Carreiras */}
            {(() => {
              const impactoTestimonials = [
                {
                  name: "Bianca Lucena",
                  role: "Hub Academy - Student",
                  image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Avatar_Bianca-DUWWkA5MVUUbuAdfHBiWyMoQ94H74Z.svg",
                  text: "Desde que eu comecei a estudar na Hub, eu estou me sentindo mais confiante para poder conversar em inglês, até mesmo com os nativos no meu serviço",
                  rating: 5,
                },
                {
                  name: "Daniela Lazarin",
                  role: "Hub Academy - Student",
                  image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Avatar_Daniela-o0sxizKja1w2t3f1QqTLKdJryygJld.svg",
                  text: "Eu faço aulas com a Hub Academy há mais de dois anos, eu gosto muito das aulas, são aulas bem customizadas e focadas no que o aluno realmente quer aprender",
                  rating: 5,
                },
                {
                  name: "Samuel Santana",
                  role: "Hub Academy - Student",
                  image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Avatar_Samuel-HPtwZ4eJfBoOxq7EBbvoQ4PCNiRE2I.svg",
                  text: "Essa experiencia tem sido muito importante e bacana para mim, porque eu estou superando os meus medos, principalmente de falar",
                  rating: 5,
                },
                {
                  name: "José Elivelton Barbosa",
                  role: "Hub Academy - Student",
                  image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Avatar_Elivelton-QuirCKTT2D4qq4sYConPCCs1JVRkxH.svg",
                  text: "É uma excelente escola, adoro muito a metodologia utilizada.....Nos ajuda muito no nosso entendimento do que é o inglês",
                  rating: 5,
                },
              ];
              return <TestimonialCarousel testimonials={impactoTestimonials} autoPlay={false} showArrows={!isMobile} />;
            })()}

            {/* End carousel replacement */}
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#161533] text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-6">
              Faça parte da nossa história de impacto
            </h2>
            <p className="max-w-[700px] mx-auto text-white/80 md:text-xl mb-8">
              Descubra como podemos transformar sua carreira ou empresa através do domínio estratégico de idiomas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://wa.me/551152865668?text=Olá,%20gostaria%20de%20agendar%20uma%20avaliação%20gratuita."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#a3ff3c] text-[#161533] hover:bg-[#92e636] rounded-full w-full sm:w-auto min-w-[180px] h-10 px-4 py-2 text-sm font-medium">
                  Agendar uma avaliação gratuita
                </Button>
              </Link>
              <Link href="/solucoes">
                <Button
                  variant="outline"
                  className="bg-white text-[#161533] border-white hover:bg-[#161533] hover:text-[#a3ff3c] transition-colors rounded-full w-full sm:w-auto min-w-[180px] h-10 px-4 py-2 text-sm font-medium"
                >
                  Conhecer nossos programas
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
