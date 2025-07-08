import path from "node:path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron";

export default defineConfig({
  resolve: {
    alias: {
      events: "events",
      "@": path.resolve(__dirname, "./renderer"),
      "@pages": path.resolve(__dirname, "./renderer/pages"),
      "@components": path.resolve(__dirname, "./renderer/components"),
      "@hooks": path.resolve(__dirname, "./renderer/hooks"),
      "@context": path.resolve(__dirname, "./renderer/context"),
      "@layout": path.resolve(__dirname, "./renderer/layout"),
      "@routes": path.resolve(__dirname, "./renderer/routes"),
      "@assets": path.resolve(__dirname, "./renderer/assets"),
      "@types": path.resolve(__dirname, "./renderer/types"),
      "@uds": path.resolve(__dirname, "./uds"),
      "@build": path.resolve(__dirname, "./build"),
      "@root": path.resolve(__dirname, "."),
    },
  },
  plugins: [
    react(),
    electron([
      {
        entry: "electron/main.ts",
        vite: {
          build: {
            outDir: "dist-electron",
            minify: false,
          },
        },
        onstart(options) {
          options.startup();
        },
      },
      {
        entry: "electron/preload.ts",
        vite: {
          build: {
            outDir: "dist-electron",
            minify: false,
          },
        },
      },
    ]),
    nodeResolve({
      preferBuiltins: true,
    }),
  ],
  build: {
    outDir: "dist-electron",
    rollupOptions: {
      output: {
        format: "es",
      },
    },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
});
