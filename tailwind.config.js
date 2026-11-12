/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { ice: "#b8e5f3", steel: "#5e86a6", ink: "#07111d" },
    boxShadow: { soft: "0 20px 60px rgba(0,0,0,.18)" }
  }},
  plugins: []
};
