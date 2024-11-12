/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./**/*.{html,js,ts}","!./node_modules/**/*"],
  theme: {
    extend: { //changes utility classes, custome changes

      height: {
        "7": "30px"
      },

      colors: {
        brand: {

        }
      }
    },
  },
  plugins: [],
}
