import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'sage-green': '#87A878',
        'rich-earth': '#5D4037',
        'warm-cream': '#FAF6F0',
        'terracotta': '#C67B5C',
        'forest-deep': '#2D4A3E',
        'soft-white': '#FEFEFE',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'serif'],
        body: ['var(--font-nunito)', 'sans-serif'],
        accent: ['var(--font-caveat)', 'cursive'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
