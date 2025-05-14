import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, BookOpen, BarChart, Users, Lightbulb, Target } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function MetodologiaPage() {
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
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-5xl">Nossa Metodologia</h1>
                <p className="max-w-[700px] text-gray-300 text-base md:text-xl">
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
                  <h2 className="text-2xl md:text-3xl font-bold text-[#161533]">Método Hub</h2>
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
                <h3 className="text-xl font-medium text-[#161533] mb-2">Metodologia S.P.O.</h3>
                <div className="flex flex-col gap-4 pt-4">
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#e8ffd4] flex items-center justify-center mt-1">
                      <span className="text-[#161533] font-bold text-base">S</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#161533]">Structure</h3>
                      <p className="text-gray-600">
                        Ensinamos a estrutura do idioma de forma prática e direta, focando em comunicação clara, sem
                        "decorebas" nem aulas engessadas.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#e8ffd4] flex items-center justify-center mt-1">
                      <span className="text-[#161533] font-bold text-base">P</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#161533]">Personal Growth</h3>
                      <p className="text-gray-600">
                        Usamos o idioma como meio para desenvolver habilidades como autoconhecimento, liderança e
                        comunicação assertiva.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#e8ffd4] flex items-center justify-center mt-1">
                      <span className="text-[#161533] font-bold text-base">O</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#161533]">Oratory</h3>
                      <p className="text-gray-600">
                        Trabalhamos a confiança para falar em público com fluência, em dinâmicas reais como reuniões,
                        apresentações, entrevistas e muitas outras.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative mt-8 lg:mt-0">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spo-xcfv2WNKH3NAbqG7hYmDE72v38YxMJ.png"
                  width={600}
                  height={600}
                  alt="Profissional ilustrando conceitos do método Hub Academy com diagramas e ícones de negócios"
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
                    Plataformas digitais e recursos de inteligência artificial (AI) que potencializam o aprendizado.
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
              <Link
                href="https://wa.me/551152865668?text=Olá,%20gostaria%20de%20agendar%20uma%20aula%20gratuita."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#a3ff3c] text-[#161533] hover:bg-[#92e636] rounded-full">
                  Agendar uma aula experimental
                </Button>
              </Link>
              <Link
                href="https://wa.me/551152865668?text=Olá,%20vim%20do%20site%20e%20gostaria%20de%20mais%20informações%20sobre%20os%20programas."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="bg-white text-[#161533] border-white hover:bg-[#161533] hover:text-[#a3ff3c] transition-colors rounded-full"
                >
                  Falar com um especialista
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
