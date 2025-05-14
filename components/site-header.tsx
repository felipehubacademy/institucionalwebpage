"use client"

import Link from "next/link"
import { User } from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { useState } from "react"

export function SiteHeader() {
  const pathname = usePathname()
  const [logoError, setLogoError] = useState(false)

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-[#161533] text-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src={logoError ? "/placeholder.svg" : "/images/Logo_horizontal_green.svg"}
              alt="Logo Hub Academy"
              width={140}
              height={40}
              className="h-8 w-auto"
              onError={() => setLogoError(true)}
            />
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${isActive("/") ? "text-[#a3ff3c]" : "hover:text-[#a3ff3c]"}`}
          >
            Home
          </Link>
          <Link
            href="/sobre"
            className={`text-sm font-medium transition-colors ${isActive("/sobre") ? "text-[#a3ff3c]" : "hover:text-[#a3ff3c]"}`}
          >
            Sobre
          </Link>
          <Link
            href="/metodologia"
            className={`text-sm font-medium transition-colors ${isActive("/metodologia") ? "text-[#a3ff3c]" : "hover:text-[#a3ff3c]"}`}
          >
            Metodologia
          </Link>
          <Link
            href="/solucoes"
            className={`text-sm font-medium transition-colors ${isActive("/solucoes") ? "text-[#a3ff3c]" : "hover:text-[#a3ff3c]"}`}
          >
            Soluções
          </Link>
          <Link
            href="/clientes"
            className={`text-sm font-medium transition-colors ${isActive("/clientes") ? "text-[#a3ff3c]" : "hover:text-[#a3ff3c]"}`}
          >
            Clientes
          </Link>
          <Link
            href="/impacto"
            className={`text-sm font-medium transition-colors ${isActive("/impacto") ? "text-[#a3ff3c]" : "hover:text-[#a3ff3c]"}`}
          >
            Impacto
          </Link>
          <Link
            href="/contato"
            className={`text-sm font-medium transition-colors ${isActive("/contato") ? "text-[#a3ff3c]" : "hover:text-[#a3ff3c]"}`}
          >
            Contato
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="https://lms.hubacademybr.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex text-sm font-medium hover:text-[#a3ff3c] transition-colors items-center gap-1"
          >
            <User size={14} />
            Login
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
