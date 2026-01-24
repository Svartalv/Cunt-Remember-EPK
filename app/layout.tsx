import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Cunt Remember — Press Kit',
  description: 'Argentinian artist based in Berlin. Experimental electronic music and performance-driven DJ sets.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" style={{ margin: 0, padding: 0 }} className={montserrat.variable}>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
