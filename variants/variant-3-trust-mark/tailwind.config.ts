import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'institution-green': '#0F4C35',
        'certificate-gold': '#B8963E',
        'document-cream': '#F5F2EB',
        'seal-red': '#8B2942',
        'steel-gray': '#4A4A4A',
        'pure-white': '#FFFFFF',
      },
      fontFamily: {
        'display': ['var(--font-dm-serif)', 'Georgia', 'serif'],
        'body': ['var(--font-source-serif)', 'Georgia', 'serif'],
        'mono': ['var(--font-jetbrains)', 'monospace'],
        'accent': ['var(--font-bitter)', 'Georgia', 'serif'],
      },
      animation: {
        'seal-stamp': 'sealStamp 1.5s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        sealStamp: {
          '0%': { transform: 'scale(3) rotate(-15deg)', opacity: '0' },
          '50%': { transform: 'scale(1.1) rotate(5deg)', opacity: '0.8' },
          '70%': { transform: 'scale(0.95) rotate(-2deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        counter: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
