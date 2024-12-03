import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        background: "var(--background)",  // Using CSS variables for dynamic theming
        foreground: "var(--foreground)",  // You can define these variables in your global styles
        'dark-bg': '#121212',             // Custom color for dark background
        'light-bg': '#f9f9f9',            // Custom color for light background
      },
    },
  },
  plugins: [],
} satisfies Config;