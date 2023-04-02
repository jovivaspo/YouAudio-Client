/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Roboto",
    },
    extend: {
      keyframes: {
        move: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-50%)" },
          "50%": { transform: "translateX(-100%)" },
          "75%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      colors: {
        dark: "#0f0f0f",
      },
      gridTemplateColumns: {
        md: "[index] 16px [first] 6fr [var1] 4fr [var2] 3fr [last] minmax(120px,1fr)",
        xs: "[index] 16px [first] auto",
      },
    },
  },
  plugins: [],
};
