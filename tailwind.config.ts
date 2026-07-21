import type { Config } from "tailwindcss";

// Tailwind CSS 4 is CSS-first: design tokens (colors, fonts, etc.) are defined
// via `@theme` in app/globals.css. This file exists for editor tooling,
// content-path awareness, and any future JS-level plugin configuration.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./emails/**/*.{ts,tsx}",
  ],
  darkMode: "class",
};

export default config;
