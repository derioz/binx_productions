import React, { useRef, useState, useEffect } from 'react';
import { ArrowDown, Disc, Scan, Globe } from 'lucide-react';
import { PageView } from '../App';

interface HeroProps {
  onNavigate: (page: PageView, sectionId?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [glitching, setGlitching] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Random glitch trigger (rare automated effect)
    const interval = setInterval(() => {
      if (Math.random() > 0.98) {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 200);
      }
    }, 4000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  // --- TRANSITION HANDLER ---
  const handleEnterGallery = () => {
    setIsExiting(true);
    // Short delay to allow the blur/fade to start before switching components
    setTimeout(() => {
      onNavigate('portfolio');
    }, 500);
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[100dvh] w-full overflow-hidden bg-binx-dark flex flex-col items-center justify-center perspective-container selection:bg-binx-yellow selection:text-black"
    >
      {/* 1. DYNAMIC BACKGROUND LAYER */}
      <div 
        className={`absolute inset-0 z-0 bg-cover bg-center will-change-transform transition-all duration-700 ease-in-out`}
        style={{
          backgroundImage: `url('https://r2.fivemanage.com/image/TYRGCAASXPkj.jpg')`,
          // On exit: blur heavily to match the Portfolio background, and scale slightly to reset parallax
          transform: isExiting ? 'scale(1.05)' : `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px) scale(1.15)`,
          filter: isExiting ? 'blur(8px) brightness(0.5)' : 'none'
        }}
      >
        {/* Darkening Base Layer */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Brand Color Grading Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-binx-dark via-transparent to-binx-cyan/20 mix-blend-overlay opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-binx-dark"></div>
        
        {/* Interactive Spotlight (Follows Mouse) */}
        <div 
           className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-60 transition-all duration-300"
           style={{
             background: `radial-gradient(circle 600px at ${(mousePos.x + 1) * 50}% ${(mousePos.y + 1) * 50}%, rgba(14, 165, 233, 0.3), transparent 70%)`
           }}
        ></div>
      </div>

      {/* 2. FLOATING PARTICLES (Dust) */}
      <div className={`absolute inset-0 z-10 pointer-events-none overflow-hidden transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
         {[...Array(25)].map((_, i) => (
            <div 
              key={i}
              className="absolute bg-white/30 rounded-full blur-[1px] animate-float"
              style={{
                width: Math.random() * 3 + 'px',
                height: Math.random() * 3 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDuration: (Math.random() * 15 + 10) + 's',
                animationDelay: (Math.random() * 5) + 's',
                opacity: Math.random() * 0.5
              }}
            ></div>
         ))}
      </div>

      {/* 3. NOISE & SCANLINES */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay"></div>
      <div className="absolute inset-0 z-20 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>

      {/* 4. MAIN CONTENT */}
      <div 
        className={`relative z-30 flex flex-col items-center justify-center w-full px-4 pt-32 pb-20 transition-all duration-500 ease-in-out`}
        style={{
           transform: isExiting ? `translateY(50px) scale(0.95)` : `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
           opacity: isExiting ? 0 : 1,
        }}
      >
         {/* GLITCH LOGO CONTAINER */}
         <div 
            className={`relative w-full max-w-lg md:max-w-2xl lg:max-w-3xl aspect-[16/9] flex items-center justify-center mb-8 ${glitching ? 'glitch-active' : ''}`}
            onMouseEnter={() => setGlitching(true)}
            onMouseLeave={() => setGlitching(false)}
          >
            
            {/* Main Logo */}
            <img 
               src="https://r2.fivemanage.com/image/968OVAfs2lhc.png" 
               alt="Binx Logo" 
               className="relative z-10 w-full h-full object-contain drop-shadow-2xl filter brightness-110"
            />
            
            {/* Glitch Layers */}
            <img 
               src="https://r2.fivemanage.com/image/968OVAfs2lhc.png" 
               alt="" 
               className="absolute top-0 left-0 w-full h-full object-contain opacity-0 glitch-layer-1 pointer-events-none mix-blend-screen"
            />
            <img 
               src="https://r2.fivemanage.com/image/968OVAfs2lhc.png" 
               alt="" 
               className="absolute top-0 left-0 w-full h-full object-contain opacity-0 glitch-layer-2 pointer-events-none mix-blend-screen"
            />
         </div>

         {/* CTA & Text */}
         <div className="flex flex-col items-center gap-6 text-center animate-fade-in-up delay-200">
            <h2 className="text-binx-cyan font-mono text-xs md:text-sm tracking-[0.5em] uppercase pl-2 flex items-center gap-4">
               <span className="w-8 md:w-12 h-[1px] bg-binx-cyan/50"></span>
               Visual Engineering
               <span className="w-8 md:w-12 h-[1px] bg-binx-cyan/50"></span>
            </h2>
            
            <p className="max-w-lg text-gray-300 font-light leading-relaxed drop-shadow-md text-sm md:text-base">
               Forging the city's visual identity through high-fidelity automotive and lifestyle photography.
            </p>

            <div className="flex items-center gap-6 mt-4">
               <button 
                  onClick={handleEnterGallery}
                  className="group relative px-8 py-3 bg-white text-black font-display font-bold uppercase tracking-widest text-sm overflow-hidden transition-all hover:bg-binx-cyan hover:text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(14,165,233,0.5)]"
               >
                  <span className="relative z-10">Enter Gallery</span>
                  <div className="absolute inset-0 bg-white group-hover:bg-binx-cyan transition-colors"></div>
               </button>
               
               {/* Easter Egg Trigger */}
               <div 
                 onClick={() => setGlitching(true)} 
                 className="cursor-pointer p-3 border border-white/20 rounded-full hover:bg-white/10 hover:border-binx-yellow text-white/50 hover:text-binx-yellow transition-all"
                 title="System Scan"
               >
                 <Scan size={20} />
               </div>
            </div>
         </div>
      </div>

      {/* 5. HUD ELEMENTS */}
      <div className={`absolute bottom-10 left-10 z-30 hidden md:flex items-center gap-4 text-[10px] font-mono tracking-widest text-white/60 transition-opacity duration-300 ${isExiting ? 'opacity-0' : ''}`}>
         <div className="flex items-center gap-2">
            <Globe size={12} className="text-binx-cyan animate-spin-slow" />
            <span>LOC: 34.0522° N, 118.2437° W</span>
         </div>
         <div className="h-3 w-[1px] bg-white/20"></div>
         <div className="flex items-center gap-2">
            <Disc size={12} className="text-red-500 animate-pulse" />
            <span>REC: 4K_RAW</span>
         </div>
      </div>

      <div className={`absolute bottom-10 right-10 z-30 hidden md:flex flex-col items-end gap-1 transition-opacity duration-300 ${isExiting ? 'opacity-0' : ''}`}>
         <div className="flex gap-1 items-end h-6">
            {[1,2,3,4,5,6,7].map(i => (
              <div 
                key={i} 
                className={`w-1 ${i > 5 ? 'bg-binx-yellow' : 'bg-binx-cyan'} animate-pulse`} 
                style={{
                  height: Math.max(20, Math.random() * 100) + '%',
                  animationDelay: i*0.1+'s',
                  animationDuration: '0.6s'
                }}
              ></div>
            ))}
         </div>
         <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Audio In</span>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 cursor-pointer animate-bounce text-white/50 hover:text-white transition-colors ${isExiting ? 'opacity-0' : ''}`}
        onClick={() => onNavigate('home', 'gallery')}
      >
        <ArrowDown size={24} />
      </div>

      {/* STYLE FOR GLITCH EFFECT */}
      <style>{`
        .glitch-active .glitch-layer-1 {
          opacity: 0.7;
          animation: glitch-anim-1 0.3s infinite linear alternate-reverse;
          transform: translate(-5px, 0);
          filter: drop-shadow(2px 2px 0px #fbbf24);
        }
        .glitch-active .glitch-layer-2 {
          opacity: 0.7;
          animation: glitch-anim-2 0.3s infinite linear alternate-reverse;
          transform: translate(5px, 0);
          filter: drop-shadow(-2px -2px 0px #0ea5e9);
        }

        @keyframes glitch-anim-1 {
          0% { clip-path: inset(20% 0 80% 0); }
          20% { clip-path: inset(60% 0 10% 0); }
          40% { clip-path: inset(10% 0 50% 0); }
          60% { clip-path: inset(80% 0 5% 0); }
          80% { clip-path: inset(30% 0 40% 0); }
          100% { clip-path: inset(50% 0 30% 0); }
        }
        @keyframes glitch-anim-2 {
          0% { clip-path: inset(10% 0 60% 0); }
          20% { clip-path: inset(30% 0 20% 0); }
          40% { clip-path: inset(70% 0 10% 0); }
          60% { clip-path: inset(20% 0 50% 0); }
          80% { clip-path: inset(60% 0 20% 0); }
          100% { clip-path: inset(40% 0 30% 0); }
        }
      `}</style>

    </div>
  );
};

export default Hero;