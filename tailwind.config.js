/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'ba-navy': {
          DEFAULT: '#075AAA',
          dark: '#001B44',
          darker: '#00113A',
        },
        'ba-red': {
          DEFAULT: '#EB262C',
          dark: '#C41E24',
        },
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 16px rgba(0, 27, 68, 0.12)',
        'card-hover': '0 12px 28px rgba(0, 27, 68, 0.2)',
      },
    },
  },
  plugins: [],
}
