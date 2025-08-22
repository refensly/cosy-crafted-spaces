import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import doorLeft from '@/assets/door-left.png';
import doorRight from '@/assets/door-right.png';
import leavesOverlay from '@/assets/leaves-overlay.png';
import branchesOverlay from '@/assets/branches-overlay.png';
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
      {/* Left Door Panel */}
      <div 
        className="absolute top-0 left-0 w-1/2 h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${doorLeft})`,
          transform: `translateX(-${scrollY * 0.3}px)`,
        }}
      />
      
      {/* Right Door Panel */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${doorRight})`,
          transform: `translateX(${scrollY * 0.3}px)`,
        }}
      />
      
      {/* Leaves Overlay - Left Side */}
      <div 
        className="absolute top-0 left-0 w-1/2 h-full bg-cover bg-center pointer-events-none opacity-80"
        style={{
          backgroundImage: `url(${leavesOverlay})`,
          transform: `translateX(-${scrollY * 0.2}px)`,
        }}
      />
      
      {/* Branches Overlay - Right Side */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full bg-cover bg-center pointer-events-none opacity-80"
        style={{
          backgroundImage: `url(${branchesOverlay})`,
          transform: `translateX(${scrollY * 0.2}px)`,
        }}
      />
      
      {/* Center gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-transparent" />
      
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