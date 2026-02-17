import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: "#F2F0E9",
        ink: "#1C1C1C",
        "med-teal": "#2B4C59",
        "med-teal-light": "#3E6B7D",
        "retro-orange": "#D65A31",
        "retro-orange-light": "#E87A54",
        mustard: "#E6AF2E",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        tech: ['"Space Grotesk"', "sans-serif"],
        sans: ['"Inter"', "sans-serif"],
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 1s ease-out forwards",
        slideDown: "slideDown 0.2s ease-out",
        fadeIn: "fadeIn 0.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
