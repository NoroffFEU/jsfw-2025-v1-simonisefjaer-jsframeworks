import { defineConfig } from 'vitest/config'
import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    // READMORE: https://testing-library.com/docs/react-testing-library/setup#auto-cleanup-in-vitest
    globals: true, // Allows using describe, it, expect, etc., globally without imports
    environment: "jsdom", // Use JSDOM for DOM simulation
    setupFiles: ["./vitest-setup.ts"],
    css: true, // If you want to process CSS (e.g., for CSS Modules)
    // Define values that can be accessed inside your tests using inject method.
    // READMORE: https://vitest.dev/config/provide.html#provide
    // provide: {
    //   API_KEY: "123",
    // },
  },
})
