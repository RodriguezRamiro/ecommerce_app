//frontend/tailwind.config.cjs

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        keyframes: {
          fade: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
        },
        animation: {
          fade: 'fade 0.5s ease-in-out',
        },
      },
    },
    plugins: [],
  }
