import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import heroLeft from '@/assets/hero-left.jpg';
import heroRight from '@/assets/hero-right.jpg';
const Hero = () => {
  const [panelsOpened, setPanelsOpened] = useState(false);
  useEffect(() => {
    // Trigger the opening animation after component mounts
    const timer = setTimeout(() => {
      setPanelsOpened(true);
    }, 500);

    // Also trigger on scroll for fallback
    const handleScroll = () => {
      const scrollPercent = window.scrollY / window.innerHeight * 100;
      if (scrollPercent > 5 && !panelsOpened) {
        setPanelsOpened(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [panelsOpened]);
  const scrollToContact = () => {
    document.getElementById('contact-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  return <section className="relative min-h-screen bg-bg-main overflow-hidden">
      {/* Left Panel */}
      <div className={`hero-panel absolute top-0 left-0 w-1/2 h-full bg-cover bg-center ${panelsOpened ? 'opened' : ''}`} style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${heroLeft})`,
      '--panel-offset': '-12vw'
    } as React.CSSProperties} />
      
      {/* Right Panel */}
      <div className={`hero-panel absolute top-0 right-0 w-1/2 h-full bg-cover bg-center ${panelsOpened ? 'opened' : ''}`} style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${heroRight})`,
      '--panel-offset': '12vw'
    } as React.CSSProperties} />
      
      {/* Center Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-grifter text-text-primary mb-6 leading-tight">
            <div className="text-[96px]">Unique Handmade</div>
            <div className="text-6xl md:text-7xl">Furniture from Dublin</div>
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
            Ideal for presents, interior and cozy spaces. Made out of natural materials.
          </p>
          <Button className="btn-primary text-lg px-10 py-5" onClick={scrollToContact}>
            Let's build yours
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-16 bg-gradient-to-b from-accent-primary to-transparent rounded-full"></div>
      </div>
    </section>;
};
export default Hero;