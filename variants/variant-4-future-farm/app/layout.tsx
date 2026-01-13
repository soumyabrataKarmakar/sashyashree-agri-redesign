import type { Metadata } from 'next'
import { Syne, DM_Sans, Outfit } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Sashyashree Agri | Future of Farming',
  description: 'Innovation meets tradition. Premium agricultural seeds powering the future of Eastern Indian farming.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${outfit.variable}`}>
      <body className="bg-charcoal text-off-white antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
