import React, { useState } from 'react';
import { photoRegistry, getUniqueCategories } from '../data/photoRegistry';
import { ArrowUpRight } from 'lucide-react';

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All');
  
  // We only want to show "Featured" items on the main home page gallery
  const featuredPhotos = photoRegistry.filter(p => p.featured);
  
  // Get categories dynamically based on the featured photos
  const categories = ['All', ...Array.from(new Set(featuredPhotos.map(p => p.category)))];

  const filteredPhotos = filter === 'All' 
    ? featuredPhotos 
    : featuredPhotos.filter(p => p.category === filter);

  return (
    <section className="relative py-32 bg-black px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-binx-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 border-b border-white/10 pb-12 gap-8">
           <div>
              <h2 className="text-7xl md:text-9xl font-display font-bold text-white tracking-tighter leading-[0.9]">
                <span className="block">RECENT</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600 pb-2">SHOTS</span>
              </h2>
           </div>
           
           {/* Filters */}
           <div className="flex flex-wrap gap-3 justify-start md:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all border ${
                  filter === cat 
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent border-white/10 text-gray-500 hover:border-binx-cyan hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
           </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {filteredPhotos.map((photo) => (
            <div 
              key={photo.id}
              className={`group relative overflow-hidden bg-zinc-900 border border-white/10 hover:border-binx-cyan/50 transition-all duration-500 cursor-pointer ${
                photo.size === 'large' ? 'md:row-span-2' : 'row-span-1'
              }`}
            >
              <img 
                src={photo.url} 
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-8 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                   <div className="flex justify-between items-end">
                      <div>
                        <span className="text-binx-cyan text-[10px] font-bold uppercase tracking-widest mb-2 block">{photo.category}</span>
                        <h3 className="text-white font-display text-3xl font-bold uppercase leading-none">{photo.title}</h3>
                      </div>
                      <ArrowUpRight className="text-white" />
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;