/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        Inria: 'Inria serif, system-iu, serif'
      },
      colors: {
        itemBg: '#202020',
        itemBgHover: '#333333',
        primary: '#D9A1E7',
        secondary: '#C372D7'
      }
    }
  },
  plugins: []
}
