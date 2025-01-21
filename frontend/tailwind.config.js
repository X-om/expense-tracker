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
        //#3E3D38
        "dash-form" : "#0000",
        "dash-via" : "#F7CBCA",
        "dash-to" : "#2D3250"
      },
  
      
    },
  },
  darkMode: "class",
  plugins: [nextui({
    prefix: "nextui", 
      addCommonColors: false, 
      defaultTheme: "dark", 
      defaultExtendTheme: "dark", 
      layout: {}, 
      themes: {
        light: {
          layout: {}, 
          colors: {}, 
        },
        dark: {
          layout: {}, 
          colors: {}, 
        }
      }
  })]
}