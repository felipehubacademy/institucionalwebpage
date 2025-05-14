"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { usePathname } from "next/navigation"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    // Prevent scrolling when menu is open
    if (!isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }

  const closeMenu = () => {
    setIsOpen(false)
    document.body.style.overflow = "auto"
  }

  // Close menu when route changes
  useEffect(() => {
    closeMenu()
  }, [pathname])

  // Close menu when ESC key is pressed
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu()
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/10"
        onClick={toggleMenu}
        aria-label="Menu"
        aria-expanded={isOpen}
      >
        <Menu size={24} />
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeMenu}
          aria-hidden="true"
          role="presentation"
        ></div>
      )}

      {/* Mobile menu panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#161533] z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-[#232244]">
            <Link href="/" onClick={closeMenu}>
              <Image
                src={logoError ? "/placeholder.svg" : "/images/Logo_horizontal_green.svg"}
                alt="Logo Hub Academy"
                width={120}
                height={36}
                className="h-6 w-auto"
                onError={() => setLogoError(true)}
              />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={closeMenu}
              aria-label="Fechar menu"
            >
              <X size={24} />
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-4">
              <li>
                <Link
                  href="/"
                  className={`flex items-center py-3 text-white hover:text-[#a3ff3c] transition-colors ${
                    pathname === "/" ? "text-[#a3ff3c]" : ""
                  }`}
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className={`flex items-center py-3 text-white hover:text-[#a3ff3c] transition-colors ${
                    pathname === "/sobre" ? "text-[#a3ff3c]" : ""
                  }`}
                  onClick={closeMenu}
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/metodologia"
                  className={`flex items-center py-3 text-white hover:text-[#a3ff3c] transition-colors ${
                    pathname === "/metodologia" ? "text-[#a3ff3c]" : ""
                  }`}
                  onClick={closeMenu}
                >
                  Metodologia
                </Link>
              </li>
              <li>
                <Link
                  href="/solucoes"
                  className={`flex items-center py-3 text-white hover:text-[#a3ff3c] transition-colors ${
                    pathname === "/solucoes" ? "text-[#a3ff3c]" : ""
                  }`}
                  onClick={closeMenu}
                >
                  Soluções
                </Link>
              </li>
              <li>
                <Link
                  href="/clientes"
                  className={`flex items-center py-3 text-white hover:text-[#a3ff3c] transition-colors ${
                    pathname === "/clientes" ? "text-[#a3ff3c]" : ""
                  }`}
                  onClick={closeMenu}
                >
                  Clientes
                </Link>
              </li>
              <li>
                <Link
                  href="/impacto"
                  className={`flex items-center py-3 text-white hover:text-[#a3ff3c] transition-colors ${
                    pathname === "/impacto" ? "text-[#a3ff3c]" : ""
                  }`}
                  onClick={closeMenu}
                >
                  Impacto
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className={`flex items-center py-3 text-white hover:text-[#a3ff3c] transition-colors ${
                    pathname === "/contato" ? "text-[#a3ff3c]" : ""
                  }`}
                  onClick={closeMenu}
                >
                  Contato
                </Link>
              </li>
            </ul>
          </nav>

          <div className="p-4 border-t border-[#232244]">
            <Link
              href="https://lms.hubacademybr.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-3 text-white hover:text-[#a3ff3c] transition-colors"
              onClick={closeMenu}
            >
              <User size={18} />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
