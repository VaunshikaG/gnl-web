/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#CB202D',      // themeColor
          bg1: '#121212',          // background_1
          bg2: '#1E1E1E',          // background_2
          bg3: '#444444',          // background_3
          text1: '#1C1C1C',        // text_1
          textSec: '#B3B3B3',      // secondaryText_1
          textDis: '#7A7A7A',      // disabledText_1
          border: '#2C2C2C',       // borderLines
          shadow: '#3D3D3D',       // shadowColor
          hover1: '#FF4C77',       // hoverColor_1
          hover2: '#FFD6DF',       // hoverColor_2
          glow: '#FF748E',         // glowColor
          success: '#00C352',      // green
          warning: '#FFAE00',      // orange
          danger: '#CB202D',       // red
        }
      },
      spacing: {
        '15': '3.75rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
      },
      fontSize: {
        '2xs': '0.6875rem',
      },
      boxShadow: {
        'brand': '0 4px 6px rgba(0, 0, 0, 0.3)',
        'brand-lg': '0 10px 20px rgba(0, 0, 0, 0.4)',
      },
      opacity: {
        '15': '0.15',
        '35': '0.35',
      },
    },
  },
  plugins: [],
}
