import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        surface: "rgb(var(--color-bg-secondary) / <alpha-value>)",
        border: "rgb(var(--color-border-default) / <alpha-value>)",
        borderHover: "rgb(var(--color-border-hover) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        textSecondary: "rgb(var(--color-text-secondary) / <alpha-value>)",
        textMuted: "rgb(var(--color-text-muted) / <alpha-value>)",
      },
      fontFamily: {
        sans: [
          "system-ui",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        elev1: "var(--shadow-elev-1)",
      },
    },
  },
  plugins: [],
};
export default config;
