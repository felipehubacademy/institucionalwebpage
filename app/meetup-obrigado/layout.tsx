import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "Inscrição Confirmada – English Night Live",
  description: "Sua inscrição no English Night Live foi confirmada. Nos vemos em 22/10, às 18h30, em São Paulo - Av. Paulista.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function MeetupObrigadoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mt-16" style={{
      paddingTop: 'env(safe-area-inset-top)',
      paddingBottom: 'env(safe-area-inset-bottom)'
    }}>
      {children}
    </div>
  )
}


