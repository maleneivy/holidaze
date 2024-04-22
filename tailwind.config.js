/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1B8185',
        'blue': '#1B5185', 
        'darkBlue': '#37405B',
        'lightGreen': '#DDF9FF', 
        'red': '#E65848',
        'lightRed': '#E5B8B3', 
        'yellow': {
          100: '#FCEDD5',
          300: '#FDE2B6',
          500: '#FCCD81',
        },
        'light': '#FDFDFD',
        'grey': '#DBDBDB', 
        'lightBlueGrey': '#E5E9ED'
      }
    },
  },
  plugins: [],
};
