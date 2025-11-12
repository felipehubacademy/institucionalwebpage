import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"
// Import the LayoutWrapper component
import { LayoutWrapper } from "@/components/layout-wrapper"
import { FaviconLoader } from "@/app/favicon-loader"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Hub Academy - Inglês e Espanhol para Profissionais",
  description:
    "Domine o inglês e o espanhol com confiança e propósito. Aprenda idiomas como ferramenta de crescimento profissional com a metodologia exclusiva da Hub Academy.",
  keywords:
    "inglês para negócios, espanhol corporativo, curso de idiomas para profissionais, hub academy, imersão em idiomas",
  authors: [{ name: "Hub Academy" }],
  creator: "Hub Academy",
  publisher: "Hub Academy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://hubacademybr.com"),
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
      "en-US": "/en",
      "es-ES": "/es",
    },
  },
  openGraph: {
    title: "Hub Academy - Inglês e Espanhol para Profissionais",
    description:
      "Domine o inglês e o espanhol com confiança e propósito. Aprenda idiomas como ferramenta de crescimento profissional.",
    url: "https://hubacademybr.com",
    siteName: "Hub Academy",
    images: [
      {
        url: "/images/hub-academy-og.png",
        width: 1200,
        height: 630,
        alt: "Hub Academy - Inglês e Espanhol para Profissionais",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hub Academy - Inglês e Espanhol para Profissionais",
    description:
      "Domine o inglês e o espanhol com confiança e propósito. Aprenda idiomas como ferramenta de crescimento profissional.",
    images: ["/images/hub-academy-og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  themeColor: "#a3ff3c",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="msapplication-TileColor" content="#a3ff3c" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#161533" />
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`}
          </Script>
        )}
        {/* Meta Pixel removido do código - agora gerenciado via GTM */}
        <link rel="canonical" href="https://hubacademybr.com" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        )}
        {/* End Google Tag Manager (noscript) */}
        {/* Meta Pixel (noscript) removido - agora gerenciado via GTM */}

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <FaviconLoader />
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
