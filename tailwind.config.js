/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
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
        lightGreen: '#DDF9FF',
        red: '#E65848',
        lightRed: '#E5B8B3',
        yellow: {
          100: '#FCEDD5',
          200: '#FFE5A3',
          300: '#FDE2B6',
          500: '#FCCD81',
        },
        light: '#FDFDFD',
        grey: '#DBDBDB',
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
    },
  },
  plugins: [],
};
