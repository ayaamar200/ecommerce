/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        "main-color": "#8B5E35",
        "second-color": "#9B7E5C",
        color: "#090F41",
        "2nd-color": "#9D9DAA",
        "sec-color": "#F6F6F6",

        error: "#FFC000",
        footer: "#2E2E2E",
      },
      spacing: {
        sec: "85%",
      },
      fontFamily: {
        display: "'Poppins', serif", // Adds a new `font-display` class
      },
      fontSize: {
        H1: "24px",
        H2: "22px",
        regular: "15px",
        caption: "12px",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [require("flowbite/plugin")],
};
