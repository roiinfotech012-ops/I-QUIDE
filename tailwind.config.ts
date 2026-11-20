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
        navy: {
          DEFAULT: "#0B1D3A",
          light: "#142D57",
          dark: "#061124",
        },
        iris: {
          DEFAULT: "#1E4883",
          hover: "#163868",
          dark: "#132E57",
          light: "#EAF1FA",
        },
        intelligence: {
          DEFAULT: "#2B64B0",
          light: "#EBF4FF",
        },
        lavender: {
          DEFAULT: "#F0C32A",
          light: "#FEF8E3",
          soft: "#FDF6DC",
        },
        gold: {
          DEFAULT: "#F0C32A",
          hover: "#DDA914",
          light: "#FEF8E3",
        },
        "sky-intel": "#2B64B0",
        "sky-tint": "#EDF4FC",
        ice: {
          DEFAULT: "#EAF1FA",
          subtle: "#F4F8FD",
        },
        cloud: {
          DEFAULT: "#F8FAFD",
        },
        ink: {
          DEFAULT: "#0C1B33",
          secondary: "#4A5C78",
          muted: "#7A8BA6",
        },
        border: {
          DEFAULT: "#DCE5F2",
          dark: "#1B3561",
        },
        emerald: {
          success: "#16A085",
        },
      },
      fontFamily: {
        heading: ["var(--font-jakarta)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      borderRadius: {
        card: "20px",
        feature: "24px",
        hero: "28px",
        pill: "9999px",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(11, 29, 58, 0.04), 0 8px 24px -4px rgba(11, 29, 58, 0.05)",
        card: "0 2px 10px rgba(11, 29, 58, 0.04), 0 12px 30px -8px rgba(30, 72, 131, 0.08)",
        elevated: "0 4px 12px rgba(11, 29, 58, 0.06), 0 20px 48px -12px rgba(30, 72, 131, 0.14)",
        glow: "0 0 32px rgba(240, 195, 42, 0.30)",
        navy: "0 20px 50px -12px rgba(6, 17, 36, 0.55)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #1E4883 0%, #2B64B0 55%, #F0C32A 100%)",
        "gold-gradient": "linear-gradient(135deg, #F0C32A 0%, #F7D75C 100%)",
        "subtle-gradient": "linear-gradient(180deg, #F8FAFD 0%, #EAF1FA 100%)",
        "dark-gradient": "radial-gradient(ellipse at top right, rgba(240, 195, 42, 0.16), rgba(30, 72, 131, 0.28) 45%, rgba(11, 29, 58, 0) 75%)",
        "neural-grid": "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-node": {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.18)" },
        },
      },
      animation: {
        "float-slow": "float-slow 6s ease-in-out infinite",
        "pulse-node": "pulse-node 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
