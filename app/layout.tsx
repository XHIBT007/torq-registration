import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Oswald } from 'next/font/google'

import './globals.css'
import { ScrollProgress } from '@/components/torq/scroll-progress'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: "TOR'Q — Artistry in Motorsport",
  description:
    "TOR'Q is a premium motorsport festival where drifting, bike stunts, supercars, sim racing and VIP experiences collide. Formula One meets the Goodwood Festival of Speed.",
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0d0b0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geist.variable} ${oswald.variable}`}
    >
      <body className="bg-background font-sans antialiased">
        <ScrollProgress />

        {children}

        {process.env.NODE_ENV === 'production' && (
          <Analytics />
        )}
      </body>
    </html>
  )
}
