import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          pink:   '#FF2D78',
          violet: '#7B2FFF',
          dark:   '#0A0A0A',
          light:  '#FAFAFA',
          gold:   '#F5C542',
          rose:   '#FF6B9D',
          deep:   '#1A0030',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in':    'fadeIn 0.6s ease-out',
        'slide-up':   'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'marquee':    'marquee 20s linear infinite',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
      },
    },
  },
  plugins: [],
} satisfies Config;
