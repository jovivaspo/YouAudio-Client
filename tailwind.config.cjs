/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Roboto",
    },
    extend: {
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
