import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/src", // Ensure the base path is correct
  build: {
    outDir: "dist", // Output directory for Vite's build
    emptyOutDir: true,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001/", // Local backend proxy for development
        changeOrigin: true,
        secure: false,
      },
    },
  },
}); // end of file
