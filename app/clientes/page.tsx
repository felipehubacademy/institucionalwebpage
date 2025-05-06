"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Quote, User } from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

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
    animation: scroll 30s linear infinite;
  }
  
  .logo-carousel:hover {
    animation-play-state: paused;
  }
  
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  
  .logo-slide {
    flex: 0 0 auto;
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

            <div className="logo-carousel-container w-full overflow-hidden relative">
              <div className="logo-carousel flex items-center">
                {/* Primeiro conjunto de logos */}
                {clientLogos.map((logo, i) => (
                  <div
                    key={`logo-1-${i}`}
                    className="logo-slide bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-24 min-w-[200px] mx-4"
                  >
                    <Image
                      src={`/images/logos/${logo.file}`}
                      width={logo.width}
                      height={logo.height}
                      alt={`Logo de ${logo.name}`}
                      className="max-h-12 w-auto"
                    />
                  </div>
                ))}
                {/* Duplicação dos logos para efeito de rolagem infinita */}
                {clientLogos.map((logo, i) => (
                  <div
                    key={`logo-2-${i}`}
                    className="logo-slide bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-24 min-w-[200px] mx-4"
                  >
                    <Image
                      src={`/images/logos/${logo.file}`}
                      width={logo.width}
                      height={logo.height}
                      alt={`Logo de ${logo.name}`}
                      className="max-h-12 w-auto"
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
                  Depoimentos de Clientes
                </h2>
                <p className="max-w-[700px] text-gray-600 md:text-xl mx-auto">
                  Veja o que nossos clientes dizem sobre sua experiência com a Hub Academy.
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <Quote className="h-8 w-8 text-[#a3ff3c]" />
                    <p className="text-gray-600 italic">
                      "A metodologia da Hub Academy transformou nossa equipe de vendas. Em apenas 6 meses, conseguimos
                      aumentar em 40% as negociações com clientes internacionais. O investimento teve retorno muito
                      rápido."
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                      <div className="rounded-full bg-gray-200 p-1">
                        <Image
                          src="/placeholder.svg?height=48&width=48"
                          width={48}
                          height={48}
                          alt="Foto de Marcelo Santos"
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium">Marcelo Santos</p>
                        <p className="text-sm text-gray-500">Diretor Comercial, TechSolutions Brasil</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <Quote className="h-8 w-8 text-[#a3ff3c]" />
                    <p className="text-gray-600 italic">
                      "Como empresa global, precisávamos de um parceiro que entendesse nossas necessidades específicas.
                      A Hub Academy desenvolveu um programa personalizado que superou nossas expectativas. Recomendo
                      fortemente."
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                      <div className="rounded-full bg-gray-200 p-1">
                        <Image
                          src="/placeholder.svg?height=48&width=48"
                          width={48}
                          height={48}
                          alt="Foto de Ana Oliveira"
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium">Ana Oliveira</p>
                        <p className="text-sm text-gray-500">Gerente de RH, Global Enterprises</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <Quote className="h-8 w-8 text-[#a3ff3c]" />
                    <p className="text-gray-600 italic">
                      "O programa executivo da Hub Academy foi fundamental para minha promoção. A abordagem focada em
                      situações reais de negócios me deu confiança para liderar reuniões internacionais e expandir nossa
                      operação."
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                      <div className="rounded-full bg-gray-200 p-1">
                        <Image
                          src="/placeholder.svg?height=48&width=48"
                          width={48}
                          height={48}
                          alt="Foto de Roberto Mendes"
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium">Roberto Mendes</p>
                        <p className="text-sm text-gray-500">Diretor de Operações, Nexus Indústrias</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <Quote className="h-8 w-8 text-[#a3ff3c]" />
                    <p className="text-gray-600 italic">
                      "Implementamos o programa da Hub Academy para toda nossa equipe de atendimento. O resultado foi
                      uma melhoria significativa na satisfação dos clientes internacionais e um aumento de 25% nas
                      vendas para esse público."
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                      <div className="rounded-full bg-gray-200 p-1">
                        <Image
                          src="/placeholder.svg?height=48&width=48"
                          width={48}
                          height={48}
                          alt="Foto de Carla Rodrigues"
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium">Carla Rodrigues</p>
                        <p className="text-sm text-gray-500">CEO, Hospitality Group</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <Quote className="h-8 w-8 text-[#a3ff3c]" />
                    <p className="text-gray-600 italic">
                      "A flexibilidade do programa e a qualidade dos professores são diferenciais claros da Hub Academy.
                      Conseguimos adaptar o treinamento à rotina agitada dos nossos executivos sem perder qualidade."
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                      <div className="rounded-full bg-gray-200 p-1">
                        <Image
                          src="/placeholder.svg?height=48&width=48"
                          width={48}
                          height={48}
                          alt="Foto de Paulo Ferreira"
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium">Paulo Ferreira</p>
                        <p className="text-sm text-gray-500">Diretor de Desenvolvimento, Finance Corp</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <Quote className="h-8 w-8 text-[#a3ff3c]" />
                    <p className="text-gray-600 italic">
                      "O que mais me impressionou foi o acompanhamento personalizado. Os relatórios de progresso e as
                      métricas claras nos permitiram ver o retorno do investimento de forma tangível."
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                      <div className="rounded-full bg-gray-200 p-1">
                        <Image
                          src="/placeholder.svg?height=48&width=48"
                          width={48}
                          height={48}
                          alt="Foto de Luciana Costa"
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium">Luciana Costa</p>
                        <p className="text-sm text-gray-500">Gerente de Treinamento, Innovate Tech</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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

            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="relative h-64">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    fill
                    alt="Equipe da TechSolutions em reunião internacional"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#161533] mb-2">TechSolutions Brasil</h3>
                  <p className="text-gray-600 mb-4">
                    A TechSolutions implementou um programa de inglês técnico para sua equipe de desenvolvimento,
                    resultando em uma melhoria significativa na colaboração com equipes internacionais e na documentação
                    de projetos.
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#a3ff3c]"></div>
                      <p className="text-sm font-medium">40% de aumento nas negociações internacionais</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#a3ff3c]"></div>
                      <p className="text-sm font-medium">Redução de 30% no tempo de documentação</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#a3ff3c]"></div>
                      <p className="text-sm font-medium">Expansão para 3 novos mercados internacionais</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="relative h-64">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    fill
                    alt="Equipe da Global Hospitality em treinamento"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#161533] mb-2">Global Hospitality Group</h3>
                  <p className="text-gray-600 mb-4">
                    A rede de hotéis implementou um programa de espanhol para sua equipe de atendimento, melhorando
                    significativamente a experiência de hóspedes latino-americanos e expandindo sua presença no mercado
                    hispânico.
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#a3ff3c]"></div>
                      <p className="text-sm font-medium">Aumento de 25% na satisfação de clientes hispânicos</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#a3ff3c]"></div>
                      <p className="text-sm font-medium">Crescimento de 35% em reservas de países hispânicos</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#a3ff3c]"></div>
                      <p className="text-sm font-medium">ROI de 280% em 12 meses</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <Button className="bg-[#a3ff3c] hover:bg-[#92e636] text-[#161533] rounded-full">
                Ver mais casos de sucesso
              </Button>
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
