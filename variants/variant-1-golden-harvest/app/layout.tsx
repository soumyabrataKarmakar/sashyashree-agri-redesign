import type { Metadata } from 'next'
import { Bodoni_Moda, Libre_Franklin, Instrument_Serif } from 'next/font/google'
import './globals.css'

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-bodoni',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const libre = Libre_Franklin({
  subsets: ['latin'],
  variable: '--font-libre',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const instrument = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
  weight: ['400'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Sashyashree Agri | Good Seeds Only Can Make High Yield',
  description: 'Leading agricultural seeds producer in Eastern India since 1992. Premium quality Paddy, Mustard, Sesame, Jute, Fodder, Maize & Vegetable Seeds.',
  keywords: 'seeds, paddy seeds, mustard seeds, agriculture, farming, West Bengal, India',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bodoni.variable} ${libre.variable} ${instrument.variable}`}>
      <body className="bg-cream-field text-rich-soil antialiased overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
