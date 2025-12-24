import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// ==========================================
// 🌐 CONFIGURATION: YOUR DOMAIN NAME
// ==========================================
const DOMAIN = 'binx.productions'; 
// ==========================================

// Custom plugin to generate CNAME after build
const cnamePlugin = () => {
  return {
    name: 'generate-cname',
    closeBundle() {
      const outDir = 'docs';
      const cnamePath = path.resolve(outDir, 'CNAME');
      
      try {
        // Ensure directory exists (it should, but just in case)
        if (!fs.existsSync(outDir)){
            fs.mkdirSync(outDir, { recursive: true });
        }
        fs.writeFileSync(cnamePath, DOMAIN);
        console.log(`\n\x1b[36m[BINX DNS]\x1b[0m CNAME generated for: ${DOMAIN}`);
      } catch (error) {
        console.error(`\x1b[31m[ERROR]\x1b[0m Failed to create CNAME:`, error);
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cnamePlugin()
  ],
  // Base must be './' for GitHub Pages to serve assets correctly from a subpath
  base: './',
  build: {
    // Output to 'docs' folder instead of 'dist' for GitHub Pages /docs configuration
    outDir: 'docs',
    emptyOutDir: true,
  }
});