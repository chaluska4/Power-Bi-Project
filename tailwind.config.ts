import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0B2545",
        page: "#EDF1F6",
        line: "#E2E8F0",
        ink: "#0B2545",
        muted: "#475569",
        teal: "#0F766E",
        pfizer: "#C2410C",
        moderna: "#7C3AED",
        merck: "#0F766E",
        sanofi: "#2563EB",
        gsk: "#64748B",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-inter-tight)", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11, 37, 69, 0.05), 0 12px 32px rgba(11, 37, 69, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
