/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
],
    theme: {
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '19.5px'],
        lg: ['18px', '21.94px'],
        xl: ['20px', '24.38px'],
        '2xl': ['24px', '29.26px'],
        '3xl': ['28px', '50px'],
        '4xl': ['48px', '58px'],
        '8xl': ['96px', '106px']
      },
      extend: {
        fontFamily: {
          montserrat: ['Montserrat', 'sans-serif'],
        },
        colors: {
          'main':'#47325B',
          'light-main':'#735184',
          'main-gray':'#D6D6D680',
          'main-light-gray':'#646262',
          'main-text':'#A5A5A5',
          'purple-text':'#453156'
        },
      }
  },
  plugins: [],
}

