import React from 'react';
import { Users, ArrowUpRight } from 'lucide-react';

const Contact: React.FC = () => {
  const photographers = ['Damon', 'Callum', 'Marianna', 'Amy'];

  return (
    <section className="relative py-32 bg-black overflow-hidden" id="contact">
      {/* 1. VIBRANT GRADIENT BACKGROUND (The "Life") */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-binx-cyan/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-[#5865F2]/20 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] bg-binx-yellow/10 rounded-full blur-[80px] animate-float"></div>
      </div>

      {/* Grid Texture Overlay */}
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* HEADER: BIG & BOLD */}
        <div className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/10 pb-12">
          <div>
            <h2 className="text-7xl md:text-9xl font-display font-bold text-white tracking-tighter leading-[0.9]">
              <span className="block">LETS</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-binx-cyan via-white to-binx-cyan animate-shine bg-[length:200%_auto] pb-2">WORK</span>
            </h2>
          </div>
          <div className="md:w-1/3 md:text-right">
             <p className="text-gray-400 text-lg font-light leading-relaxed">
               Ready to immortalize your vision? <br/>
               Our lines are open. The city is waiting.
             </p>
          </div>
        </div>

        {/* INTERACTIVE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. DISCORD "MAGAZINE AD" STYLE */}
          <a 
             href="https://discord.gg/GWpKVW3u6t" 
             target="_blank" 
             rel="noopener noreferrer"
             className="group relative h-[400px] bg-zinc-900/50 overflow-hidden border border-white/10 transition-all duration-500 hover:border-[#5865F2] hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(88,101,242,0.2)]"
          >
             {/* Hover Image Reveal */}
             <div className="absolute inset-0 bg-[#5865F2] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
             
             {/* Content */}
             <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                   <div className="bg-[#5865F2]/20 p-3 rounded-full text-[#5865F2] group-hover:bg-[#5865F2] group-hover:text-white transition-colors">
                      {/* Actual Discord Logo SVG */}
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-current">
                        <path d="M18.942 5.556C17.507 4.887 15.968 4.398 14.364 4.398C14.364 4.398 14.152 4.908 14.004 5.259C12.308 5.016 10.632 5.016 8.947 5.259C8.799 4.908 8.587 4.398 8.587 4.398C6.983 4.398 5.444 4.887 4.009 5.556C1.127 9.873 0.28 14.075 0.672 18.232C2.41 19.516 4.085 20.292 5.727 20.292C6.151 19.721 6.533 19.117 6.862 18.47C6.269 18.248 5.707 17.972 5.178 17.654C5.326 17.537 5.464 17.41 5.602 17.283C8.894 18.82 12.499 18.82 15.759 17.283C15.897 17.41 16.035 17.537 16.183 17.654C15.653 17.972 15.091 18.248 14.498 18.47C14.827 19.117 15.209 19.721 15.633 20.292C17.275 20.292 18.95 19.516 20.688 18.232C21.144 13.566 19.96 9.385 18.942 5.556ZM8.545 15.064C7.517 15.064 6.669 14.12 6.669 12.964C6.669 11.808 7.496 10.864 8.545 10.864C9.594 10.864 10.442 11.808 10.421 12.964C10.421 14.12 9.594 15.064 8.545 15.064ZM15.42 15.064C14.392 15.064 13.544 14.12 13.544 12.964C13.544 11.808 14.371 10.864 15.42 10.864C16.469 10.864 17.317 11.808 17.296 12.964C17.296 14.12 16.469 15.064 15.42 15.064Z" />
                      </svg>
                   </div>
                   <div className="bg-white/5 p-2 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-500">
                     <ArrowUpRight size={24} className="group-hover:rotate-45 transition-transform duration-500" />
                   </div>
                </div>

                <div className="relative z-10">
                   <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 group-hover:translate-x-2 transition-transform">Binx Productions Discord</h3>
                   <p className="text-gray-400 group-hover:text-[#5865F2] transition-colors font-medium">Open a ticket. Start the process.</p>
                </div>
             </div>
             
             {/* Big Background Text (Watermark) */}
             <div className="absolute -bottom-8 -right-8 text-[12rem] font-display font-bold text-white/5 leading-none select-none pointer-events-none group-hover:text-[#5865F2]/10 transition-colors duration-500">
                HUB
             </div>
          </a>

          {/* 2. PHOTOGRAPHERS ROSTER */}
          <div className="group relative h-[400px] bg-zinc-900/50 overflow-hidden border border-white/10 transition-all duration-500 hover:border-binx-yellow hover:scale-[1.01]">
             {/* Hover Glow */}
             <div className="absolute inset-0 bg-binx-yellow opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>

             <div className="absolute inset-0 p-8 flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                   <div className="bg-binx-yellow/20 p-3 rounded-full text-binx-yellow group-hover:bg-binx-yellow group-hover:text-black transition-colors">
                      <Users size={32} />
                   </div>
                   <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Active
                   </div>
                </div>

                <div className="mb-6">
                   <span className="text-sm font-mono text-binx-yellow tracking-[0.2em] uppercase opacity-80 block mb-1">The Team</span>
                   <h3 className="text-3xl font-display font-bold text-white uppercase leading-none">Direct Lines</h3>
                </div>

                {/* Photographer List */}
                <div className="flex flex-col gap-3 relative z-10 overflow-y-auto pr-2">
                   {photographers.map((name) => (
                      <div key={name} className="flex items-center justify-between p-3 border border-white/5 bg-black/20 hover:bg-white/5 hover:border-binx-yellow/30 transition-all cursor-default group/item">
                         <span className="font-display font-bold text-xl text-gray-300 group-hover/item:text-white uppercase tracking-wide transition-colors">
                            {name}
                         </span>
                         <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest group-hover/item:text-binx-yellow transition-colors">
                            Waiting_ID
                         </span>
                      </div>
                   ))}
                </div>
             </div>

             {/* Background Pattern */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;