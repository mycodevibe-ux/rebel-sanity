import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
      fontSize: {
        "rebel-hero": ["84px", { lineHeight: "94px", fontWeight: "700" }],
        "rebel-heading-big": ["56px", { lineHeight: "68px", fontWeight: "600" }],
        "rebel-h2": ["42px", { lineHeight: "52px", fontWeight: "600" }],
        "rebel-card-title": ["22px", { lineHeight: "30px", fontWeight: "600" }],
        "rebel-body": ["15px", { lineHeight: "26px", fontWeight: "400" }],
        "rebel-small": ["13px", { lineHeight: "22px", fontWeight: "400" }],
        "rebel-nav": ["15px", { lineHeight: "22px", fontWeight: "500" }],
      },
      colors: {
        "rebel-black": "#000000",
        "rebel-white": "#FFFFFF",
        "rebel-scrim": "rgba(18, 11, 11, 0.51)",
        "rebel-gray-body": "#6c6c6c",
        "rebel-gray-dark": "#555555",
        "rebel-gray-placeholder": "#9b9b9b",
        "rebel-gray-border": "#cbcaca",
        "rebel-gray-light": "#dfdfdf",
        "rebel-gray-lighter": "#cfcfcf",
        "rebel-gray-lightest": "#dcdcdc",
        "rebel-gray-card": "#ececec",
      },
      borderRadius: {
        "rebel-card": "16px",
        "rebel-button": "9999px",
        "rebel-pill": "9999px",
      },
      boxShadow: {
        "rebel-card": "0px 5px 20px rgba(0, 0, 0, 0.08)",
        "rebel-search": "0px 20px 35px rgba(0, 0, 0, 0.25)",
        "rebel-hero-text": "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
      maxWidth: {
        "rebel-desktop": "1280px",
        "rebel-content": "1240px",
      },
    },
  },
  plugins: [],
};
export default config;
