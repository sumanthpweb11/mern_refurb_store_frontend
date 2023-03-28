/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E21818",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
