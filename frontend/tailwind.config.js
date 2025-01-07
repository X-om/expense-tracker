const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      boxShadow:{
        "3xl" : '13px 35px 500px -40px rgba(0.2, 0.2, 0.2, 0.2)'
      }
    },
    colors : {
      "darkBg" : "#18181b",
      "zink-300" : "#D4D4D8",
      "zink-400" : "#A1A1AA"
    }
  },
  darkMode : "class",
  plugins: [nextui()],
}
