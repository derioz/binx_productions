// BINX PRODUCTIONS PHOTO REGISTRY
// ------------------------------------------------------------------
// PHOTO REGISTRY
// ------------------------------------------------------------------

export interface PhotoData {
  id: string;
  url: string;
  filename: string;
  photographer: string;
  category: string;
  session: string;
  title: string;
  featured: boolean;
  size: 'small' | 'medium' | 'large';
  description?: string;
}

// ==================================================================
// 0. PLACEHOLDER GENERATOR (The "Darkroom" Engine)
// Generates cinematic gradient placeholders with texture.
// ==================================================================
const createPlaceholder = (text: string, colorStart: string, colorEnd: string) => {
  // SVG Construction
  // 1. Linear Gradient: Creates the mood.
  // 2. Pattern: Adds subtle 'scanline' texture for realism.
  // 3. Text: Centered, Oswald font, uppercase.
  const svg = `
  <svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad-${text.replace(/\s/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${colorStart};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${colorEnd};stop-opacity:1" />
      </linearGradient>
      <pattern id="pat" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="100%" height="100%" fill="transparent"/>
        <path d="M0 4L4 0" stroke="white" stroke-width="1" stroke-opacity="0.08"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad-${text.replace(/\s/g, '')})" />
    <rect width="100%" height="100%" fill="url(#pat)" />
    <rect width="100%" height="100%" fill="black" fill-opacity="0.2" />
    
    <!-- Inner Border Frame -->
    <rect x="40" y="40" width="1120" height="720" fill="none" stroke="white" stroke-width="2" stroke-opacity="0.1" />

    <text x="50%" y="50%" font-family="Oswald, sans-serif" font-size="64" font-weight="700" fill="white" dy=".3em" text-anchor="middle" letter-spacing="0.2em" style="text-transform:uppercase; text-shadow: 0 4px 20px rgba(0,0,0,0.5)">${text}</text>
  </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// ==================================================================
// 1. GALLERY FILES
// To add photos, upload them to your 'public/gallery' folder and add 
// their filenames here.
// ==================================================================
const GALLERY_FILES: string[] = [
  'Callum_Portraits_Jimmy-Streets_Gangster.png',
  'Damon_Cars_Damons-Car_Damon-Close-Up.png',
  'Damon_Cars_Damons-Car_Damon-Fish-Eye.png',
  'Damon_Cars_Damons-Car_Damon-Forward.png',
  'Damon_Cars_Damons-Car_Damon-Side-View.png',
  'Damon_Cars_Damons-Car_Damons-Car-Left.png',
  'Damon_Cars_Winter-Drifting_Damon-n-Mits.png',
  'Damon_Cars_Winter-Drifting_Dump-Truck.png',
  'Damon_Cars_Winter-Drifting_Side Stance.png',
  'Damon_Cars_Winter-Drifting_Side-View.png',
  'Damon_Cars_Winter-Drifting_Stance.png',
  'Marianna_Portraits_Family-and-Friends_Redacted.png',
  'Marianna_Portraits_Family-and-Friends_Streets-and-Marianna.png',
];

// ==================================================================
// 2. PARSING LOGIC
// ==================================================================
const processFilename = (filename: string, index: number): PhotoData => {
  const cleanName = filename.substring(0, filename.lastIndexOf('.'));
  const parts = cleanName.split('_');

  const photographer = parts[0] ? parts[0].replace(/-/g, ' ') : 'Binx';
  const category = parts[1] ? parts[1].replace(/-/g, ' ') : 'Portfolio';
  const session = parts[2] ? parts[2].replace(/-/g, ' ') : 'General';
  const title = parts[3] ? parts[3].replace(/-/g, ' ') : 'Untitled';

  return {
    id: `local-${index}`,
    url: `./gallery/${filename}`, 
    filename: filename,
    photographer: photographer,
    category: category,
    session: session,
    title: title,
    featured: true,
    size: 'medium',
    description: `Captured by ${photographer} for the ${session} session.`
  };
};

const localPhotos = GALLERY_FILES.map((f, i) => processFilename(f, i));

// ==================================================================
// 3. SAMPLE DATA (FALLBACK WITH GRADIENTS)
// Colors chosen to match the category "vibe".
// ==================================================================
const SAMPLE_IMAGES: PhotoData[] = [
  {
    id: 'sample-1',
    // Red -> Dark Red (Aggressive/Automotive)
    url: createPlaceholder('Mustang Red', '#7f1d1d', '#ef4444'), 
    filename: 'sample-1.jpg',
    title: 'Mustang Red',
    category: 'Automotive',
    photographer: 'Amy',
    session: 'Muscle Cars',
    size: 'large',
    featured: true,
    description: 'Raw horsepower meets the golden hour. A study in American muscle.'
  },
  {
    id: 'sample-2',
    // Slate -> Cyan (Metallic/Cool)
    url: createPlaceholder('Chrome Detail', '#0f172a', '#0ea5e9'),
    filename: 'sample-2.jpg',
    title: 'Chrome Detail',
    category: 'Automotive',
    photographer: 'Amy',
    session: 'Muscle Cars',
    size: 'medium',
    featured: false
  },
  {
    id: 'sample-3',
    // Deep Blue -> Navy (Tactical/Police)
    url: createPlaceholder('SWAT Breach', '#172554', '#3b82f6'),
    filename: 'sample-3.jpg',
    title: 'Breach',
    category: 'Tactical',
    photographer: 'Damon',
    session: 'Bank Heist',
    size: 'medium',
    featured: true,
    description: 'LSPD SWAT team securing the perimeter during the Fleeca Bank incident.'
  },
  {
    id: 'sample-4',
    // Purple -> Pink (Lifestyle/Nightlife)
    url: createPlaceholder('Bahama Mamas', '#4c1d95', '#d946ef'),
    filename: 'sample-4.jpg',
    title: 'VIP Lounge',
    category: 'Lifestyle',
    photographer: 'Callum',
    session: 'Friday Night',
    size: 'medium',
    featured: true,
    description: 'Candid moments from the citys most exclusive club.'
  },
  {
    id: 'sample-5',
    // Amber -> Yellow (Warmth/Portrait)
    url: createPlaceholder('Golden Hour', '#451a03', '#fbbf24'),
    filename: 'sample-5.jpg',
    title: 'Golden Hour',
    category: 'Portraits',
    photographer: 'Marianna',
    session: 'Urban Soul',
    size: 'medium',
    featured: true,
    description: 'Street portraiture that explores the human condition.'
  },
  {
    id: 'sample-6',
    // Zinc -> White (Formal/Events)
    url: createPlaceholder('City Hall', '#18181b', '#71717a'),
    filename: 'sample-6.jpg',
    title: 'The Vote',
    category: 'Events',
    photographer: 'Binx',
    session: 'Mayoral Debate',
    size: 'medium',
    featured: true,
    description: 'Coverage of the pivotal debate at the City Hall steps.'
  }
];

// EXPORT
export const photoRegistry: PhotoData[] = [...localPhotos, ...SAMPLE_IMAGES];

// Helpers
export const getUniquePhotographers = () => {
  const photographers = new Set(photoRegistry.map(p => p.photographer));
  return ['All', ...Array.from(photographers)];
};

export const getUniqueCategories = () => {
  const categories = new Set(photoRegistry.map(p => p.category));
  return ['All', ...Array.from(categories)];
};