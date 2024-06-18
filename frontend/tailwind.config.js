/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "c-100": "#7FBBF1",
        "c-200": "#36322C",
        "c-300": "#A8AB9D",
      },
    },
  },
  plugins: [],
};
