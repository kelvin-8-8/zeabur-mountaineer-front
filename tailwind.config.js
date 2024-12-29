/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "selector",
  theme: {
    extend: {
      height: {
        '500px': '500px',
        '800px': '800px',
      },
      
      minHeight: {
        '800px': '800px',
      },

      width: {
        '500px': '500px',
        '800px': '800px',
      },

      fontFamily: {
        tradewinds: ['Trade Winds', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  darkMode: ['selector', '[data-theme="dark"]']
}

