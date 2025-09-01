/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2F80ED",   // Deep Blue
        secondary: "#56CCF2", // Light Blue
        success: "#27AE60",   // Green
        warning: "#F2994A",   // Orange
        danger: "#EB5757",    // Red
        neutral: {
          light: "#F9FAFB",
          dark: "#111827",
          medium: "#6B7280",
        },
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Lato", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem", 
      },
    },
  },
  plugins: [],
}