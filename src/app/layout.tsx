import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { createClient } from '@/lib/supabase/server'
import { SessionProvider } from '@/lib/session-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Austin Talent Exchange',
    template: '%s | Austin Talent Exchange',
  },
  description:
    'Connecting Austin bands and venues in Austin, TX — discover local bands, book live music, and manage gigs.',
  keywords: [
    'Austin live music',
    'Austin bands',
    'Austin venues',
    'book live music',
    'Austin Talent Exchange',
  ],
  authors: [{ name: 'Austin Talent Exchange', url: 'https://austintalentexchange.com' }],
  openGraph: {
    title: 'Austin Talent Exchange',
    description:
      'Connecting Austin bands and venues in Austin, TX — discover local bands and book live music.',
    url: 'https://austintalentexchange.com',
    siteName: 'Austin Talent Exchange',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Austin Talent Exchange - local bands & venues',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Austin Talent Exchange',
    description:
      'Connecting Austin bands and venues in Austin, TX — discover local bands and book live music.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://austintalentexchange.com',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider user={user} isLoading={false}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}