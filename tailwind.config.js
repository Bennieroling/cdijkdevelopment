/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",],
  theme: {
    extend: {
      colors: {
        "main-background": "#fcf9f8",
        primary: "#35978f",
        secondary:'#bce6e2'
      },
      glass: {
        background: "rgba(255, 255, 255, 0.1)",
        "box-shadow": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "backdrop-filter": "blur(3.5px)",
        "-webkit-backdrop-filter": "blur(3.5px)",
        "border-radius": "10px",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["glass"],
      boxShadow: ["glass"],
    },
  },
  plugins: [],
};
