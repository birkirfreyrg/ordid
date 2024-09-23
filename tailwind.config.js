/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "bounce-once": "bounceOnce 1s ease-out forwards", // Define the custom animation
      },
      keyframes: {
        bounceOnce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-25%)" },
        },
      },
    },
  },
  plugins: [],
};
