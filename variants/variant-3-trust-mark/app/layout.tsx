import type { Metadata } from 'next'
import { DM_Serif_Display, Source_Serif_4, JetBrains_Mono, Bitter } from 'next/font/google'
import './globals.css'

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
  weight: ['400'],
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
})

const bitter = Bitter({
  subsets: ['latin'],
  variable: '--font-bitter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Sashyashree Agri | Certified Quality Seeds Since 1992',
  description: 'Trusted by farmers across Eastern India for over three decades. Premium quality certified agricultural seeds.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${sourceSerif.variable} ${jetbrains.variable} ${bitter.variable}`}>
      <body className="bg-document-cream text-steel-gray antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
