import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base must be './' for GitHub Pages to serve assets correctly from a subpath
  base: './',
  build: {
    // Output to 'docs' folder instead of 'dist' for GitHub Pages /docs configuration
    outDir: 'docs',
    emptyOutDir: true,
  }
});