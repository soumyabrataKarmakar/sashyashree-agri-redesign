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
        'harvest-gold': '#C9A227',
        'rich-soil': '#2C1810',
        'cream-field': '#F7F3E3',
        'sunset-orange': '#E8743B',
        'deep-green': '#1D3C28',
        'warm-cream': '#FDF8F0',
        'golden-light': '#E8D5A3',
      },
      fontFamily: {
        'display': ['var(--font-bodoni)', 'Georgia', 'serif'],
        'body': ['var(--font-libre)', 'system-ui', 'sans-serif'],
        'accent': ['var(--font-instrument)', 'Georgia', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'sway': 'sway 4s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
        'count': 'count 2s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-up-delayed': 'slideUp 0.8s ease-out 0.2s forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'golden-mesh': 'radial-gradient(at 40% 20%, rgba(201, 162, 39, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(232, 116, 59, 0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(201, 162, 39, 0.2) 0px, transparent 50%)',
        'cream-gradient': 'linear-gradient(180deg, #F7F3E3 0%, #FDF8F0 100%)',
        'soil-gradient': 'linear-gradient(180deg, #2C1810 0%, #1D3C28 100%)',
      },
    },
  },
  plugins: [],
}

export default config
