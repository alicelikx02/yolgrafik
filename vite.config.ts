import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { inspectAttr } from "kimi-plugin-inspect-react";

// yolgrafik.com (kök domain) için ayar
export default defineConfig({
  base: "/", // ✅ kökte çalışır (https://yolgrafik.com/)
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});