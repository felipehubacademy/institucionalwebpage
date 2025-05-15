"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail, Phone, MapPin, Clock } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import HubSpotForm from "@/components/hubspot-form"

export default function ContatoPage() {
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Fale Conosco</h1>
                <p className="max-w-[700px] text-gray-300 md:text-xl">
                  Estamos prontos para ajudar você a transformar seu domínio de idiomas em uma ferramenta estratégica
                  para sua carreira.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#161533]">Entre em Contato</CardTitle>
                  <CardDescription>Preencha o formulário abaixo e retornaremos em até 24 horas.</CardDescription>
                </CardHeader>
                <CardContent>
                  <HubSpotForm
                    portalId="49530565"
                    formId="727fe665-19d0-43bf-9043-5b9785c81829"
                    includeMessage={true}
                  />
                </CardContent>
              </Card>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-[#161533]">Informações de Contato</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-[#a3ff3c] mt-0.5" />
                      <div>
                        <h3 className="font-medium text-[#161533]">Email</h3>
                        <a
                          href="mailto:contato@hubacademybr.com?subject=Contato%20do%20Site&body=Olá,%20gostaria%20de%20mais%20informações%20sobre%20os%20programas."
                          className="text-gray-600 hover:text-[#a3ff3c] underline"
                        >
                          contato@hubacademybr.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-[#a3ff3c] mt-0.5" />
                      <div>
                        <h3 className="font-medium text-[#161533]">Telefone</h3>
                        <p className="text-gray-600">+55 11 97481-1737</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-[#a3ff3c] mt-0.5" />
                      <div>
                        <h3 className="font-medium text-[#161533]">Endereço</h3>
                        <p className="text-gray-600">São Paulo, Brasil</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-[#a3ff3c] mt-0.5" />
                      <div>
                        <h3 className="font-medium text-[#161533]">Horário de Atendimento</h3>
                        <p className="text-gray-600">Segunda a Sexta: 8:00 - 20:00</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-[#161533]">Agende uma Aula</h2>
                  <p className="text-gray-600 mb-4">
                    Conheça nossa estrutura e metodologia. Agende uma aula e descubra como podemos ajudar você a
                    alcançar seus objetivos com o idioma.
                  </p>
                  <Link
                    href="https://wa.me/551152865668?text=Olá,%20gostaria%20de%20agendar%20uma%20aula%20demonstrativa."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-[#161533] hover:bg-[#232244] text-white rounded-full">Agendar Aula</Button>
                  </Link>
                </div>
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-4 text-[#161533]">Siga-nos</h2>
                  <div className="flex gap-4">
                    <Link
                      href="https://www.instagram.com/hubacademybr/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#a3ff3c]"
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
                        className="h-6 w-6"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    </Link>
                    <Link
                      href="https://www.linkedin.com/company/hubacademyenglish"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#a3ff3c]"
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
                        className="h-6 w-6"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </Link>
                    <Link
                      href="https://www.youtube.com/@hubacademybr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#a3ff3c]"
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
                        className="h-6 w-6"
                      >
                        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                        <path d="m10 15 5-3-5-3z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#161533] text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-6">
              Pronto para transformar seu domínio de idiomas?
            </h2>
            <p className="max-w-[700px] mx-auto text-white/80 md:text-xl mb-8">
              Agende uma aula experimental gratuita e descubra como nossa metodologia exclusiva pode ajudar você a
              alcançar seus objetivos profissionais.
            </p>
            <Link
              href="https://wa.me/551152865668?text=Olá,%20gostaria%20de%20agendar%20uma%20aula%20demonstrativa."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-white text-[#161533] hover:bg-[#161533] hover:text-[#a3ff3c] hover:border-white border transition-colors rounded-full">
                Agendar Aula Gratuita
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
