/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0a0a0a",
        card: "rgba(255, 255, 255, 0.05)",
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(to bottom, rgba(0,0,0,0.4), #0a0a0a)",
      }
    },
  },
  plugins: [],
}
