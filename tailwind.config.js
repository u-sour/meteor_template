/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ['./imports/ui/**/*.{vue,js,ts,jsx,tsx}', './client/*.html'],
  theme: {
    extend: {},
  },
  plugins: [],
}
