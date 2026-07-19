/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1B3A6B',
          dark: '#122A50',
          light: '#2B4E85',
        },
        // Note: token kept as "gold" for minimal refactor, but now maps to
        // Dubai Chamber's actual maroon/red accent (#A6192E), not gold.
        gold: {
          DEFAULT: '#A6192E',
          light: '#C22B42',
          dark: '#7E1122',
        },
        panel: '#EEF2F5',
      },
      backgroundImage: {
        'navy-maroon-gradient': 'linear-gradient(135deg, #1B3A6B 0%, #4A2456 55%, #A6192E 100%)',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
