import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex items-center gap-2">
             <img 
               src="https://r2.fivemanage.com/image/968OVAfs2lhc.png"
               alt="Binx Productions Logo" 
               className="h-8 w-8 object-contain opacity-70"
             />
          <span className="text-gray-500 font-display font-bold tracking-widest">BINX PRODUCTIONS &copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;