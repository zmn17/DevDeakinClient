/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#b1d400",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        gruppo: ["Gruppo", "sans-serif"],
        silk: ["Silkscreen", "sans-serif"],
      },
      backgroundImage: {
        "home-bg": "url('./src/assets/bg1.webp')",
      },
    },
  },
  plugins: [],
};
