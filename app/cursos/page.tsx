import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Globe, ArrowLeft, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function CoursesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
            <Link href="/#courses" className="text-sm font-medium hover:text-[#a3ff3c] transition-colors">
              Cursos
            </Link>
            <Link href="/#methodology" className="text-sm font-medium hover:text-[#a3ff3c] transition-colors">
              Metodologia
            </Link>
            <Link href="/#testimonials" className="text-sm font-medium hover:text-[#a3ff3c] transition-colors">
              Depoimentos
            </Link>
            <Link href="/#contact" className="text-sm font-medium hover:text-[#a3ff3c] transition-colors">
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

      {/* Rest of the page content remains the same */}
      <main className="flex-1">
        <section className="w-full py-12 m-py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Link href="/" className="flex items-center text-[#a3ff3c] hover:text-[#92e636] mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para a Página Inicial
              </Link>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Nossas Soluções</h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl">
                  Programas personalizados de inglês e espanhol para profissionais e empresas que buscam resultados
                  reais.
                </p>
              </div>
            </div>

            <Tabs defaultValue="english" className="w-full max-w-4xl mx-auto mt-12">
              <TabsList className="grid w-full grid-cols-2 bg-[#e8ffd4] text-[#161533]">
                <TabsTrigger
                  value="english"
                  className="data-[state=active]:bg-[#a3ff3c] data-[state=active]:text-[#161533]"
                >
                  Programas de Inglês
                </TabsTrigger>
                <TabsTrigger
                  value="spanish"
                  className="data-[state=active]:bg-[#a3ff3c] data-[state=active]:text-[#161533]"
                >
                  Programas de Espanhol
                </TabsTrigger>
              </TabsList>
              <TabsContent value="english" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader className="bg-blue-50 pb-8">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-blue-100 p-2">
                          <Globe className="h-5 w-5 text-blue-600" />
                        </div>
                        <CardTitle>Inglês para Negócios</CardTitle>
                      </div>
                      <CardDescription>Para profissionais em ambientes corporativos</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Comunicação empresarial e negociação</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Habilidades para apresentações e reuniões</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Redação de e-mails e relatórios</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-6">
                      <div className="text-2xl font-bold">
                        R$1.499<span className="text-sm font-normal text-gray-500">/mês</span>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700">Matricular-se</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="bg-blue-50 pb-8">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-blue-100 p-2">
                          <Globe className="h-5 w-5 text-blue-600" />
                        </div>
                        <CardTitle>Inglês Técnico</CardTitle>
                      </div>
                      <CardDescription>Para engenheiros, profissionais de TI e cientistas</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Vocabulário técnico e terminologia</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Documentação e redação técnica</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Apresentações de projetos e colaboração</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-6">
                      <div className="text-2xl font-bold">
                        R$1.699<span className="text-sm font-normal text-gray-500">/mês</span>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700">Matricular-se</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="bg-blue-50 pb-8">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-blue-100 p-2">
                          <Globe className="h-5 w-5 text-blue-600" />
                        </div>
                        <CardTitle>Inglês Médico</CardTitle>
                      </div>
                      <CardDescription>Para profissionais de saúde</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Terminologia médica e comunicação com pacientes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Apresentações de casos e relatórios médicos</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Compreensão e redação de artigos científicos</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-6">
                      <div className="text-2xl font-bold">
                        R$1.699<span className="text-sm font-normal text-gray-500">/mês</span>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700">Matricular-se</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="bg-blue-50 pb-8">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-blue-100 p-2">
                          <Globe className="h-5 w-5 text-blue-600" />
                        </div>
                        <CardTitle>Inglês Jurídico</CardTitle>
                      </div>
                      <CardDescription>Para profissionais jurídicos e estudantes de direito</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Terminologia jurídica e linguagem contratual</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Análise de casos e redação jurídica</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Habilidades de negociação e consulta com clientes</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-6">
                      <div className="text-2xl font-bold">
                        R$1.699<span className="text-sm font-normal text-gray-500">/mês</span>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700">Matricular-se</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="spanish" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader className="bg-amber-50 pb-8">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-amber-100 p-2">
                          <Globe className="h-5 w-5 text-amber-600" />
                        </div>
                        <CardTitle>Espanhol para Negócios</CardTitle>
                      </div>
                      <CardDescription>Para profissionais que trabalham com mercados hispânicos</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Comunicação empresarial e negociação</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Cultura empresarial latino-americana</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Correspondência profissional</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-6">
                      <div className="text-2xl font-bold">
                        R$1.499<span className="text-sm font-normal text-gray-500">/mês</span>
                      </div>
                      <Button className="bg-amber-600 hover:bg-amber-700">Matricular-se</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="bg-amber-50 pb-8">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-amber-100 p-2">
                          <Globe className="h-5 w-5 text-amber-600" />
                        </div>
                        <CardTitle>Espanhol Técnico</CardTitle>
                      </div>
                      <CardDescription>Para engenheiros e profissionais técnicos</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Vocabulário técnico para várias indústrias</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Terminologia de gestão de projetos</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Documentação técnica e apresentações</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-6">
                      <div className="text-2xl font-bold">
                        R$1.699<span className="text-sm font-normal text-gray-500">/mês</span>
                      </div>
                      <Button className="bg-amber-600 hover:bg-amber-700">Matricular-se</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="bg-amber-50 pb-8">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-amber-100 p-2">
                          <Globe className="h-5 w-5 text-amber-600" />
                        </div>
                        <CardTitle>Espanhol Médico</CardTitle>
                      </div>
                      <CardDescription>Para profissionais de saúde</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Terminologia médica e interação com pacientes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Procedimentos de saúde e documentação</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Aspectos culturais da saúde em regiões hispânicas</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-6">
                      <div className="text-2xl font-bold">
                        R$1.699<span className="text-sm font-normal text-gray-500">/mês</span>
                      </div>
                      <Button className="bg-amber-600 hover:bg-amber-700">Matricular-se</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="bg-amber-50 pb-8">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-amber-100 p-2">
                          <Globe className="h-5 w-5 text-amber-600" />
                        </div>
                        <CardTitle>Espanhol para Turismo e Hotelaria</CardTitle>
                      </div>
                      <CardDescription>Para profissionais da indústria do turismo</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Vocabulário de atendimento ao cliente e hotelaria</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Conhecimento cultural e costumes locais</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Arranjos de viagem e resolução de problemas</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-6">
                      <div className="text-2xl font-bold">
                        R$1.499<span className="text-sm font-normal text-gray-500">/mês</span>
                      </div>
                      <Button className="bg-amber-600 hover:bg-amber-700">Matricular-se</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0">
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
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Hub Academy. Todos os direitos reservados.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Política de Privacidade
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Termos de Serviço
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Contato
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
