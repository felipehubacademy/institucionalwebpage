"use client"

import Link from "next/link"
import { User } from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"
import { usePathname } from "next/navigation"
import { LogoImage } from "@/components/logo-image"
import { useState, useEffect } from "react"

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  const isActive = (path: string) => {
    return pathname === path
  }

  // Calculate logo dimensions based on scroll state
  const logoWidth = scrolled ? 120 : 140
  const logoHeight = scrolled ? 36 : 42

  return (
    <header
      className={`fixed top-0 z-50 w-full bg-[#161533] text-white transition-all duration-200 ${
        scrolled ? "h-14 shadow-md" : "h-16"
      }`}
    >
      <div className={`container flex items-center justify-between h-full`}>
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <LogoImage
              src="/images/Logo_horizontal_green.svg"
              alt="Logo Hub Academy"
              width={logoWidth}
              height={logoHeight}
              priority={true}
              className="transition-all duration-200"
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
