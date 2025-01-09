const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/react/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0 20px 35px rgba(0, 0, 0, 0.2), 0 -20px 35px rgba(0, 0, 0, 0.2)",
      },
      colors: {
        "darkBg": "#18181b",
        "dark-800": "#27272A",
      },
  
      
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}