/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: "#2a2524",
        card: "#2a2524",
      },
      borderRadius: {
        'xl2': '28px',
      },
      fontFamily: {
        'kalameh': ['Kalameh', 'Tahoma', 'Arial', 'sans-serif'],
        'sans': ['Kalameh', 'Tahoma', 'Arial', 'sans-serif'],
      },
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      }
    },
  },
  plugins: [],
};


