import fs from 'fs';
import path from 'path';

// CONFIGURATION
const GALLERY_DIR = './public/gallery';
const REGISTRY_FILE = './data/photoRegistry.ts';
const VALID_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// LOGGING AESTHETICS
const log = (msg) => console.log(`\x1b[36m[BINX AUTO-SCAN]\x1b[0m ${msg}`);
const success = (msg) => console.log(`\x1b[32m[SUCCESS]\x1b[0m ${msg}`);
const error = (msg) => console.log(`\x1b[31m[ERROR]\x1b[0m ${msg}`);

async function scanGallery() {
  log("Initializing darkroom scan...");

  // 1. Check if gallery folder exists
  if (!fs.existsSync(GALLERY_DIR)) {
    // Try to create it if it doesn't exist
    try {
      fs.mkdirSync(GALLERY_DIR, { recursive: true });
      log(`Created directory: ${GALLERY_DIR}`);
    } catch (e) {
      error(`Could not find or create ${GALLERY_DIR}`);
      return;
    }
  }

  // 2. Read files
  const files = fs.readdirSync(GALLERY_DIR);
  
  // 3. Filter for images
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return VALID_EXTENSIONS.includes(ext);
  });

  if (imageFiles.length === 0) {
    log("No images found in public/gallery. Add some photos first!");
    return;
  }

  log(`Found ${imageFiles.length} images ready for processing.`);

  // 4. Read the Target File
  let content;
  try {
    content = fs.readFileSync(REGISTRY_FILE, 'utf-8');
  } catch (e) {
    error(`Could not read ${REGISTRY_FILE}. Make sure the file exists.`);
    return;
  }

  // 5. Generate the new Array String
  // We format it nicely with indentation
  const fileListString = imageFiles.map(f => `  '${f}'`).join(',\n');
  const newArrayBlock = `const GALLERY_FILES: string[] = [\n${fileListString},\n];`;

  // 6. Regex Replacement
  // This finds "const GALLERY_FILES: string[] = [ ... ];" and replaces it
  const regex = /const GALLERY_FILES: string\[\] = \[([\s\S]*?)\];/;

  if (!regex.test(content)) {
    error("Could not find the GALLERY_FILES array in the registry file. Check the syntax.");
    return;
  }

  const newContent = content.replace(regex, newArrayBlock);

  // 7. Write back to file
  fs.writeFileSync(REGISTRY_FILE, newContent, 'utf-8');

  success(`Registry updated! ${imageFiles.length} photos are now live.`);
  console.log(`\n\x1b[33mREMINDER:\x1b[0m Ensure your filenames follow the format: \nPhotographer_Category_Session-Name_Title.jpg\n`);
}

scanGallery();