import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        brand: {
          bg: "#0a0a0a",
          red: "#E8352A",
        },
        ftt: {
          black: "#050505",
          "black-2": "#0a0a0a",
          "black-3": "#0c0c0c",
          "black-4": "#131313",
          red: "#E8352A",
          "red-deep": "#c62920",
          "red-dark": "#7a1a14",
          green: "#3BF59C",
          yellow: "#F2F425",
          cream: "#F5F1EA",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        sans: ["var(--font-dm)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 38s linear infinite",
      },
      maxWidth: {
        ftt: "1320px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
