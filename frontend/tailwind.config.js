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
       "3xl": "0 20px 35px rgba(0, 0, 0, 0.2), 0 -20px 35px rgba(0, 0, 0, 0.2)",
      }
    },
    colors : {
      "darkBg" : "#18181b",
      "dark-800" : "#27272A",
      "zink-300" : "#D4D4D8",
      "zink-400" : "#A1A1AA",
      "zink-20" : "#FAFAFA",
      "zink-700" : "#3F3F46"
    }
  },
  darkMode : "class",
  plugins: [nextui()],
}
