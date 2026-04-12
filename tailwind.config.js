/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#1a3a52',
          950: '#102a43',
        },
        gold: {
          50: '#fdf8e8',
          100: '#faefc5',
          200: '#f5e08e',
          300: '#eecb4d',
          400: '#e6b822',
          500: '#d4af37',
          600: '#b8922a',
          700: '#936e24',
          800: '#7a5a24',
          900: '#684a24',
          950: '#3d2a12',
        },
        copper: {
          400: '#cd8e54',
          500: '#b87333',
          600: '#a05e28',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Lato', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
