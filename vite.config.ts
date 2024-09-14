/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  define: {
    exclude: ["**/node_modules/**"],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setup-vitest.ts"],
  },
});
