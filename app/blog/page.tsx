import Link from "next/link"
import { ArrowLeft, User, Calendar, Clock } from "lucide-react"
import Image from "next/image"
import Breadcrumbs from "@/components/breadcrumbs"

const blogPosts = [
  {
    id: 1,
    title: "5 Dicas para Melhorar seu Inglês para Reuniões Internacionais",
    excerpt: "Aprenda estratégias práticas para se comunicar com confiança em reuniões de negócios em inglês.",
    slug: "dicas-para-melhorar-ingles-reunioes",
    date: "10 de Maio, 2025",
    readTime: "5 min de leitura",
    image: "/images/blog/reunioes-internacionais.jpg",
    category: "Inglês para Negócios",
  },
  {
    id: 2,
    title: "Como o Espanhol pode Abrir Portas para o Mercado Latino-Americano",
    excerpt:
      "Descubra como o domínio do espanhol pode ser um diferencial competitivo para profissionais que desejam expandir seus negócios.",
    slug: "espanhol-mercado-latino-americano",
    date: "5 de Maio, 2025",
    readTime: "7 min de leitura",
    image: "/images/blog/mercado-latino.jpg",
    category: "Espanhol para Negócios",
  },
  {
    id: 3,
    title: "A Importância da Imersão no Aprendizado de Idiomas",
    excerpt:
      "Entenda por que a imersão é fundamental para alcançar fluência e como os Immersive Meetups podem acelerar seu aprendizado.",
    slug: "importancia-imersao-aprendizado-idiomas",
    date: "1 de Maio, 2025",
    readTime: "6 min de leitura",
    image: "/images/blog/imersao-idiomas.jpg",
    category: "Metodologia",
  },
]

export const metadata = {
  title: "Blog - Hub Academy | Dicas e Conteúdos sobre Idiomas para Profissionais",
  description: "Artigos, dicas e conteúdos exclusivos sobre inglês e espanhol para profissionais e empresas.",
}

export default function BlogPage() {
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
            <Link href="/blog" className="text-sm font-medium text-[#a3ff3c] transition-colors">
              Blog
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Blog Hub Academy</h1>
                <p className="max-w-[700px] text-gray-300 md:text-xl">
                  Artigos, dicas e conteúdos exclusivos sobre inglês e espanhol para profissionais e empresas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <Breadcrumbs items={[{ label: "Blog", href: "/blog", isCurrent: true }]} />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute top-2 left-2 z-10">
                        <span className="bg-[#a3ff3c] text-[#161533] text-xs font-medium px-2.5 py-1 rounded">
                          {post.category}
                        </span>
                      </div>
                      <div className="w-full h-full bg-gray-200">
                        {/* Placeholder para imagem */}
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                          Imagem do Post
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar size={14} className="mr-1" />
                        <span className="mr-3">{post.date}</span>
                        <Clock size={14} className="mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                      <h2 className="text-xl font-bold text-[#161533] mb-2 line-clamp-2">{post.title}</h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="text-[#161533] font-medium hover:text-[#a3ff3c] transition-colors">Ler mais</div>
                    </div>
                  </Link>
                </article>
              ))}
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
