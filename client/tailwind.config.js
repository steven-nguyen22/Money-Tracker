/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green1: "#344e41",
        green2: "#3a5a40",
        green3: "#588157",
        green4: "#a3b18a",
        gray1: "#dad7cd",
        black: "#000000",
        white: "#FFFFFF",
        blue: "#0000FF",
        backgroundExtend: "#346A4B",
      },
      fontFamily: {
        display: "Oswald, ui-serif", // Adds a new `font-display` class
      },
      backgroundImage: {
        background1: "url('/src/assets/background1.svg')",
      },
    },
  },
  plugins: [],
};
