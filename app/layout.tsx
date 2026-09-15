import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
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
  metadataBase: new URL('https://tor-q-event-website.vercel.app'),

  title: {
    default: "TOR'Q 2026 — Artistry in Motorsport",
    template: "%s | TOR'Q 2026",
  },

  description:
    "TOR'Q is a premium motorsport spectacle in Lagos, Nigeria, bringing together drifting, burnouts, power bike stunts, performance cars, sim racing, music and immersive automotive experiences.",

  applicationName: "TOR'Q",

  keywords: [
    "TOR'Q",
    "TORQ",
    "TOR'Q 2026",
    "motorsport Nigeria",
    "motorsport Lagos",
    "motorsport event Nigeria",
    "Lagos motorsport",
    "drifting Nigeria",
    "drift event Lagos",
    "bike stunts Nigeria",
    "sim racing Nigeria",
    "Cars on the Runway",
    "automotive events Nigeria",
    "motorsport festival Nigeria",
  ],

  authors: [
    {
      name: "TOR'Q",
    },
  ],

  creator: "TOR'Q",
  publisher: "TOR'Q",

  category: "sports",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "/",
    siteName: "TOR'Q",
    title: "TOR'Q 2026 — Artistry in Motorsport",
    description:
      "Africa's motorsport spectacle. Experience drifting, power bike stunts, performance cars, sim racing and premium automotive experiences in Lagos, Nigeria.",
    images: [
      {
        url: "/images/Hero-mustang-03.jpg",
        width: 1920,
        height: 1080,
        alt: "TOR'Q — Artistry in Motorsport",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "TOR'Q 2026 — Artistry in Motorsport",
    description:
      "Experience drifting, power bike stunts, performance cars, sim racing and immersive automotive experiences in Lagos, Nigeria.",
    images: ["/images/Hero-mustang-03.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0d0b0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en-NG"
      className={`dark ${geist.variable} ${oswald.variable}`}
    >
      <body className="bg-background font-sans antialiased">
        <ScrollProgress />

        {children}

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
