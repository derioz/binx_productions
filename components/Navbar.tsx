import React, { useState, useEffect } from 'react';
import { Aperture, X, ArrowRight } from 'lucide-react';
import { PageView } from '../App';

interface NavbarProps {
  currentView: PageView;
  onNavigate: (page: PageView, sectionId?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Scroll Effect for the Top Bar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleNavClick = (page: PageView, section?: string) => {
    setIsOpen(false);
    onNavigate(page, section);
  };

  const navLinks = [
    { label: 'Home', page: 'home', section: 'home', sub: '01' },
    { label: 'Portfolio', page: 'portfolio', section: '', sub: '02' },
    { label: 'Services', page: 'home', section: 'services', sub: '03' },
    { label: 'Studio', page: 'home', section: 'about', sub: '04' },
    { label: 'Contact', page: 'home', section: 'contact', sub: '05' },
  ];

  return (
    <>
      {/* ==================================================================
          1. FIXED HUD HEADER (The "Frame")
         ================================================================== */}
      <header 
        className={`fixed top-0 left-0 w-full z-[60] px-6 py-6 md:px-12 md:py-8 flex justify-between items-center transition-all duration-500 ${
          scrolled && !isOpen ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent'
        }`}
      >
        {/* LOGO */}
        <div 
          onClick={() => handleNavClick('home', 'home')}
          className="cursor-pointer group flex items-center gap-3 relative z-[70]"
        >
          <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center overflow-hidden rounded-full border border-white/20 group-hover:border-binx-cyan transition-colors bg-black/20 backdrop-blur-sm">
             <img src="https://r2.fivemanage.com/image/968OVAfs2lhc.png" className="w-full h-full object-contain p-1 opacity-80 group-hover:opacity-100 transition-opacity" alt="Binx" />
          </div>
          <div className="flex flex-col">
            <span className={`font-display font-bold text-xl tracking-tighter leading-none transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white'}`}>
              BINX
            </span>
            <span className="font-mono text-[9px] tracking-[0.3em] text-binx-cyan uppercase">
              Productions
            </span>
          </div>
        </div>

        {/* MENU TRIGGER & CTA */}
        <div className="flex items-center gap-6 relative z-[70]">
          
          {/* CTA Button (Hidden on Mobile) */}
          <button 
            onClick={() => handleNavClick('home', 'contact')}
            className={`hidden md:flex items-center gap-2 px-5 py-2 rounded-full border transition-all duration-300 ${
              isOpen 
              ? 'border-white/10 text-gray-500 hover:text-white hover:border-white' 
              : 'border-white/20 bg-black/20 backdrop-blur text-white hover:bg-binx-cyan hover:border-binx-cyan hover:text-black'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-widest">Book Session</span>
          </button>

          {/* Hamburger / Close Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="group flex items-center gap-3 focus:outline-none"
          >
            <span className="hidden md:block text-xs font-bold uppercase tracking-[0.2em] text-white group-hover:text-binx-cyan transition-colors">
              {isOpen ? 'Close' : 'Menu'}
            </span>
            <div className={`relative w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 ${
              isOpen ? 'bg-white text-black border-white rotate-90' : 'bg-black/20 backdrop-blur border-white/20 text-white hover:border-binx-cyan hover:text-binx-cyan'
            }`}>
              {isOpen ? <X size={24} /> : <Aperture size={24} className="group-hover:rotate-180 transition-transform duration-700" />}
            </div>
          </button>
        </div>
      </header>

      {/* ==================================================================
          2. FULL SCREEN "DARKROOM" OVERLAY
         ================================================================== */}
      <div 
        className={`fixed inset-0 z-[50] bg-binx-dark flex flex-col justify-center transition-all duration-[800ms] cubic-bezier(0.76, 0, 0.24, 1) ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        {/* Background Texture/Grain */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none"></div>

        <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row h-full lg:h-auto pt-24 pb-12 lg:py-0">
          
          {/* LEFT COLUMN: LINKS */}
          <div className="w-full lg:w-2/3 flex flex-col justify-center space-y-2 md:space-y-6">
            {navLinks.map((item, index) => (
              <div 
                key={item.label}
                className="group relative overflow-hidden"
              >
                <button
                  onClick={() => handleNavClick(item.page as PageView, item.section)}
                  className="relative flex items-baseline gap-4 text-5xl md:text-7xl lg:text-9xl font-display font-bold text-zinc-600 hover:text-white transition-colors duration-500 uppercase tracking-tighter text-left w-full"
                >
                  <span className="text-sm md:text-xl font-mono text-binx-cyan/50 group-hover:text-binx-cyan font-normal -translate-y-4 md:-translate-y-8 transition-colors">
                    {item.sub}
                  </span>
                  <span className="group-hover:translate-x-4 transition-transform duration-500">
                    {item.label}
                  </span>
                </button>
                
                {/* Decorative Line on Hover */}
                <div className="absolute bottom-2 left-0 w-full h-[1px] bg-binx-cyan transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: INFO (Desktop) */}
          <div className="hidden lg:flex w-1/3 flex-col justify-center items-start border-l border-white/10 pl-16 space-y-12">
            
            <div className="space-y-2">
              <h4 className="text-binx-cyan font-mono text-xs uppercase tracking-widest">Current Status</h4>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-white font-display text-xl tracking-wide">Accepting Bookings</p>
              </div>
              <p className="text-gray-500 text-sm">Fall/Winter 2024 Season</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-binx-cyan font-mono text-xs uppercase tracking-widest">Get in Touch</h4>
              <p className="text-white font-display text-2xl hover:text-binx-yellow transition-colors cursor-pointer">
                bookings@binx.com
              </p>
              <p className="text-gray-500 text-sm">Downtown Studio, Arts District</p>
            </div>

          </div>

          {/* MOBILE FOOTER (Inside Menu) */}
          <div className="lg:hidden mt-auto pt-8 border-t border-white/10 flex flex-col gap-6">
             <button 
                onClick={() => handleNavClick('home', 'contact')}
                className="w-full py-4 bg-binx-cyan text-black font-bold uppercase tracking-widest text-sm flex justify-center items-center gap-2"
             >
                Book Session <ArrowRight size={16} />
             </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;