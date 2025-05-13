import { Inter } from "next/font/google"

// Configuração otimizada da fonte
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
  weight: ["400", "500", "600", "700"],
})
