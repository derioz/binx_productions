import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Layers, Camera, ImageIcon, Search, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { photoRegistry, getUniquePhotographers, getUniqueCategories, PhotoData } from '../data/photoRegistry';

interface PortfolioProps {
  onBack: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onBack }) => {
  const [selectedPhotographer, setSelectedPhotographer] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingSession, setViewingSession] = useState<string | null>(null);
  
  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Load filter options dynamically
  const photographers = getUniquePhotographers();
  const categories = getUniqueCategories();

  // Multi-criteria filtering logic
  const filteredItems = photoRegistry.filter(item => {
    const matchPhotographer = selectedPhotographer === 'All' || item.photographer === selectedPhotographer;
    const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
    
    const query = searchQuery.toLowerCase();
    const matchSearch = query === '' || 
      item.title.toLowerCase().includes(query) || 
      item.session.toLowerCase().includes(query) ||
      item.photographer.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);

    return matchPhotographer && matchCategory && matchSearch;
  });

  // Group by Session
  const groupedSessions = filteredItems.reduce((acc, item) => {
    const sessionName = item.session || 'Untitled Session';
    if (!acc[sessionName]) {
      acc[sessionName] = [];
    }
    acc[sessionName].push(item);
    return acc;
  }, {} as Record<string, PhotoData[]>);

  const sessionKeys = Object.keys(groupedSessions);

  // Helper to clear filters
  const clearFilters = () => {
    setSelectedPhotographer('All');
    setSelectedCategory('All');
    setSearchQuery('');
  };

  // Lightbox Logic
  const currentSessionPhotos = viewingSession ? groupedSessions[viewingSession] : [];

  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = useCallback(() => {
    if (lightboxIndex !== null && currentSessionPhotos) {
      setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % currentSessionPhotos.length));
    }
  }, [lightboxIndex, currentSessionPhotos]);

  const prevImage = useCallback(() => {
    if (lightboxIndex !== null && currentSessionPhotos) {
      setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + currentSessionPhotos.length) % currentSessionPhotos.length));
    }
  }, [lightboxIndex, currentSessionPhotos]);

  // Keyboard Navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextImage, prevImage]);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-black px-4 sm:px-6 lg:px-8 animate-fade-in relative selection:bg-binx-cyan selection:text-black overflow-hidden">
      
      {/* ===================================================================================
          1. VIBRANT GRADIENT BACKGROUND (MATCHING CONTACT STYLE)
         =================================================================================== */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-binx-cyan/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#5865F2]/10 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-[40%] left-[50%] w-[40%] h-[40%] bg-binx-yellow/5 rounded-full blur-[90px] animate-float"></div>
      </div>

      {/* Grid Texture Overlay */}
      <div className="fixed inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* TOP NAVIGATION / HEADER AREA */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-16 border-b border-white/10 pb-12 gap-8">
          <div className="w-full xl:w-1/2">
            <button 
              onClick={() => {
                if (viewingSession) {
                  setViewingSession(null);
                  setLightboxIndex(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  onBack();
                }
              }}
              className="group flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors uppercase text-xs font-bold tracking-widest"
            >
              <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-binx-cyan group-hover:border-binx-cyan group-hover:text-black transition-all">
                <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> 
              </div>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                {viewingSession ? 'Return to Collections' : 'Return to Home'}
              </span>
            </button>
            
            {!viewingSession && (
              <div className="animate-fade-in-up">
                <h1 className="text-7xl md:text-9xl font-display font-bold text-white tracking-tighter leading-[0.9] mb-6">
                  <span className="block">THE</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-binx-cyan via-white to-binx-cyan animate-shine bg-[length:200%_auto] pb-2">WORK</span>
                </h1>
                <p className="text-gray-400 mt-4 max-w-md font-light text-lg border-l-2 border-binx-cyan/50 pl-4">
                  Visual narratives from the underground. <br/> Filter by artist, style, or mood.
                </p>
              </div>
            )}
          </div>
          
          {/* SEARCH & FILTER BAR (Only show when NOT viewing a specific session) */}
          {!viewingSession && (
            <div className="flex flex-col gap-6 w-full xl:w-1/2 items-start xl:items-end animate-fade-in delay-100">
              
              {/* Refined Glass Search Bar */}
              <div className="w-full bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl focus-within:bg-black/80 focus-within:border-binx-cyan focus-within:shadow-[0_0_30px_rgba(14,165,233,0.15)] transition-all flex items-center min-h-[64px] group">
                
                <div className="pl-6 pr-4 text-gray-500 group-focus-within:text-binx-cyan transition-colors flex-shrink-0">
                  <Search size={20} />
                </div>

                <div className="flex flex-wrap items-center gap-2 flex-grow py-2 pr-2">
                  {/* Photographer Tag */}
                  {selectedPhotographer !== 'All' && (
                    <span className="animate-scale-in flex items-center gap-1.5 bg-binx-yellow text-black text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm whitespace-nowrap shadow-sm">
                      <span>{selectedPhotographer}</span>
                      <button 
                        onClick={() => setSelectedPhotographer('All')}
                        className="hover:bg-black/20 rounded-full p-0.5 transition-colors"
                        aria-label="Remove photographer filter"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}

                  {/* Category Tag */}
                  {selectedCategory !== 'All' && (
                    <span className="animate-scale-in flex items-center gap-1.5 bg-binx-cyan text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm whitespace-nowrap shadow-sm">
                      <span>{selectedCategory}</span>
                      <button 
                        onClick={() => setSelectedCategory('All')}
                        className="hover:bg-black/20 rounded-full p-0.5 transition-colors"
                        aria-label="Remove category filter"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}

                  {/* Input Field */}
                  <input
                    type="text"
                    placeholder={(selectedPhotographer === 'All' && selectedCategory === 'All') ? "Search database..." : "Add filter..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none outline-none text-white placeholder-gray-600 text-sm font-bold uppercase tracking-wider flex-grow min-w-[140px] h-full"
                  />
                  
                  {searchQuery && (
                     <button onClick={() => setSearchQuery('')} className="text-gray-500 hover:text-white transition-colors mr-4">
                       <X size={16} />
                     </button>
                  )}
                </div>
              </div>

              {/* Minimalist Filter Buttons */}
              <div className="flex flex-col md:flex-row gap-8 w-full xl:justify-end border-t border-white/5 pt-6 xl:border-none xl:pt-0">
                
                {/* Photographer Filter */}
                <div className="flex flex-col gap-3">
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest md:text-right">Artist</span>
                    <div className="flex flex-wrap gap-2 md:justify-end">
                    {photographers.map((name) => (
                        <button
                        key={name}
                        onClick={() => setSelectedPhotographer(name === selectedPhotographer ? 'All' : name)}
                        className={`px-3 py-1 rounded-sm font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                            selectedPhotographer === name
                            ? 'bg-binx-yellow border-binx-yellow text-black shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                            : 'bg-transparent border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
                        }`}
                        >
                        {name}
                        </button>
                    ))}
                    </div>
                </div>

                {/* Category Filter */}
                <div className="flex flex-col gap-3">
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest md:text-right">Category</span>
                    <div className="flex flex-wrap gap-2 md:justify-end">
                    {categories.map((cat) => (
                        <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat === selectedCategory ? 'All' : cat)}
                        className={`px-3 py-1 rounded-sm font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                            selectedCategory === cat
                            ? 'bg-binx-cyan border-binx-cyan text-black shadow-[0_0_15px_rgba(14,165,233,0.3)]'
                            : 'bg-transparent border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
                        }`}
                        >
                        {cat}
                        </button>
                    ))}
                    </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* ===================================================================================
            VIEW STATE 1: SINGLE SESSION (EDITORIAL LAYOUT)
           =================================================================================== */}
        {viewingSession ? (
          <div className="animate-fade-in-up">
            {/* Session Hero Header */}
            <div className="flex flex-col lg:flex-row gap-12 mb-20">
              <div className="lg:w-1/2">
                <div className="flex items-center gap-3 mb-6">
                   <span className="px-3 py-1 bg-binx-cyan text-black text-xs font-bold uppercase tracking-widest">
                      {groupedSessions[viewingSession]?.[0]?.category}
                   </span>
                   <span className="w-8 h-[1px] bg-gray-600"></span>
                   <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                      Session ID: {Math.floor(Math.random() * 9000) + 1000}
                   </span>
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white uppercase leading-[0.85] tracking-tighter mb-8">
                  {viewingSession}
                </h1>
                <p className="text-xl text-gray-400 font-light leading-relaxed max-w-xl">
                   {groupedSessions[viewingSession]?.[0]?.description || "A curated selection of images capturing the essence of the moment."}
                </p>
                
                {/* Meta Stats */}
                <div className="grid grid-cols-2 gap-8 mt-12 border-t border-white/10 pt-8">
                   <div className="flex flex-col">
                      <div className="text-[9px] text-gray-500 font-mono uppercase tracking-widest mb-1">Photographer</div>
                      <div className="text-2xl text-white font-display font-bold uppercase">{groupedSessions[viewingSession]?.[0]?.photographer}</div>
                   </div>
                   <div className="flex flex-col">
                      <div className="text-[9px] text-gray-500 font-mono uppercase tracking-widest mb-1">Frame Count</div>
                      <div className="text-2xl text-binx-cyan font-display font-bold uppercase">{groupedSessions[viewingSession]?.length} // RAW</div>
                   </div>
                </div>
              </div>

              {/* Hero Image (First in set) - Clickable for lightbox */}
              <div 
                className="lg:w-1/2 relative group aspect-[4/3] bg-zinc-900 border border-white/10 overflow-hidden cursor-zoom-in transition-all duration-500 hover:border-binx-cyan/50 hover:shadow-[0_0_50px_rgba(14,165,233,0.1)]"
                onClick={() => setLightboxIndex(0)}
              >
                 <img 
                    src={groupedSessions[viewingSession]?.[0]?.url} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    alt="Hero"
                 />
                 <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div className="absolute bottom-6 right-6 p-4 bg-white text-black font-bold uppercase tracking-wider text-xs opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                    Expand View
                 </div>
              </div>
            </div>

            {/* Masonry Grid of Remaining Photos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedSessions[viewingSession]?.map((item, index) => (
                <div 
                   key={item.id} 
                   onClick={() => setLightboxIndex(index)}
                   className={`group relative overflow-hidden bg-zinc-900 cursor-zoom-in border border-white/5 hover:border-white/40 transition-all duration-500 ${
                     // Make every 3rd item span 2 columns if not mobile, purely for visual variety
                     index % 3 === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/3]'
                   }`}
                >
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-display font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 text-center pt-10">
               <button 
                 onClick={() => { setViewingSession(null); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                 className="px-12 py-4 border border-white/20 text-white hover:bg-white hover:text-black transition-all font-display font-bold uppercase tracking-widest text-sm"
               >
                 Back to Index
               </button>
            </div>
          </div>
        ) : (
          
          /* ===================================================================================
             VIEW STATE 2: ALL SESSIONS (HIGH-FIDELITY CARDS)
             =================================================================================== */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pb-20">
            {sessionKeys.map((sessionName, index) => {
              const photos = groupedSessions[sessionName];
              const coverPhoto = photos[0];
              const count = photos.length;

              // Stagger animation delay
              return (
                <div 
                  key={sessionName} 
                  onClick={() => setViewingSession(sessionName)}
                  style={{ animationDelay: `${index * 150}ms` }}
                  className={`group relative w-full h-[400px] bg-zinc-900 border border-white/10 cursor-pointer overflow-hidden transition-all duration-500 hover:border-binx-cyan hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] animate-fade-in-up`}
                >
                  {/* Background Image */}
                  <img 
                    src={coverPhoto.url} 
                    alt={sessionName} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-80 grayscale group-hover:grayscale-0"
                  />
                  
                  {/* Watermark Text */}
                  <div className="absolute -bottom-4 -right-4 text-9xl font-display font-bold text-white/5 select-none pointer-events-none group-hover:text-binx-cyan/10 transition-colors duration-500 uppercase">
                    0{index + 1}
                  </div>
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                     {/* Top Bar */}
                     <div className="flex justify-between items-start">
                        <span className="px-2 py-1 bg-white/10 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-white border border-white/10 group-hover:bg-binx-cyan group-hover:text-black group-hover:border-binx-cyan transition-colors">
                           {coverPhoto.category}
                        </span>
                        <ArrowRight className="text-white opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
                     </div>

                     {/* Bottom Info */}
                     <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-center gap-2 mb-2">
                           <span className="text-binx-yellow text-xs font-bold uppercase tracking-widest">
                             // {coverPhoto.photographer}
                           </span>
                        </div>
                        <h3 className="text-5xl font-display font-bold text-white uppercase tracking-tighter leading-none mb-4">
                           {sessionName}
                        </h3>
                        <div className="h-[1px] w-0 group-hover:w-full bg-binx-cyan transition-all duration-700 ease-out"></div>
                     </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Empty State */}
        {!viewingSession && sessionKeys.length === 0 && (
           <div className="flex flex-col items-center justify-center py-32 border border-dashed border-white/10 rounded-2xl bg-zinc-900/50">
             <div className="text-gray-600 mb-4"><Search size={48} /></div>
             <p className="text-2xl font-display uppercase tracking-wide text-white">No signals found</p>
             <p className="text-sm mt-2 font-light text-gray-500 uppercase tracking-widest">
               Try adjusting your frequency
             </p>
             <button 
                onClick={clearFilters}
                className="mt-8 px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-binx-cyan transition-colors"
             >
               Reset Scan
             </button>
           </div>
        )}
      </div>

      {/* ===================================================================================
          LIGHTBOX MODAL
         =================================================================================== */}
      {lightboxIndex !== null && viewingSession && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Controls */}
          <button 
            onClick={closeLightbox} 
            className="absolute top-6 right-6 p-4 text-white hover:text-binx-cyan transition-colors z-50"
          >
            <X size={32} />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 md:left-8 p-4 text-white hover:text-binx-cyan transition-colors hidden md:block z-50"
          >
            <ChevronLeft size={48} />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 md:right-8 p-4 text-white hover:text-binx-cyan transition-colors hidden md:block z-50"
          >
            <ChevronRight size={48} />
          </button>

          {/* Main Image */}
          <div 
            className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()} 
          >
             <img 
               src={currentSessionPhotos[lightboxIndex].url} 
               alt={currentSessionPhotos[lightboxIndex].title}
               className="max-w-full max-h-[85vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
             />
             
             {/* Caption Bar */}
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur px-6 py-3 border border-white/10 flex items-center gap-4 whitespace-nowrap">
                <span className="text-white font-display font-bold uppercase tracking-wide">
                  {currentSessionPhotos[lightboxIndex].title}
                </span>
                <span className="w-[1px] h-4 bg-white/20"></span>
                <span className="text-[10px] text-binx-cyan font-mono uppercase tracking-widest">
                   {lightboxIndex + 1} / {currentSessionPhotos.length}
                </span>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;