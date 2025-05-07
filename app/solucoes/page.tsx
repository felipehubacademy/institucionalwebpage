"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Building, User, Briefcase, Globe, Users } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

export default function SolucoesPage() {
  const [showMeetupPopup, setShowMeetupPopup] = useState(false)
  const [showBusinessEnglishPopup, setShowBusinessEnglishPopup] = useState(false)
  const [showBusinessSpanishPopup, setShowBusinessSpanishPopup] = useState(false)

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
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250505_1406_Reunia%CC%83o%20Criativa%20Alegre_remix_01jtgpgqnqfq2sq655b27e4anr-pPthBaNZpRueBkeCPsFySl30wbqZjP.png"
                  width={600}
                  height={600}
                  alt="Grupo diverso de profissionais sorrindo durante treinamento na Hub Academy"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                  priority
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
                  <Button
                    onClick={() => setShowBusinessEnglishPopup(true)}
                    className="bg-[#161533] hover:bg-[#232244] text-white rounded-full"
                  >
                    Saiba mais
                  </Button>
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
                  <Button
                    onClick={() => setShowBusinessSpanishPopup(true)}
                    className="bg-[#161533] hover:bg-[#232244] text-white rounded-full"
                  >
                    Saiba mais
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-[#e8ffd4] flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-[#161533]" />
                  </div>
                  <CardTitle>Hub Immersive Meetups</CardTitle>
                  <CardDescription>Prática real, conexões reais</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Encontros presenciais para prática intensiva</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Cases reais de negócios e debates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#a3ff3c] shrink-0 mt-0.5" />
                      <span>Networking com profissionais de diversas áreas</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-center pt-6">
                  <Button
                    onClick={() => setShowMeetupPopup(true)}
                    className="bg-[#161533] hover:bg-[#232244] text-white rounded-full"
                  >
                    Saiba mais
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="flex justify-center mt-8">
              <Button className="bg-[#a3ff3c] hover:bg-[#92e636] text-[#161533] rounded-full">
                Agendar uma aula demonstrativa
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

      {/* Popup para Hub Immersive Meetups */}
      {showMeetupPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#161533]">Hub Immersive Meetups</h2>
                  <p className="text-[#a3ff3c] font-medium">Prática real, conexões reais.</p>
                </div>
                <button onClick={() => setShowMeetupPopup(false)} className="text-gray-500 hover:text-gray-700">
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
                    className="lucide lucide-x"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 text-gray-600">
                <p>
                  Os Hub Immersive Meetups são encontros presenciais criados para profissionais que querem levar seu
                  inglês ou espanhol para o próximo nível. Em cada meetup, os participantes exploram cases reais de
                  negócios, debatem soluções, trocam experiências e desenvolvem a comunicação em contexto estratégico —
                  tudo no idioma de estudo.
                </p>
                <p>
                  Além da prática intensiva, os meetups promovem networking com outros profissionais engajados no
                  desenvolvimento pessoal e carreira internacional.
                </p>
                <p className="font-medium text-[#161533]">Comunicação, pensamento crítico e conexões em um só lugar.</p>
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  onClick={() => setShowMeetupPopup(false)}
                  className="bg-[#a3ff3c] hover:bg-[#92e636] text-[#161533] rounded-full"
                >
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup para Inglês para Negócios */}
      {showBusinessEnglishPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#161533]">Inglês para Negócios</h2>
                  <p className="text-[#a3ff3c] font-medium">Idioma como ferramenta de performance.</p>
                </div>
                <button
                  onClick={() => setShowBusinessEnglishPopup(false)}
                  className="text-gray-500 hover:text-gray-700"
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
                    className="lucide lucide-x"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 text-gray-600">
                <p>
                  Nosso programa de Inglês para Negócios é voltado para profissionais que atuam em ambientes
                  corporativos e precisam se comunicar com clareza, confiança e profissionalismo.
                </p>
                <p>Durante as aulas, desenvolvemos habilidades essenciais como:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Comunicação em contextos empresariais e negociações</li>
                  <li>Condução de reuniões e apresentações com impacto</li>
                  <li>Redação de e-mails, relatórios e mensagens estratégicas</li>
                </ul>
                <p>Tudo com foco na realidade do aluno e nas demandas do seu dia a dia de trabalho.</p>
                <p className="font-medium text-[#161533]">
                  Prático, direto ao ponto e feito para quem usa o idioma como ferramenta de trabalho.
                </p>
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  onClick={() => setShowBusinessEnglishPopup(false)}
                  className="bg-[#a3ff3c] hover:bg-[#92e636] text-[#161533] rounded-full"
                >
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup para Espanhol para Negócios */}
      {showBusinessSpanishPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#161533]">Espanhol para Negócios</h2>
                  <p className="text-[#a3ff3c] font-medium">Conecte-se com os mercados hispânicos com confiança.</p>
                </div>
                <button
                  onClick={() => setShowBusinessSpanishPopup(false)}
                  className="text-gray-500 hover:text-gray-700"
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
                    className="lucide lucide-x"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 text-gray-600">
                <p>
                  O programa de Espanhol para Negócios é voltado para profissionais que atuam ou desejam atuar com
                  países de língua espanhola, oferecendo as ferramentas linguísticas e culturais necessárias para uma
                  comunicação eficaz.
                </p>
                <p>Nas aulas, trabalhamos:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Comunicação empresarial e negociação em espanhol</li>
                  <li>Cultura corporativa latino-americana</li>
                  <li>Escrita de e-mails, relatórios e correspondência profissional</li>
                </ul>
                <p>Tudo adaptado às demandas reais do ambiente de trabalho.</p>
                <p className="font-medium text-[#161533]">
                  Idioma, contexto e cultura – para você se destacar em mercados hispânicos.
                </p>
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  onClick={() => setShowBusinessSpanishPopup(false)}
                  className="bg-[#a3ff3c] hover:bg-[#92e636] text-[#161533] rounded-full"
                >
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
