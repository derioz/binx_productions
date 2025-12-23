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
// 1. GALLERY FILES
// To add photos, upload them to your 'public/gallery' folder and add 
// their filenames here.
//
// FORMAT: Photographer_Category_Session-Name_Title.jpg
//
// HOW TO CREATE A NEW SESSION:
// Simply type a new name in the 3rd part of the filename.
// The code converts dashes (-) to spaces.
// ==================================================================
const GALLERY_FILES: string[] = [
  'Callum_Portraits_Jimmy-Streets_Gangster.png',
  'Damon_Cars_Damons-Car_Damon-Close-Up.png',
  'Damon_Cars_Damons-Car_Damon-Fish-Eye.png',
  'Damon_Cars_Damons-Car_Damon-Forward.png',
  'Damon_Cars_Damons-Car_Damon-Side-View.png',
  'Damon_Cars_Damons-Car_Damons-Car-Left.png',
  'Marianna_Portraits_Family-and-Friends_Redacted.png',
  'Marianna_Portraits_Family-and-Friends_Streets-and-Marianna.png.png',
];

// ==================================================================
// 2. PARSING LOGIC
// ==================================================================
const processFilename = (filename: string, index: number): PhotoData => {
  // Remove extension (handles .jpg, .png, etc)
  const cleanName = filename.substring(0, filename.lastIndexOf('.'));
  const parts = cleanName.split('_');

  // Parse parts based on format: Photographer_Category_Session_Title
  // We use dashes (-) to represent spaces in the final text
  const photographer = parts[0] ? parts[0].replace(/-/g, ' ') : 'Binx';
  const category = parts[1] ? parts[1].replace(/-/g, ' ') : 'Portfolio';
  
  // THE MAGIC: This part creates the Session Name dynamically
  const session = parts[2] ? parts[2].replace(/-/g, ' ') : 'General';
  
  const title = parts[3] ? parts[3].replace(/-/g, ' ') : 'Untitled';

  return {
    id: `local-${index}`,
    // Assumes images are in the 'gallery' folder relative to index.html
    url: `./gallery/${filename}`, 
    filename: filename,
    photographer: photographer,
    category: category,
    session: session,
    title: title,
    featured: true, // Always feature your uploaded files
    size: 'medium',
    description: `Captured by ${photographer} for the ${session} session.`
  };
};

const localPhotos = GALLERY_FILES.map((f, i) => processFilename(f, i));

// ==================================================================
// 3. SAMPLE DATA (FALLBACK)
// ==================================================================
const SAMPLE_IMAGES: PhotoData[] = [
  {
    id: 'sample-1',
    url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070',
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
    url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070',
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
    url: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1974',
    filename: 'sample-3.jpg',
    title: 'Arrival',
    category: 'Events',
    photographer: 'Callum',
    session: 'The Gala',
    size: 'medium',
    featured: true,
    description: 'An evening of high fashion and higher stakes.'
  },
  {
    id: 'sample-4',
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070',
    filename: 'sample-4.jpg',
    title: 'Rooftop Vibes',
    category: 'Events',
    photographer: 'Callum',
    session: 'The Gala',
    size: 'medium',
    featured: true
  },
  {
    id: 'sample-5',
    url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964',
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
    url: 'https://images.unsplash.com/photo-1542038784424-48ed221f704b?q=80&w=1976',
    filename: 'sample-6.jpg',
    title: 'Backstage',
    category: 'Portraits',
    photographer: 'Damon',
    session: 'Fashion Week',
    size: 'medium',
    featured: true,
    description: 'Exclusive behind-the-scenes access to the Fall Collection runway.'
  }
];

// EXPORT: Local photos first so they appear at the top
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