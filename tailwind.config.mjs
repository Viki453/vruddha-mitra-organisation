// tailwind.config.mjs
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [import("daisyui")],
  daisyui: {
    themes: ["light"],
    logs: true,
    prefix: "",
  },
};
