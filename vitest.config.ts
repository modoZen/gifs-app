import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // permite usar describe, it, expect sin importarlos
    environment: "jsdom", // simula un navegador para probar componentes React
    setupFiles: "./src/setupTest.ts", // configuración global (opcional)
  },
});
