import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fcfbf7",
        secondary: "#2d4a3e",
        accent: "#e67e22",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        sans: ["var(--font-body)"],
      }
    },
  },
  plugins: [],
};
export default config;