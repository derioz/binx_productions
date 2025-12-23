import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Portfolio from './components/Portfolio';

export type PageView = 'home' | 'portfolio';

const App: React.FC = () => {
  const [view, setView] = useState<PageView>('home');

  const handleNavigate = (page: PageView, sectionId?: string) => {
    setView(page);
    
    // If navigating to a section on the home page
    if (page === 'home' && sectionId) {
      // Small timeout to allow render if switching from portfolio
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (page === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-binx-dark text-white selection:bg-binx-cyan selection:text-black">
      <Navbar currentView={view} onNavigate={handleNavigate} />
      
      <main>
        {view === 'home' ? (
          <>
            <div id="home">
              <Hero onNavigate={handleNavigate} />
            </div>
            <div id="gallery">
              <Gallery />
            </div>
            <div id="services">
              <Services />
            </div>
            <div id="about">
              <About />
            </div>
            <div id="contact">
              <Contact />
            </div>
          </>
        ) : (
          <div id="portfolio-page">
            <Portfolio onBack={() => handleNavigate('home')} />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;