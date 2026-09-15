import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        cream: "#f8f4eb",
        ivory: "#fffdf7",
        sage: {
          50: "#fbf4ed",
          100: "#f2dfd3",
          300: "#d6a18c",
          500: "#9f4a3e",
          700: "#6f2d2a",
          900: "#281a18"
        },
        gold: "#b4975a",
        rose: "#a63a32",
        batak: {
          red: "#8d2f2b",
          deep: "#4f1f1e",
          ink: "#181312",
          sand: "#d8bd8a"
        }
      },
      fontFamily: {
        sans: ["var(--font-jost)", "sans-serif"],
        serif: ["var(--font-cormorant)", "serif"]
      },
      boxShadow: {
        soft: "0 20px 55px rgba(74, 83, 67, 0.12)"
      },
      backgroundImage: {
        grain: "url('/images/grain.svg')",
        gorga: "url('/images/gorga-pattern.svg')"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
