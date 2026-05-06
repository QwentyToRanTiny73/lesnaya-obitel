import type { Config } from "tailwindcss";

/**
 * Лесная Обитель · Design System
 * Pantone-inspired лесная пастельная палитра + винные акценты.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Pantone-inspired primary system ──────────────
        moss:    { DEFAULT: "#7A8B6E", 50: "#F2F4EE", 100: "#E5E9DC", 300: "#B8C2A8", 500: "#7A8B6E", 700: "#586850", 900: "#384032" },
        sage:    { DEFAULT: "#9CAF88", 100: "#EAEFE2", 300: "#C2D2B0", 500: "#9CAF88", 700: "#778A66" },
        pforest: { DEFAULT: "#B8C5B0", 100: "#EFF1EB", 500: "#B8C5B0" },  // pastel forest
        beige:   { DEFAULT: "#C4B5A0", 100: "#F0EBDF", 300: "#D9CDB6", 500: "#C4B5A0", 700: "#9D8E78" },
        cream:   { DEFAULT: "#F7F5F0", 50: "#FCFBF8", 100: "#F7F5F0", 200: "#EFEBE0" },
        surface: { DEFAULT: "#E8E4D9", 100: "#F0EDE3" },

        // ── Wine accents ─────────────────────────────────
        wine: {
          gold:     "#C8963E",
          amber:    "#D4A853",
          rose:     "#D9A6A6",
          rosedeep: "#B07572",
          red:      "#7A2E2E",
          ruby:     "#9C3838",
          claret:   "#5C1F1F",
        },

        // ── Sky tones ────────────────────────────────────
        sky: {
          dawn: "#D9C7B8",
          haze: "#B8C7CC",
          day:  "#7A9DAB",
          dusk: "#4A6B7A",
        },

        // ── Text & semantic ──────────────────────────────
        ink:     { DEFAULT: "#3D3D3D", soft: "#6B6B6B", mute: "#9A9A9A" },
        success: "#8FA88A",
        warning: "#D4C5A5",
        error:   "#B07572",

        // ── Совместимость с предыдущей тёмной темой ──────
        forest: {
          dark: "#1A3A2A",
          DEFAULT: "#2C5F2D",
          light: "#3D7A3E",
          moss: "#6B8E5A",
          sage: "#A4B79A",
        },
        gold: { DEFAULT: "#C8963E", light: "#D4A853" },
        sand: "#E8DCC8",
        earth: {
          beige: "#E8DCC8",
          sand:  "#D9C9A8",
          clay:  "#B89878",
          stone: "#8C7B68",
          cream: "#F7F5F0",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],     // заголовки
        text:    ['"Inter"', "Calibri", "sans-serif"],            // тело
        accent:  ['"Cormorant Garamond"', "Georgia", "serif"],    // курсивные акценты
        georgia: ["Georgia", "serif"],                            // legacy
        inter:   ['"Inter"', "Calibri", "sans-serif"],            // legacy
      },
      fontSize: {
        // 8-pt rhythm с консистентным line-height
        "display-1": ["72px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-2": ["56px", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
        "h1":        ["40px", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "h2":        ["32px", { lineHeight: "1.2"  }],
        "h3":        ["24px", { lineHeight: "1.3"  }],
        "h4":        ["20px", { lineHeight: "1.4"  }],
        "body-lg":   ["18px", { lineHeight: "1.6"  }],
        "body":      ["16px", { lineHeight: "1.6"  }],
        "body-sm":   ["14px", { lineHeight: "1.55" }],
        "caption":   ["12px", { lineHeight: "1.5"  }],
        "overline":  ["11px", { lineHeight: "1.4", letterSpacing: "0.18em" }],
      },
      spacing: {
        // 8-pt grid
        "px-2": "2px",
        "px-3": "3px",
      },
      borderRadius: {
        sm: "8px",     // кнопки
        md: "12px",    // карточки
        lg: "16px",
        pill: "999px", // chips / tags
      },
      boxShadow: {
        soft:    "0 1px 2px rgba(60,55,40,0.04), 0 2px 8px rgba(60,55,40,0.06)",
        nature:  "0 6px 16px rgba(122,139,110,0.10), 0 2px 4px rgba(122,139,110,0.06)",
        elev:    "0 12px 28px rgba(60,55,40,0.10)",
        focus:   "0 0 0 3px rgba(122,139,110,0.35)",
      },
      backgroundImage: {
        "gradient-moss":  "linear-gradient(135deg, #7A8B6E 0%, #9CAF88 100%)",
        "gradient-cream": "linear-gradient(180deg, #FCFBF8 0%, #E8E4D9 100%)",
        "gradient-wine":  "linear-gradient(135deg, #C8963E 0%, #D4A853 50%, #D9A6A6 100%)",
      },
      transitionTimingFunction: {
        natural: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        "200": "200ms",
        "300": "300ms",
        "400": "400ms",
      },
      keyframes: {
        leaf: {
          "0%, 100%": { transform: "rotate(-8deg) translateY(0)" },
          "50%":      { transform: "rotate(8deg) translateY(-4px)" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        leaf:    "leaf 3s ease-in-out infinite",
        "fade-up": "fadeUp 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};
export default config;
