/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Nunito", "sans-serif"],
        custom1: ["Archivo Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
