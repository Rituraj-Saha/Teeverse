import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const repositoryName = "Teeverse";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${repositoryName}/`,
  build: {
    outDir: "dist",
  },
});
