/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/preline/preline.js'],
  darkMode: 'class',
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('preline/plugin'),
  ]
}
