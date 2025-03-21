/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "pixelify": ['Pixelify', ...fontFamily.sans],
        "poppins": ['Poppins', ...fontFamily.sans]
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};