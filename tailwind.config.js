/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          500: '#ff6a00',
          400: '#ff8c00',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        fadeInLeft:  'fadeInLeft 0.9s ease forwards',
        fadeInRight: 'fadeInRight 0.9s ease forwards',
        float:       'float 4s ease-in-out infinite',
        glowPulse:   'glowPulse 3s ease-in-out infinite',
        slideDown:   'slideDown 0.6s ease forwards',
      },
    },
  },
  plugins: [],
};