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
        accent: "#0ea5e9",
        subtle: "#64748b"
      }
    }
  },
  plugins: []
};

export default config;

