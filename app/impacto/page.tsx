import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BarChart, Globe, Users, BookOpen, Award, User } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ImpactoPage() {
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

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full bg-gray-200 p-1">
                      <Image
                        src="/placeholder.svg?height=64&width=64"
                        width={64}
                        height={64}
                        alt="Foto de Carlos Silva"
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <CardTitle>Carlos Silva</CardTitle>
                      <p className="text-sm text-gray-500">Engenheiro de Software</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    "Após 6 meses no programa de inglês técnico da Hub Academy, consegui uma promoção para liderar um
                    projeto internacional. Meu salário aumentou em 40% e agora trabalho diretamente com equipes nos EUA
                    e Europa."
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#a3ff3c]"></div>
                      <p className="text-sm font-medium">Promoção para cargo de liderança</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#a3ff3c]"></div>
                      <p className="text-sm font-medium">Aumento salarial de 40%</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#a3ff3c]"></div>
                      <p className="text-sm font-medium">Atuação em projetos internacionais</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full bg-gray-200 p-1">
                      <Image
                        src="/placeholder.svg?height=64&width=64"
                        width={64}
                        height={64}
                        alt="Foto de Mariana Costa"
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <CardTitle>Mariana Costa</CardTitle>
                      <p className="text-sm text-gray-500">Gerente de Marketing</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    "O programa de espanhol para negócios me permitiu expandir nossa estratégia de marketing para países
                    da América Latina. Em um ano, conseguimos entrar em 3 novos mercados e aumentar o faturamento da
                    empresa em 35%."
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#a3ff3c]"></div>
                      <p className="text-sm font-medium">Expansão para 3 novos mercados</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#a3ff3c]"></div>
                      <p className="text-sm font-medium">Aumento de 35% no faturamento</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#a3ff3c]"></div>
                      <p className="text-sm font-medium">Reconhecimento como líder de inovação</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full bg-gray-200 p-1">
                      <Image
                        src="/placeholder.svg?height=64&width=64"
                        width={64}
                        height={64}
                        alt="Foto de Rafael Mendes"
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <CardTitle>Rafael Mendes</CardTitle>
                      <p className="text-sm text-gray-500">Médico Especialista</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    "O inglês médico da Hub Academy me abriu portas para participar de congressos internacionais e
                    publicar artigos em revistas de prestígio. Hoje sou referência na minha área e recebi convite para
                    lecionar em uma universidade nos EUA."
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#a3ff3c]"></div>
                      <p className="text-sm font-medium">Publicações em revistas internacionais</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#a3ff3c]"></div>
                      <p className="text-sm font-medium">Participação em congressos globais</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#a3ff3c]"></div>
                      <p className="text-sm font-medium">Convite para lecionar no exterior</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
                <Button className="bg-[#a3ff3c] text-[#161533] hover:bg-[#92e636] rounded-full">
                  Agendar uma avaliação gratuita
                </Button>
              </Link>
              <Link href="/solucoes">
                <Button
                  variant="outline"
                  className="bg-white text-[#161533] border-white hover:bg-[#161533] hover:text-[#a3ff3c] transition-colors rounded-full"
                >
                  Conhecer nossos programas
                </Button>
              </Link>
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
