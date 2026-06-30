/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#A6FF00', // lime neon green main
        'brand-green-sec': '#8DDB00', // lime neon green secondary
        'brand-black': '#050505',
        'brand-dark': '#1A1A1A',
        'brand-gray': '#F5F5F5',
        'brand-white': '#FFFFFF',
        'whatsapp': '#25D366',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
