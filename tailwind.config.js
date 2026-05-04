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
          50:  '#fdf8ee',
          100: '#faecd4',
          200: '#f4d49a',
          300: '#ecb95a',
          400: '#e0972a',
          500: '#c97d1a',
          600: '#a86414',
          700: '#864e10',
          800: '#643a0c',
          900: '#4a2b09',
          950: '#2e1a05',
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
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up':  'fadeUp 0.55s ease both',
        'fade-in':  'fadeIn 0.45s ease both',
      },
    },
  },
  plugins: [],
}
