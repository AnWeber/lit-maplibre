// eslint-disable-next-line spaced-comment
/// <reference types="vitest" />

import { defineConfig } from "vite";

import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [
    eslint({
      failOnWarning: false,
      failOnError: false,
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
    },
  },
  build: {
    target: "esnext",
    copyPublicDir: false,
  },
  test: {
    environment: "jsdom",
  },
});
