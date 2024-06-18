/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "c-100": "black",
        "c-200": "white",
        "c-300": "gray",
      },
      animation: {
        levitate: "levitate 3s ease-in-out infinite",
      },
      keyframes: {
        levitate: {
          "0%": { transform: "translateY(10%)" },
          "50%": { transform: "translateY(-10%)" },
          "100%": { transform: "translateY(10%)" },
        },
      },
    },
  },
  plugins: [],
};
