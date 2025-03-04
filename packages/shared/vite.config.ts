/// <reference types="node" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "VumiShared",
      fileName: (format) => `vumi-shared.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "ui"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          ui: "UI",
        },
      },
    },
  },
  server: {
    port: 5173,
  },
});
