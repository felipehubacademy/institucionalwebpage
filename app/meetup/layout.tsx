import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "English Night Live – Hub Academy Immersive Meetup",
  description:
    "Uma noite exclusiva de networking e prática de inglês em um ambiente dinâmico e imersivo. 22/10, 18h30, São Paulo - Av. Paulista.",
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

export default function MeetupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mt-16" style={{
      paddingTop: 'env(safe-area-inset-top)',
      paddingBottom: 'env(safe-area-inset-bottom)'
    }}>
      {children}
    </div>
  )
}


