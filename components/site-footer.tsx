"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export function SiteFooter() {
  const [logoError, setLogoError] = useState(false)

  return (
    <footer className="w-full border-t py-6 md:py-0 bg-[#161533] text-white border-[#232244]">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Link href="/">
            <Image
              src={logoError ? "/placeholder.svg" : "/images/Logo_horizontal_green.svg"}
              alt="Logo Hub Academy"
              width={120}
              height={36}
              className="h-6 w-auto"
              onError={() => setLogoError(true)}
            />
          </Link>
          <p className="text-sm text-gray-400 text-center md:text-left mt-2 md:mt-0">
            © {new Date().getFullYear()} Hub Academy. Todos os direitos reservados.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
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
  )
}
