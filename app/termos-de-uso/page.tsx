import Link from "next/link"
import { ArrowLeft, User } from "lucide-react"
import Image from "next/image"

export default function TermosDeUsoPage() {
  return (
    <div>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#161533] text-white">
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

      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#161533] text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Link href="/" className="flex items-center text-[#a3ff3c] hover:text-[#92e636] mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para a Página Inicial
              </Link>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Termos de Uso</h1>
                <p className="max-w-[700px] text-gray-300 md:text-xl">
                  Conheça os termos e condições para utilização dos serviços da Hub Academy.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <h2>1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e utilizar os serviços da Hub Academy, você concorda com os Termos de Uso e com a nossa
                Política de Privacidade. Caso não concorde com qualquer parte destes termos, solicitamos que não utilize
                nossos serviços.
              </p>

              <h2>2. Descrição dos Serviços</h2>
              <p>
                A Hub Academy oferece serviços educacionais de ensino de idiomas, incluindo aulas presenciais, online e
                materiais didáticos. Nossos serviços são destinados a profissionais e empresas que buscam o
                desenvolvimento de habilidades linguísticas para fins profissionais.
              </p>

              <h2>3. Cadastro e Conta</h2>
              <p>
                Para utilizar determinados serviços, pode ser necessário criar uma conta. Você é responsável por manter
                a confidencialidade de suas credenciais de acesso e por todas as atividades realizadas em sua conta.
                Caso perceba qualquer uso não autorizado, deverá informar a Hub Academy imediatamente.
              </p>

              <h2>4. Responsabilidades do Usuário</h2>
              <p>Ao utilizar nossos serviços, você concorda em:</p>
              <ul>
                <li>Fornecer informações verdadeiras, completas e precisas durante o cadastro;</li>
                <li>Utilizar os serviços de acordo com a legislação aplicável;</li>
                <li>Não compartilhar suas credenciais de acesso com terceiros;</li>
                <li>Não utilizar os serviços para fins ilegais ou não autorizados;</li>
                <li>Respeitar os direitos de propriedade intelectual da Hub Academy e de terceiros.</li>
              </ul>

              <h2>5. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo disponibilizado pela Hub Academy, incluindo textos, imagens, vídeos, áudios, software,
                design, marcas e logotipos, é protegido por direitos autorais e outras leis de propriedade intelectual.
                Você não está autorizado a copiar, modificar, distribuir, vender ou alugar qualquer parte dos serviços
                sem autorização expressa.
              </p>

              <h2>6. Pagamentos e Reembolsos</h2>
              <p>
                Os valores, formas de pagamento e políticas de reembolso serão informados antes da contratação dos
                serviços. Ao contratar um serviço, você concorda com as condições financeiras estabelecidas.
              </p>

              <h2>7. Cancelamento e Rescisão</h2>
              <p>
                A Hub Academy reserva-se o direito de suspender ou encerrar sua conta e o acesso aos serviços em caso de
                violação destes Termos de Uso ou por qualquer outro motivo, a seu critério.
              </p>

              <h2>8. Limitação de Responsabilidade</h2>
              <p>
                A Hub Academy não será responsável por danos indiretos, incidentais, especiais, punitivos ou
                consequentes decorrentes do uso ou incapacidade de uso dos serviços, salvo em casos de dolo ou culpa
                grave.
              </p>

              <h2>9. Alterações nos Termos</h2>
              <p>
                Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em
                vigor imediatamente após a publicação dos termos atualizados em nosso site. O uso continuado dos
                serviços após a publicação das alterações constitui sua aceitação dos novos termos.
              </p>

              <h2>10. Lei Aplicável</h2>
              <p>
                Estes Termos de Uso são regidos pelas leis do Brasil. Qualquer disputa relacionada a estes termos será
                submetida à jurisdição exclusiva dos tribunais da cidade de São Paulo, Estado de São Paulo, Brasil.
              </p>

              <h2>11. Contato</h2>
              <p>
                Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco pelo e-mail:
                hub@hubacademybr.com.
              </p>

              <p className="text-sm text-gray-500 mt-8">Última atualização: 10 de maio de 2025</p>
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
          </div>
        </div>
      </footer>
    </div>
  )
}
