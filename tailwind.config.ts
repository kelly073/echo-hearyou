import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#e0f2fe",
        surface: "#ffffff",
        accent: "#0ea5e9",
        grass: "#86efac",
        sunshine: "#fef9c3",
        sky: "#38bdf8"
      }
    }
  },
  plugins: []
};

export default config;

