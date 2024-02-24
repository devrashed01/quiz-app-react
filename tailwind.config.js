/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#497cea',
          200: '#4076e9',
        },
      },
    },
  },
  plugins: [],
};
