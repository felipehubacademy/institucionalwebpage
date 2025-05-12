import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Award, BookOpen, ArrowLeft, CheckCircle } from "lucide-react"
import Image from "next/image"
import { User } from "lucide-react"

export default function SobrePage() {
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Sobre a Hub Academy</h1>
                <p className="max-w-[700px] text-gray-300 md:text-xl">
                  Profissionalizando o ensino de idiomas no Brasil com metodologia exclusiva e foco em resultados.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/founders_new-d9hCBQPfxGpFmADI4MPw8MjxukTmWM.png"
                  width={600}
                  height={600}
                  alt="Fundadores da Hub Academy posando em frente à tela de projeção com o logo da empresa"
                  className="mx-auto w-full h-auto overflow-hidden rounded-xl object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#161533]">Nossa História</h2>
                  <p className="mt-2 text-gray-600">
                    A Hub Academy nasceu da percepção de que o ensino tradicional de idiomas não atendia às necessidades
                    reais dos profissionais brasileiros. Fundada por especialistas em educação e desenvolvimento
                    profissional, nossa missão é transformar o aprendizado de idiomas em uma ferramenta estratégica para
                    o crescimento na carreira.
                  </p>
                  <p className="mt-4 text-gray-600">
                    Desde o início, nos dedicamos a desenvolver uma metodologia única que combina técnicas pedagógicas
                    avançadas com estratégias de desenvolvimento profissional, criando um sistema de aprendizado que
                    entrega resultados mensuráveis e aplicáveis ao contexto real de trabalho.
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#161533]">Nossa Missão</h2>
                  <p className="mt-2 text-gray-600">
                    Capacitar profissionais e empresas através do domínio de idiomas, Bilinguismo, transformando o
                    aprendizado em uma ferramenta estratégica para o crescimento e a competitividade no mercado global.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-[#a3ff3c]" />
                    <span className="text-sm font-medium">Metodologia Exclusiva</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#a3ff3c]" />
                    <span className="text-sm font-medium">+500 Profissionais Capacitados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-[#a3ff3c]" />
                    <span className="text-sm font-medium">Programas Personalizados</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-[#161533]">Nossos Diferenciais</h2>
                <p className="max-w-[700px] text-gray-600 md:text-xl">
                  O que torna a Hub Academy a escolha ideal para profissionais e empresas que buscam resultados reais.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2">
              <div className="flex flex-col space-y-2">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-[#e8ffd4] p-2 mt-1">
                    <CheckCircle className="h-5 w-5 text-[#161533]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#161533]">Foco em Resultados</h3>
                    <p className="text-gray-600">
                      Metodologia orientada para objetivos claros e mensuráveis, com acompanhamento contínuo do
                      progresso.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-[#e8ffd4] p-2 mt-1">
                    <CheckCircle className="h-5 w-5 text-[#161533]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#161533]">Personalização Real</h3>
                    <p className="text-gray-600">
                      Programas adaptados às necessidades específicas de cada profissional e setor de atuação.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-[#e8ffd4] p-2 mt-1">
                    <CheckCircle className="h-5 w-5 text-[#161533]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#161533]">Professores Especializados</h3>
                    <p className="text-gray-600">
                      Equipe de instrutores com experiência em educação e conhecimento específico de diferentes
                      indústrias.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-[#e8ffd4] p-2 mt-1">
                    <CheckCircle className="h-5 w-5 text-[#161533]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#161533]">Tecnologia Integrada</h3>
                    <p className="text-gray-600">
                      Plataformas digitais que complementam o aprendizado presencial e permitem prática contínua.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-[#e8ffd4] p-2 mt-1">
                    <CheckCircle className="h-5 w-5 text-[#161533]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#161533]">Flexibilidade de Formato</h3>
                    <p className="text-gray-600">
                      Opções presenciais, online ou híbridas, adaptadas à rotina e disponibilidade de cada aluno.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-[#e8ffd4] p-2 mt-1">
                    <CheckCircle className="h-5 w-5 text-[#161533]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#161533]">Suporte Contínuo</h3>
                    <p className="text-gray-600">
                      Acompanhamento estratégico durante todo o processo de aprendizado, com ajustes personalizados.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-[#161533]">Nossa Equipe</h2>
                <p className="max-w-[700px] text-gray-600 md:text-xl">
                  Profissionais apaixonados por educação e desenvolvimento, comprometidos com seu sucesso.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 mb-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Felipe_avatar-tYXf2OGWWWUoaUCEKs7F5volaBLZSi.svg"
                    width={128}
                    height={128}
                    alt="Foto do Diretor"
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#161533]">Felipe Xavier</h3>
                <p className="text-[#a3ff3c] font-medium">Head de novos negócios</p>
                <p className="mt-2 text-gray-600 text-sm">
                  Especialista em educação linguística corporativa com mais de 15 anos de experiência em desenvolvimento
                  profissional.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 mb-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rod_avatar-98ObwQWqPVFq6HPWd50omVYH3e9Zne.svg"
                    width={128}
                    height={128}
                    alt="Foto da Diretora Pedagógica"
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#161533]">Rodolfo Hott</h3>
                <p className="text-[#a3ff3c] font-medium">Head de L&D</p>
                <p className="mt-2 text-gray-600 text-sm">
                  Une o ensino de idiomas ao desenvolvimento pessoal, com uma abordagem que valoriza a comunicação e o
                  autoconhecimento.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 mb-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lale_avatar-ql8Hkd7iBWjB1Pr183HoYk2CqMpfQz.svg"
                    width={128}
                    height={128}
                    alt="Foto do Diretor de Operações"
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#161533]">Laleska Portela</h3>
                <p className="text-[#a3ff3c] font-medium">CX Specialist</p>
                <p className="mt-2 text-gray-600 text-sm">
                  Cuida da experiência dos alunos com atenção aos detalhes, organização e empatia. Atua no atendimento
                  direto e oferece suporte constante.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-8 md:grid-cols-4">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-3">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Avatar_Arthur-Yv6EuVtrTJrtUo2DJsTBY40cLXHSjG.png"
                    width={96}
                    height={96}
                    alt="Foto de Arthur Ohtaguro"
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-[#161533]">Arthur Ohtaguro</h3>
                <p className="text-[#a3ff3c] font-medium text-sm">Language Specialist</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-3">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Avatar_Junqueira-1iFHROcSIPpIpznzoTkJ6gvenZxHSA.png"
                    width={96}
                    height={96}
                    alt="Foto de Felipe Junqueira"
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-[#161533]">Felipe Junqueira</h3>
                <p className="text-[#a3ff3c] font-medium text-sm">Language Specialist</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-3">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Avatar_Diogo-sjvds3Q6XRDEWc61wikYDautXiQ44o.png"
                    width={96}
                    height={96}
                    alt="Foto de Diogo Santos"
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-[#161533]">Diogo Santos</h3>
                <p className="text-[#a3ff3c] font-medium text-sm">Language Specialist</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-3">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Avatar_Debhora-7yj0IjswK1DGHeOubJnksPmjdMpZ3i.png"
                    width={96}
                    height={96}
                    alt="Foto de Debhora Bianchi"
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-[#161533]">Debhora Bianchi</h3>
                <p className="text-[#a3ff3c] font-medium text-sm">Language Specialist</p>
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
              Conheça nossa metodologia exclusiva e descubra como podemos ajudar você a alcançar seus objetivos
              profissionais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://wa.me/551152865668?text=Olá,%20gostaria%20de%20agendar%20uma%20aula%20demonstrativa."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#a3ff3c] text-[#161533] hover:bg-[#92e636] rounded-full">
                  Agendar uma aula gratuita
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
