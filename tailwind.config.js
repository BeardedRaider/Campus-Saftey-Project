/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandNavy: "#0A0F1F",
        brandNavyLight: "#0D1226",
        neonCyan: "#00E5FF",
        neonCyanSoft: "rgba(0, 229, 255, 0.4)",
        neonPurple: "#B388FF",
        neonYellow: "#FFE066",
      },
      boxShadow: {
        neon: "0 0 10px rgba(0, 229, 255, 0.6)",
        neonSoft: "0 0 6px rgba(0, 229, 255, 0.3)",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(180deg, #0A0F1F 0%, #0D1226 100%)",
      },
      borderRadius: {
        card: "14px",
      },
    },
  },
  plugins: [],
};
