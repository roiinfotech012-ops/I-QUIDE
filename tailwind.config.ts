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
          DEFAULT: "#0B1026",
          light: "#131B3A",
          dark: "#060917",
        },
        iris: {
          DEFAULT: "#635BFF",
          hover: "#5249F5",
          light: "#EBE9FF",
        },
        intelligence: {
          DEFAULT: "#387BFA",
          light: "#EBF2FF",
        },
        lavender: {
          DEFAULT: "#A78BFA",
          light: "#F3EFFE",
        },
        ice: {
          DEFAULT: "#EAF5FF",
          subtle: "#F3F9FF",
        },
        cloud: {
          DEFAULT: "#FAFBFF",
        },
        ink: {
          DEFAULT: "#101428",
          secondary: "#626A80",
          muted: "#8C95AA",
        },
        border: {
          DEFAULT: "#E5EAF4",
          dark: "#1E2749",
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
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(11, 16, 38, 0.03), 0 8px 24px -4px rgba(11, 16, 38, 0.04)",
        elevated: "0 4px 12px rgba(11, 16, 38, 0.05), 0 20px 48px -12px rgba(99, 91, 255, 0.10)",
        glow: "0 0 32px rgba(99, 91, 255, 0.28)",
        navy: "0 20px 50px -12px rgba(6, 9, 23, 0.55)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #635BFF 0%, #387BFA 55%, #A78BFA 100%)",
        "subtle-gradient": "linear-gradient(180deg, #FAFBFF 0%, #EAF5FF 100%)",
        "dark-gradient": "radial-gradient(ellipse at top right, rgba(99, 91, 255, 0.22), rgba(56, 123, 250, 0.08) 45%, rgba(11, 16, 38, 0) 75%)",
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
