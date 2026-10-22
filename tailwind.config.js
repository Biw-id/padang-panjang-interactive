/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        marawa: {
          itam: '#121316',
          sirah: '#B91C1C',
          'sirah-bright': '#DC2626',
          emas: '#D97706',
          'emas-bright': '#F59E0B',
        },
        sejuk: {
          900: '#064E3B',
          800: '#065F46',
          600: '#059669',
          400: '#34D399',
        },
        kabut: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E4F0',
          500: '#64748B',
          800: '#1E293B',
          900: '#0F172A',
        },
        primary: {
          DEFAULT: '#9047FF',
          active: '#7114FF',
        }
      },
      fontFamily: {
        serif: ['"Emotion Serif"', 'Georgia', 'serif'],
        sans: ['"PP Neue Montreal"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'Courier New', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.02em',
        widest: '0.15em',
        ultra: '0.25em',
      },
    },
  },
  plugins: [],
}
