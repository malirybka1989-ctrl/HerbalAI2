import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        earth: {
          50: "#faf5f0",
          100: "#f0e6d3",
          200: "#e0c9a8",
          300: "#d0ac7d",
          400: "#c08f52",
          500: "#a6753d",
          600: "#855e31",
          700: "#644725",
          800: "#433019",
          900: "#22180c",
        },
        moon: {
          50: "#f8f7ff",
          100: "#ebe8ff",
          200: "#d4ccff",
          300: "#b8a8ff",
          400: "#9c84ff",
          500: "#8060ff",
          600: "#6640d9",
          700: "#4c30b3",
          800: "#33208c",
          900: "#191066",
        },
        sunset: {
          50: "#fef2e8",
          100: "#fde0c5",
          200: "#fcc49e",
          300: "#fba877",
          400: "#fa8c50",
          500: "#e07040",
          600: "#b85830",
          700: "#904020",
          800: "#682810",
          900: "#401408",
        },
        foreground: "#1a1a2e",
        background: "#fafafa",
        muted: {
          DEFAULT: "#f1f5f9",
          foreground: "#64748b",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1a1a2e",
        },
        border: "#e2e8f0",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;