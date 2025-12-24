import React from 'react';

const About: React.FC = () => {
  // Inline SVG for the About Section - Dark, moody, with a Cyan accent
  const aboutImage = `data:image/svg+xml;base64,${btoa(`
    <svg width="800" height="1000" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aboutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#09090b;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
        </linearGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
           <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0ea5e9" stroke-width="1" stroke-opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#aboutGrad)" />
      <rect width="100%" height="100%" fill="url(#grid)" />
      <circle cx="50%" cy="40%" r="150" fill="none" stroke="#0ea5e9" stroke-width="1" stroke-opacity="0.5" />
      <text x="50%" y="85%" font-family="Oswald, sans-serif" font-size="60" font-weight="700" fill="white" text-anchor="middle" letter-spacing="0.2em" style="text-transform:uppercase; opacity: 0.1">VISION</text>
    </svg>
  `)}`;

  return (
    <section className="relative py-32 bg-zinc-950 border-y border-white/5 overflow-hidden" id="about">
       {/* Background Noise */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-20 group">
        
        {/* Left: Image with Glitch/Frame effect */}
        <div className="w-full md:w-5/12 relative">
           <div className="absolute inset-0 bg-binx-cyan/20 translate-x-4 translate-y-4 rounded-sm transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
           <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-white/10 bg-black">
             <img 
               src={aboutImage} 
               alt="Abstract Composition" 
               className="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-1000"
             />
             {/* Overlay Text */}
             <div className="absolute bottom-6 left-6">
                <div className="text-[10px] font-mono text-binx-cyan uppercase tracking-widest mb-1">Established 2024</div>
                <div className="text-white font-display font-bold text-2xl uppercase">Los Santos</div>
             </div>
           </div>
        </div>
        
        {/* Right: Text Content */}
        <div className="w-full md:w-7/12">
          <h2 className="text-7xl md:text-9xl font-display font-bold text-white tracking-tighter leading-none mb-12">
            <span className="block">THE</span>
            <span className="block w-fit text-gray-700 group-hover:text-white transition-colors pb-2">VISION</span>
          </h2>

          <div className="space-y-8 pl-4 border-l border-white/10">
            <h3 className="text-2xl text-white font-light italic">
              "Photography is the pause button on life."
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              Founded in the heart of the city, Binx Productions emerged from a desire to capture authenticity in a world of filters. We aren't just a service; we are visual narrators.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              Whether it's the raw horsepower of a tuner car at midnight, the subtle emotion of a wedding vow, or the vibrant energy of a downtown block party, we bring a cinematic eye to every frame.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 mt-12 pt-12 border-t border-white/5">
               <div>
                 <span className="block text-5xl font-display font-bold text-white mb-2">500+</span>
                 <span className="text-xs text-binx-yellow font-bold uppercase tracking-widest">Shoots Completed</span>
               </div>
               <div>
                 <span className="block text-5xl font-display font-bold text-white mb-2">100%</span>
                 <span className="text-xs text-binx-cyan font-bold uppercase tracking-widest">Client Satisfaction</span>
               </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;