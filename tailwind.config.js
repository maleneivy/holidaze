/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontSize: {
        '2xl': '22px',
        '3xl': '25px',
        '4xl': '30px',
        '5xl': '35px',
      },
      maxWidth: {
        custom: '1290px',
      },
      spacing: {
        128: '32rem',
      },
      borderRadius: {
        rounded: '9px',
      },
      colors: {
        primary: '#1B8185',
        blue: '#1B5185',
        darkBlue: '#37405B',
        lightGreen: '#BAFFEF',
        red: '#E65848',
        lightRed: '#E5B8B3',
        creme: '#FFFCF5',
        yellow: {
          100: '#FCEDD5',
          200: '#FFE5A3',
          300: '#FDE2B6',
          500: '#FCCD81',
        },
        light: '#FDFDFD',
        grey: '#DBDBDB',
        darkGrey: '#989898',
        lightBlueGrey: '#E5E9ED',
        inputText: '#647381',
      },
      backgroundImage: {
        gradientYellow: 'linear-gradient(360deg, #FCEDD5, #FCCD81)',
      },
      fontFamily: {
        sans: ['ff-scala-sans-pro', 'sans-serif'],
        serif: ['arek', 'serif'],
      },
      keyframes: {
        spinScale: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': {
            transform: 'rotate(360deg) scale(1.3)',
          },
          '100%': { transform: 'rotate(720deg) scale(1)' },
        },
      },
      animation: {
        spinScale: 'spinScale 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
