/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        theme: "#46a9ff"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ]
}
