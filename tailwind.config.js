/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/*.jsx",
    "./src/components/*.jsx"
  ],
  theme: {
    fontFamily: {
      'sans': 'Comfortaa'
    },
    extend: {
      colors: {
        "black": "#1a1a1a",
        "gray": "#2a2a2a",
        "hover-gray": "#4d4d4d",
        "purple": "#7846b9",
        "hover-purple": "#936bc7",
        "red": "#cf3434",
        "hover-red": "#d85a5a",
        "green": "#3caa5f",
        "hover-green": "#68ca87",
      }
    },
  },
  plugins: [],
}
