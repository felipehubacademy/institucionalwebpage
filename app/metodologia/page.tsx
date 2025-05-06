import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, BookOpen, BarChart, Users, Lightbulb, Target, User } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MetodologiaPage() {
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Nossa Metodologia</h1>
                <p className="max-w-[700px] text-gray-300 md:text-xl">
                  Conheça o método exclusivo da Hub Academy que transforma o aprendizado de idiomas em resultados reais
                  para sua carreira.
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
                  <h2 className="text-3xl font-bold text-[#161533]">Método Hub</h2>
                  <p className="mt-4 text-gray-600">
                    Nossa metodologia exclusiva foi desenvolvida para profissionais que buscam resultados rápidos e
                    eficazes. Combinamos técnicas pedagógicas avançadas com estratégias de desenvolvimento profissional
                    para criar um sistema de aprendizado que entrega resultados mensuráveis e aplicáveis ao contexto
                    real de trabalho.
                  </p>
                  <p className="mt-4 text-gray-600">
                    Diferente dos métodos tradicionais que focam apenas em gramática e vocabulário, o Método Hub
                    trabalha com situações reais do ambiente profissional, permitindo que você aplique o idioma
                    imediatamente em seu contexto de trabalho.
                  </p>
                </div>
                <div className="flex flex-col gap-4 pt-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#a3ff3c] mt-1" />
                    <div>
                      <h3 className="font-medium text-[#161533]">Aprendizado contextualizado</h3>
                      <p className="text-gray-600">Conteúdo adaptado à sua área de atuação e objetivos profissionais</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#a3ff3c] mt-1" />
                    <div>
                      <h3 className="font-medium text-[#161533]">Prática intensiva</h3>
                      <p className="text-gray-600">Foco em situações reais do seu ambiente de trabalho</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#a3ff3c] mt-1" />
                    <div>
                      <h3 className="font-medium text-[#161533]">Acompanhamento estratégico</h3>
                      <p className="text-gray-600">
                        Monitoramento contínuo do seu progresso com ajustes personalizados
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  width={600}
                  height={600}
                  alt="Método Hub Academy em ação"
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
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-[#161533]">
                  Os 6 Pilares do Método Hub
                </h2>
                <p className="max-w-[700px] text-gray-600 md:text-xl">
                  Nossa metodologia é estruturada em seis pilares fundamentais que garantem um aprendizado eficaz e
                  resultados concretos.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-[#e8ffd4] flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-[#161533]" />
                  </div>
                  <CardTitle className="text-xl">1. Diagnóstico Estratégico</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Avaliação completa do seu nível atual, objetivos profissionais e estilo de aprendizagem para criar
                    um plano personalizado que maximize seus resultados.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-[#e8ffd4] flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-[#161533]" />
                  </div>
                  <CardTitle className="text-xl">2. Imersão Contextualizada</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Aprendizado baseado em situações reais do seu ambiente profissional, permitindo aplicação imediata e
                    desenvolvimento de confiança no uso do idioma.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-[#e8ffd4] flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-[#161533]" />
                  </div>
                  <CardTitle className="text-xl">3. Prática Intensiva</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Sessões focadas em desenvolver fluência e confiança através de simulações, role-plays e exercícios
                    práticos baseados em cenários reais do seu trabalho.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-[#e8ffd4] flex items-center justify-center mb-4">
                    <BarChart className="h-6 w-6 text-[#161533]" />
                  </div>
                  <CardTitle className="text-xl">4. Acompanhamento Contínuo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Monitoramento constante do seu progresso com feedback detalhado e ajustes estratégicos para garantir
                    evolução consistente e superar obstáculos.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-[#e8ffd4] flex items-center justify-center mb-4">
                    <Lightbulb className="h-6 w-6 text-[#161533]" />
                  </div>
                  <CardTitle className="text-xl">5. Tecnologia Integrada</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Plataformas digitais e recursos tecnológicos que complementam o aprendizado presencial, permitindo
                    prática contínua e acesso a conteúdos exclusivos.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-[#e8ffd4] flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-[#161533]" />
                  </div>
                  <CardTitle className="text-xl">6. Avaliação de Resultados</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Métricas claras e objetivas para mensurar seu desenvolvimento, garantindo visibilidade do progresso
                    e retorno sobre o investimento.
                  </p>
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
                  Como Funciona na Prática
                </h2>
                <p className="max-w-[700px] text-gray-600 md:text-xl">
                  Conheça o passo a passo da jornada de aprendizado com o Método Hub
                </p>
              </div>
            </div>

            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-[#e8ffd4] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 md:mt-2">
                  <span className="text-xl font-bold text-[#161533]">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#161533] mb-2">Avaliação Inicial</h3>
                  <p className="text-gray-600">
                    Realizamos uma avaliação completa do seu nível atual, objetivos profissionais e necessidades
                    específicas. Esta etapa inclui testes de proficiência, entrevista com especialistas e análise do seu
                    contexto de trabalho.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-[#e8ffd4] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 md:mt-2">
                  <span className="text-xl font-bold text-[#161533]">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#161533] mb-2">Plano Personalizado</h3>
                  <p className="text-gray-600">
                    Com base na avaliação, desenvolvemos um plano de estudos totalmente personalizado, com objetivos
                    claros, cronograma adaptado à sua disponibilidade e conteúdos específicos para sua área de atuação.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-[#e8ffd4] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 md:mt-2">
                  <span className="text-xl font-bold text-[#161533]">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#161533] mb-2">Sessões de Aprendizado</h3>
                  <p className="text-gray-600">
                    Aulas dinâmicas e interativas focadas em situações reais do seu ambiente profissional. Combinamos
                    teoria e prática intensiva para desenvolver suas habilidades de comunicação no idioma.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-[#e8ffd4] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 md:mt-2">
                  <span className="text-xl font-bold text-[#161533]">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#161533] mb-2">Prática Contínua</h3>
                  <p className="text-gray-600">
                    Acesso à nossa plataforma digital com exercícios complementares, materiais exclusivos e ferramentas
                    de prática que permitem continuar seu desenvolvimento entre as sessões presenciais.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-[#e8ffd4] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 md:mt-2">
                  <span className="text-xl font-bold text-[#161533]">5</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#161533] mb-2">Avaliações Periódicas</h3>
                  <p className="text-gray-600">
                    Realizamos avaliações regulares para medir seu progresso e fazer ajustes no plano de estudos quando
                    necessário. Você recebe feedback detalhado e orientações específicas para continuar evoluindo.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-[#e8ffd4] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 md:mt-2">
                  <span className="text-xl font-bold text-[#161533]">6</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#161533] mb-2">Aplicação Prática</h3>
                  <p className="text-gray-600">
                    Simulações de situações reais do seu trabalho, como reuniões, apresentações e negociações,
                    permitindo que você aplique o idioma com confiança em seu ambiente profissional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#161533] text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-6">
              Pronto para transformar seu aprendizado de idiomas?
            </h2>
            <p className="max-w-[700px] mx-auto text-white/80 md:text-xl mb-8">
              Experimente o Método Hub e descubra como podemos ajudar você a alcançar seus objetivos profissionais com o
              domínio de idiomas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#a3ff3c] text-[#161533] hover:bg-[#92e636] rounded-full">
                Agendar uma aula experimental
              </Button>
              <Button
                variant="outline"
                className="bg-white text-[#161533] border-white hover:bg-[#161533] hover:text-[#a3ff3c] transition-colors rounded-full"
              >
                Falar com um especialista
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
