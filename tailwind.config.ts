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
        // Лес
        forest: {
          dark: "#1A3A2A",
          DEFAULT: "#2C5F2D",
          light: "#3D7A3E",
          moss: "#6B8E5A",   // мох
          sage: "#A4B79A",   // шалфей (пастельный)
        },
        // Винные оттенки
        wine: {
          gold: "#C8963E",     // золотистое (как было)
          amber: "#D4A853",    // янтарь
          rose: "#D9A6A6",     // розе
          rosedeep: "#B07572", // розе глубокое
          red: "#7A2E2E",      // красное (саперави)
          ruby: "#9C3838",     // рубиновое
          claret: "#5C1F1F",   // кларет
        },
        // Земля и камень
        earth: {
          beige: "#E8DCC8",   // бежевый
          sand: "#D9C9A8",    // песок
          clay: "#B89878",    // глина
          stone: "#8C7B68",   // камень
          cream: "#F5F0E8",   // кремовый
        },
        // Небо и море
        sky: {
          dawn: "#D9C7B8",    // рассвет (тёплый розово-бежевый)
          haze: "#B8C7CC",    // дымка
          day: "#7A9DAB",     // день
          dusk: "#4A6B7A",    // сумерки
        },
        // Старые алиасы — оставляем для совместимости
        gold: { DEFAULT: "#C8963E", light: "#D4A853" },
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
