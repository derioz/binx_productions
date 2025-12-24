import fs from 'fs';

// ==========================================
// 🌐 CONFIGURATION: YOUR DOMAIN NAME
// ==========================================
const DOMAIN = 'binx.productions'; // <--- CHANGE THIS to your purchased domain
// ==========================================

const OUTPUT_FILE = './docs/CNAME';

function generateCNAME() {
  console.log(`\x1b[36m[BINX DNS]\x1b[0m Generating CNAME file...`);

  try {
    // Ensure the output directory exists (Vite should have created it)
    if (!fs.existsSync('./docs')) {
        fs.mkdirSync('./docs');
    }

    // Write the domain to the CNAME file (required by GitHub Pages)
    fs.writeFileSync(OUTPUT_FILE, DOMAIN);
    
    console.log(`\x1b[32m[SUCCESS]\x1b[0m CNAME created for: ${DOMAIN}`);
  } catch (e) {
    console.log(`\x1b[31m[ERROR]\x1b[0m Failed to create CNAME:`, e);
    process.exit(1);
  }
}

generateCNAME();