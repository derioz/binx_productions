import React from 'react';
import { Camera, Aperture, Film, Users, Zap, Award } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Aperture size={32} />,
      title: "Automotive Editorial",
      description: "Static and rolling shots that highlight the lines, modifications, and spirit of your machine.",
      price: "Starting at $250",
      accent: "cyan"
    },
    {
      icon: <Users size={32} />,
      title: "Portrait Sessions",
      description: "High-end portraiture for models, artists, and professionals. Studio or urban location.",
      price: "Starting at $150",
      accent: "yellow"
    },
    {
      icon: <Film size={32} />,
      title: "Event Coverage",
      description: "Complete documentation of car meets, parties, weddings, and corporate gatherings.",
      price: "Hourly Rates Available",
      accent: "purple"
    },
    {
      icon: <Camera size={32} />,
      title: "Commercial Branding",
      description: "Visual assets to elevate your brand's presence in the city. Product and lifestyle shots.",
      price: "Custom Quote",
      accent: "cyan"
    }
  ];

  return (
    <section className="relative py-32 bg-black overflow-hidden" id="services">
      {/* 1. BACKGROUND AMBIENCE */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-[20%] right-[0%] w-[40%] h-[60%] bg-binx-cyan/5 rounded-full blur-[100px] animate-pulse"></div>
         <div className="absolute bottom-[0%] left-[10%] w-[30%] h-[40%] bg-binx-yellow/5 rounded-full blur-[80px]"></div>
      </div>
      
      {/* Noise Texture */}
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="mb-24 border-b border-white/10 pb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h2 className="text-7xl md:text-9xl font-display font-bold text-white tracking-tighter leading-none">
              <span className="block">OUR</span>
              <span className="block w-fit text-transparent bg-clip-text bg-gradient-to-r from-binx-yellow via-white to-binx-yellow animate-shine bg-[length:200%_auto] pb-4">CRAFT</span>
            </h2>
          </div>
          <p className="text-gray-400 text-lg font-light max-w-sm text-left md:text-right">
             Tailored visual packages for the city's movers and shakers. We don't just take photos; we build legacies.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative h-[420px] bg-zinc-900/40 backdrop-blur-sm border border-white/10 p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-white/40 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            >
              {/* Hover Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${service.accent === 'purple' ? '[#5865F2]' : 'binx-' + service.accent}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white mb-8 group-hover:bg-white group-hover:text-black transition-all duration-300`}>
                   {service.icon}
                </div>
                
                <h3 className="text-3xl font-display font-bold text-white uppercase leading-none mb-4 group-hover:translate-x-1 transition-transform">
                  {service.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  {service.description}
                </p>
              </div>

              <div className="relative z-10 border-t border-white/10 pt-6">
                 <div className="flex justify-between items-center">
                    <span className={`text-xs font-bold uppercase tracking-widest text-${service.accent === 'purple' ? '[#5865F2]' : 'binx-' + service.accent}`}>
                       {service.price}
                    </span>
                    <Zap size={16} className={`text-${service.accent === 'purple' ? '[#5865F2]' : 'binx-' + service.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;