const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      rotate: {
        135: "135deg",
      },
      colors: {
        darkPrimary: '#252525',
        lightPrimary: '#F5F5F5',
        greenAccent: '#1ED760',
        grayAccent: "#7D7D7D",
        darkGrayAccent: "#3F3F3F",
        transparentDarkGray: "rgba(63, 63, 63, 0.5)",
      },
      fontSize:{
        '2.5xl': '1.75rem',
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        serif: ["var(--font-serif)", ...fontFamily.serif],
      },
      inset: {
        "unset": "unset",
      },
     
  },
  plugins: [],
}};
