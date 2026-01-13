import type { Metadata } from 'next'
import { Cormorant_Garamond, Nunito_Sans, Caveat } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const nunito = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Sashyashree Agri | From Seed to Success',
  description: 'Rooted in nature, growing with farmers since 1992. Premium quality agricultural seeds for Eastern India.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${nunito.variable} ${caveat.variable}`}>
      <body className="bg-warm-cream text-rich-earth antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
