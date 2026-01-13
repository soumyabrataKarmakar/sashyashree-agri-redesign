import type { Metadata } from 'next'
import { Fraunces, Newsreader, Noto_Sans_Bengali } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
})

const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  variable: '--font-noto-bengali',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Sashyashree Agri | Our Bengal Roots - Since 1992',
  description: 'Three decades of serving Eastern Indian farmers with premium quality seeds. A story of trust, heritage, and agricultural excellence.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${newsreader.variable} ${notoBengali.variable}`}>
      <body className="bg-paper-white text-ink-black antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
