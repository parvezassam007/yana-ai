/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yana: {
          50: '#fff7ed',
          100: '#ffedd5',
          500: '#f97316', // Saffron primary
          600: '#ea580c',
          700: '#c2410c',
          900: '#7c2d12',
          blue: '#1e3a8a', // Trust blue accent
        }
      }
    },
  },
  plugins: [],
}
