import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import heroLeft from '@/assets/hero-left.jpg';
import heroRight from '@/assets/hero-right.jpg';
const Hero = () => {
  const [panelsOpened, setPanelsOpened] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    // Trigger the opening animation after component mounts
    const timer = setTimeout(() => {
      setPanelsOpened(true);
    }, 500);

    // Handle scroll for parallax effects
    const handleScroll = () => {
      const scrollPercent = window.scrollY / window.innerHeight * 100;
      setScrollY(window.scrollY);
      
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
      '--panel-offset': '-12vw',
      transform: `translateX(${scrollY * 0.5}px)`,
    } as React.CSSProperties} />
      
      {/* Right Panel */}
      <div className={`hero-panel absolute top-0 right-0 w-1/2 h-full bg-cover bg-center ${panelsOpened ? 'opened' : ''}`} style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${heroRight})`,
      '--panel-offset': '12vw',
      transform: `translateX(-${scrollY * 0.5}px)`,
    } as React.CSSProperties} />
      
      {/* Greenery Parallax Elements */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        {/* Left greenery */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-dark/20 rounded-full blur-sm"></div>
        <div className="absolute top-40 left-20 w-24 h-24 bg-green-light/30 rounded-full blur-sm"></div>
        <div className="absolute bottom-32 left-16 w-28 h-28 bg-green-dark/25 rounded-full blur-sm"></div>
        
        {/* Right greenery */}
        <div className="absolute top-20 right-12 w-36 h-36 bg-green-light/20 rounded-full blur-sm"></div>
        <div className="absolute top-60 right-8 w-20 h-20 bg-green-dark/30 rounded-full blur-sm"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-green-light/25 rounded-full blur-sm"></div>
      </div>
      
      {/* Additional Parallax Greenery */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      >
        <div className="absolute top-32 left-1/4 w-16 h-16 bg-green-dark/15 rounded-full blur-md"></div>
        <div className="absolute top-64 right-1/4 w-20 h-20 bg-green-light/15 rounded-full blur-md"></div>
        <div className="absolute bottom-48 left-1/3 w-24 h-24 bg-green-dark/20 rounded-full blur-md"></div>
      </div>
      
      {/* Brand Name */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="text-text-primary font-body text-lg tracking-wide">Tiny Outdoor Spaces</div>
      </div>
      
      {/* Center Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-grifter text-text-primary mb-6 leading-tight">
            <div className="text-[96px]">Unique Handmade</div>
            <div className="text-[96px]">Furniture from Dublin</div>
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
            <div className="font-body font-normal">Ideal for presents, interior and cozy spaces.</div>
            <div>Made out of natural materials.</div>
          </p>
          
          {/* Unique Badge */}
          <div className="mb-8">
            <span className="text-accent-primary font-body text-2xl tracking-wider">Unique.</span>
          </div>
          
          {/* Primary CTA */}
          <div className="space-y-4">
            <Button className="btn-primary text-lg px-10 py-5 bg-white text-bg-main hover:bg-neutral-light" onClick={scrollToContact}>
              GET FREE CONSULTATION NOW
            </Button>
            
            {/* Secondary CTAs */}
            <div className="flex gap-4 justify-center mt-6">
              <Button variant="outline" className="border-accent-primary text-accent-primary hover:bg-accent-primary/10">
                INQUIRE
              </Button>
              <Button variant="outline" className="border-accent-primary text-accent-primary hover:bg-accent-primary/10">
                BROWSE
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-8 h-8 border-2 border-accent-primary rounded-full flex items-center justify-center">
          <div className="w-1 h-3 bg-accent-primary rounded-full"></div>
        </div>
      </div>
    </section>;
};
export default Hero;