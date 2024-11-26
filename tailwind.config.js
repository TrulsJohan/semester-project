/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./**/*.{html,js,ts}","!./node_modules/**/*"],
  theme: {
    extend: {

      colors: {
        'brand': {
          100: '#F8F5FF',
          200: '#B99CFC',
          300: '#7D49F8',
          400: '#6528F7',
          500: '#501BCE'
        }
      }
    },
  },
  plugins: [],
}
