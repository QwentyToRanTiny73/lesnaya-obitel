import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          dark: "#1A3A2A",
          DEFAULT: "#2C5F2D",
          light: "#3D7A3E",
        },
        gold: {
          DEFAULT: "#C8963E",
          light: "#D4A853",
        },
        cream: "#F5F0E8",
        sand: "#E8DCC8",
      },
      fontFamily: {
        georgia: ["Georgia", "serif"],
        inter: ["Inter", "Calibri", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
