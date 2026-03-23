import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#f0f9ff",
        surface: "#ffffff",
        accent: "#0ea5e9"
      },
      fontFamily: {
        serif: ["var(--font-lora)", "Georgia", "serif"]
      },
      keyframes: {
        fadeSlideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        liquidGradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        liquidShift: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.95" }
        }
      },
      animation: {
        "fade-slide": "fadeSlideUp 0.7s ease-in-out forwards",
        "liquid": "liquidGradient 20s ease-in-out infinite"
      },
      backgroundSize: {
        "liquid": "200% 200%"
      }
    }
  },
  plugins: []
};

export default config;

