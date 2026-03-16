import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        surface: "#020617",
        accent: "#38bdf8",
        subtle: "#1e293b"
      }
    }
  },
  plugins: []
};

export default config;

