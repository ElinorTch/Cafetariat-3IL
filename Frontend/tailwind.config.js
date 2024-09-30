/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", 'sans-serif'],
      },
      boxShadow: {
        'dashboard': '0 1px 5px 0px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        'charte-blue': '#0692a2',
        'charte-gray': '#e2dfd3'
      },
    },
  },
  plugins: [],
}

