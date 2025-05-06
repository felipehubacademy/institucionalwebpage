import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Building, User, Briefcase, GraduationCap, Globe } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SolucoesPage() {
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

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#161533] text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Link href="/" className="flex items-center text-[#a3ff3c] hover:text-[#92e636] mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para a Página Inicial
              </Link>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Nossas Soluções</h1>
                <p className="max-w-[700px] text-gray-300 md:text-xl">
                  Programas personalizados de inglês e espanhol para profissionais e empresas que buscam resultados
                  reais.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-[#161533]">Soluções Personalizadas</h2>
                  <p className="mt-4 text-gray-600">
                    Na Hub Academy, entendemos que cada profissional e cada empresa têm necessidades específicas quando
                    se trata do aprendizado de idiomas. Por isso, desenvolvemos soluções personalizadas que se adaptam
                    aos seus objetivos, disponibilidade e contexto profissional.
                  </p>
                  <p className="mt-4 text-gray-600">
                    Nossos programas são desenhados para entregar resultados mensuráveis, com foco na aplicação prática
                    do idioma em situações reais do ambiente de trabalho. Seja para desenvolvimento individual ou para
                    equipes corporativas, temos a solução ideal para transformar o domínio de idiomas em uma ferramenta
                    estratégica para o crescimento.
                  </p>
                </div>
                <div className="flex flex-col gap-4 pt-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#a3ff3c] mt-1" />
                    <div>
                      <h3 className="font-medium text-[#161533]">Programas flexíveis</h3>
                      <p className="text-gray-600">Formatos presenciais, online ou híbridos adaptados à sua rotina</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#a3ff3c] mt-1" />
                    <div>
                      <h3 className="font-medium text-[#161533]">Conteúdo especializado</h3>
                      <p className="text-gray-600">Material adaptado à sua área de atuação e objetivos específicos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#a3ff3c] mt-1" />
                    <div>
                      <h3 className="font-medium text-[#161533]">Resultados mensuráveis</h3>
                      <p className="text-gray-600">Acompanhamento de progresso com métricas claras e objetivas</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  width={600}
                  height={600}
                  alt="Profissionais em treinamento na Hub Academy"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-[#161533]">Para Profissionais</h2>
                <p className="max-w-[700px] text-gray-600 md:text-xl">
                  Programas individuais desenhados para impulsionar sua carreira através do domínio de idiomas
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-[#e8ffd4] flex items-center justify-center mb-4">
                    <Briefcase className="h-6 w-6 text-[#161533]" />
                  </div>
                  <CardTitle>Inglês para Negócios</CardTitle>
                  <CardDescription>Para profissionais em ambientes corporativos</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Comunicação empresarial e negociação</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Habilidades para apresentações e reuniões</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Redação de e-mails e relatórios</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-center pt-6">
                  <Button className="bg-[#161533] hover:bg-[#232244] text-white rounded-full">Saiba mais</Button>
                </CardFooter>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-[#e8ffd4] flex items-center justify-center mb-4">
                    <GraduationCap className="h-6 w-6 text-[#161533]" />
                  </div>
                  <CardTitle>Inglês Técnico</CardTitle>
                  <CardDescription>Para engenheiros, profissionais de TI e cientistas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Vocabulário técnico e terminologia</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Documentação e redação técnica</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Apresentações de projetos e colaboração</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-center pt-6">
                  <Button className="bg-[#161533] hover:bg-[#232244] text-white rounded-full">Saiba mais</Button>
                </CardFooter>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-[#e8ffd4] flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-[#161533]" />
                  </div>
                  <CardTitle>Espanhol para Negócios</CardTitle>
                  <CardDescription>Para profissionais que trabalham com mercados hispânicos</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Comunicação empresarial e negociação</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Cultura empresarial latino-americana</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Correspondência profissional</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-center pt-6">
                  <Button className="bg-[#161533] hover:bg-[#232244] text-white rounded-full">Saiba mais</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="flex justify-center mt-8">
              <Button className="bg-[#a3ff3c] hover:bg-[#92e636] text-[#161533] rounded-full">
                Ver todos os programas individuais
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-[#161533]">Para Empresas</h2>
                <p className="max-w-[700px] text-gray-600 md:text-xl">
                  Soluções corporativas para desenvolver equipes e impulsionar a competitividade global
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-none shadow-lg">
                <CardHeader className="bg-[#161533] text-white pb-8">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-[#a3ff3c]/20 p-2">
                      <Building className="h-5 w-5 text-[#a3ff3c]" />
                    </div>
                    <CardTitle>Programas In-Company</CardTitle>
                  </div>
                  <CardDescription className="text-gray-300">
                    Treinamentos personalizados realizados na sua empresa
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Aulas presenciais na sua empresa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Conteúdo personalizado para sua indústria</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Horários flexíveis adaptados à sua rotina</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Relatórios de progresso e ROI</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-center pt-6">
                  <Button className="bg-[#a3ff3c] hover:bg-[#92e636] text-[#161533] rounded-full">
                    Solicitar proposta
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader className="bg-[#161533] text-white pb-8">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-[#a3ff3c]/20 p-2">
                      <Globe className="h-5 w-5 text-[#a3ff3c]" />
                    </div>
                    <CardTitle>Programas Customizados</CardTitle>
                  </div>
                  <CardDescription className="text-gray-300">
                    Soluções sob medida para necessidades específicas
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Diagnóstico completo das necessidades</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Desenvolvimento de material exclusivo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Formatos presenciais, online ou híbridos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Acompanhamento estratégico contínuo</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-center pt-6">
                  <Button className="bg-[#a3ff3c] hover:bg-[#92e636] text-[#161533] rounded-full">
                    Falar com especialista
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#161533] text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-6">
              Pronto para transformar o aprendizado de idiomas na sua empresa?
            </h2>
            <p className="max-w-[700px] mx-auto text-white/80 md:text-xl mb-8">
              Entre em contato conosco e descubra como podemos desenvolver uma solução personalizada para suas
              necessidades.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#a3ff3c] text-[#161533] hover:bg-[#92e636] rounded-full">
                Solicitar uma proposta
              </Button>
              <Button
                variant="outline"
                className="bg-white text-[#161533] border-white hover:bg-[#161533] hover:text-[#a3ff3c] transition-colors rounded-full"
              >
                Agendar uma consultoria
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
