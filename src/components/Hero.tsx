import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
// Using new door textures
const doorLeft = '/lovable-uploads/beb3b349-e1f2-4c72-b827-28476d36aa64.png';
const doorRight = '/lovable-uploads/7e78a817-eeaf-43ab-b44a-2df376f29fef.png';
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
      {/* Bar Background */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('/lovable-uploads/ce578125-8b8c-4e37-88b3-3e3644af1932.png')`,
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />
      
      {/* Left Door Panel (duplicated from right) */}
      <div 
        className="absolute top-0 left-0 w-1/2 h-full bg-center z-10"
        style={{
          backgroundImage: `url(${doorRight})`,
          backgroundSize: '50%',
          backgroundRepeat: 'no-repeat',
          transform: `translateX(calc(-50% + 150px - ${scrollY * 0.3}px)) scaleX(-1)`,
        }}
      />
      
      {/* Right Door Panel */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full bg-center z-10"
        style={{
          backgroundImage: `url(${doorRight})`,
          backgroundSize: '50%',
          backgroundRepeat: 'no-repeat',
          transform: `translateX(calc(50% - 150px + ${scrollY * 0.3}px))`,
        }}
      />
      
      {/* Center gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-transparent z-20" />
      
      {/* Brand Name */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="text-text-primary font-body text-lg tracking-wide">Tiny Outdoor Spaces</div>
      </div>
      
      {/* Center Content */}
      <div className="relative z-30 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-grifter text-text-primary mb-6 leading-tight">
            <div className="text-[96px]">Unique Handmade</div>
            <div className="text-[96px]">Furniture from Dublin</div>
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
            <div className="font-body font-normal text-white">Ideal for presents, interior and cozy spaces.</div>
            <div className="text-white">Made out of natural materials.</div>
          </p>
          
          {/* Unique Badge */}
          <div className="mb-8">
            <span className="text-white font-heading font-bold text-2xl tracking-wider">Unique.</span>
          </div>
          
          {/* Primary CTA */}
          <div className="space-y-4">
            <Button className="btn-primary text-2xl font-bold px-24 py-12 bg-black text-white border-2 border-accent-primary hover:bg-transparent transition-all duration-300 ease-in-out" onClick={scrollToContact}>
              GET FREE CONSULTATION NOW
            </Button>
            
            {/* Secondary CTAs */}
            <div className="flex gap-4 justify-center mt-6">
              <Button variant="outline" className="border-accent-primary text-white hover:bg-accent-primary/10 px-8 py-4 text-lg">
                INQUIRE
              </Button>
              <Button variant="outline" className="border-accent-primary text-white hover:bg-accent-primary/10 px-8 py-4 text-lg">
                BROWSE
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
        <div className="w-8 h-8 border-2 border-accent-primary rounded-full flex items-center justify-center">
          <div className="w-1 h-3 bg-accent-primary rounded-full"></div>
        </div>
      </div>
    </section>;
};
export default Hero;