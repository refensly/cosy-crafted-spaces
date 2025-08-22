import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
// Using new door textures
const doorLeft = '/lovable-uploads/beb3b349-e1f2-4c72-b827-28476d36aa64.png';
const doorRight = '/lovable-uploads/7e78a817-eeaf-43ab-b44a-2df376f29fef.png';
const Hero = () => {
  const [panelsOpened, setPanelsOpened] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [animationsStarted, setAnimationsStarted] = useState(false);

  useEffect(() => {
    // Trigger the opening animation after component mounts
    const timer = setTimeout(() => {
      setPanelsOpened(true);
    }, 500);

    // Start entrance animations after a short delay
    const animationTimer = setTimeout(() => {
      setAnimationsStarted(true);
    }, 800);

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
      clearTimeout(animationTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [panelsOpened]);
  const scrollToContact = () => {
    document.getElementById('contact-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  return <section className="relative min-h-screen bg-bg-main overflow-hidden animate-fade-in" style={{animationDuration: '0.5s'}}>
      {/* Bar Background */}
      <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{
      backgroundImage: `url('/lovable-uploads/7928fc98-36e8-4b94-bd48-06681d62fc6f.png')`,
      transform: `translateY(${scrollY * 0.1}px)`
    }} />
      
      {/* Left Door Panel (duplicated from right) */}
      <div 
        className="absolute top-0 left-0 w-1/2 h-full bg-center z-10 transition-all duration-1000 ease-out" 
        style={{
          backgroundImage: `url(${doorRight})`,
          backgroundSize: '50%',
          backgroundRepeat: 'no-repeat',
          transform: `translateX(calc(-50% + ${panelsOpened ? '150px' : '75px'} - ${scrollY * 0.3}px)) scaleX(-1)`
        }} 
      />
      
      {/* Right Door Panel */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full bg-center z-10 transition-all duration-1000 ease-out" 
        style={{
          backgroundImage: `url(${doorRight})`,
          backgroundSize: '50%',
          backgroundRepeat: 'no-repeat',
          transform: `translateX(calc(50% - ${panelsOpened ? '150px' : '75px'} + ${scrollY * 0.3}px))`
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
        <div className="text-center max-w-none mx-auto px-4">
          <h1 className={`font-grifter text-text-primary mb-6 leading-tight ${animationsStarted ? 'animate-fade-up animation-delay-500' : 'opacity-0'}`}>
            <div className={`text-[120px] ${animationsStarted ? 'animate-fade-up animation-delay-700' : 'opacity-0'}`}>Unique Handmade</div>
            <div className={`text-[120px] px-16 ${animationsStarted ? 'animate-fade-up animation-delay-900' : 'opacity-0'}`}>Furniture from Dublin</div>
          </h1>
          <p className={`text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed ${animationsStarted ? 'animate-fade-up animation-delay-1100' : 'opacity-0'}`}>
            <div className="font-body font-normal text-white">Ideal for presents, interior and cozy spaces.</div>
            <div className="text-white">Made out of natural materials.</div>
          </p>
          
          {/* Unique Badge */}
          <div className={`mb-8 ${animationsStarted ? 'animate-fade-up animation-delay-1300' : 'opacity-0'}`}>
            <span className="text-white font-heading font-bold tracking-wider text-[50px]">Unique.</span>
          </div>
          
          {/* Primary CTA */}
          <div className="space-y-4">
            <div className={animationsStarted ? 'animate-fade-up animation-delay-1500' : 'opacity-0'}>
              <Button className="btn-primary text-2xl font-bold px-16 py-12 bg-transparent text-white uppercase border-2 border-white hover:bg-white/10 transition-all duration-300 ease-in-out shadow-xl hover-scale" style={{boxShadow: '0 0 30px hsl(39 54% 45% / 0.6)'}} onClick={scrollToContact}>
                GET FREE CONSULTATION NOW
              </Button>
            </div>
            
            {/* Secondary CTAs */}
            <div className={`flex gap-4 justify-center mt-6 ${animationsStarted ? 'animate-fade-up animation-delay-1700' : 'opacity-0'}`}>
              <Button variant="outline" className="border-accent-primary text-white hover:bg-accent-primary/10 px-12 py-6 text-xl hover-scale">
                INQUIRE
              </Button>
              <Button variant="outline" className="border-accent-primary text-white hover:bg-accent-primary/10 px-12 py-6 text-xl hover-scale">
                BROWSE
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30 ${animationsStarted ? 'animate-fade-up animation-delay-2000' : 'opacity-0'}`}>
        <div className="w-8 h-8 border-2 border-accent-primary rounded-full flex items-center justify-center">
          <div className="w-1 h-3 bg-accent-primary rounded-full"></div>
        </div>
      </div>
    </section>;
};
export default Hero;