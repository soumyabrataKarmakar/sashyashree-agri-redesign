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
        'bengal-terracotta': '#C1512D',
        'paddy-green': '#4A6741',
        'river-blue': '#2E5668',
        'jute-beige': '#D4C5A9',
        'ink-black': '#1A1A1A',
        'paper-white': '#FAFAF7',
        'warm-sepia': '#8B7355',
      },
      fontFamily: {
        'display': ['var(--font-fraunces)', 'Georgia', 'serif'],
        'body': ['var(--font-newsreader)', 'Georgia', 'serif'],
        'bengali': ['var(--font-noto-bengali)', 'sans-serif'],
      },
      animation: {
        'ken-burns': 'kenBurns 20s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'line-grow': 'lineGrow 1s ease-out forwards',
      },
      keyframes: {
        kenBurns: {
          '0%, 100%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(1.1) translate(-2%, -2%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        lineGrow: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
}

export default config
