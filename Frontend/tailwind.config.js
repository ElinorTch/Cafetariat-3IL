/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", 'sans-serif'],
      },
      colors: {
        'charte-blue': '#0692a2',
        'charte-gray': '#e2dfd3'
      },
    },
  },
  plugins: [],
}

