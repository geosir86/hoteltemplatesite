/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F5F5F5',
        foreground: '#1A1A1A',
        muted: '#717171',
        card: '#FFFFFF',
        dark: '#131313',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '40': '10rem', // 160px
      }
    },
  },
  plugins: [],
}
