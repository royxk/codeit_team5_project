import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        black: "#111322",
        "gray-50": "#7D7986",
        "gray-40": "#A4A1AA",
        "gray-30": "#CBC9CF",
        "gray-20": "#E5E4E7",
        "gray-10": "#F2F2F3",
        "gray-5": "#FAFAFA",
        white: "#FFFFFF",
        "red-40": "#FF4040",
        "red-30": "#FF8D72",
        "red-20": "#FFAF9B",
        "red-10": "#FFEBE7",
        "blue-20": "#0080FF",
        "blue-10": "#CCE6FF",
        "green-20": "#20A81E",
        "green-10": "#D4F7D4",
        kakao: "#FEE500",
      },
    },
    screens: {
      pc: { raw: "(min-width: 1920px)" },
      tab: { raw: "(max-width: 744px)" },
      mob: { raw: "(max-width: 375px)" },
    },
  },
  plugins: [],
};
export default config;
