import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useBreakpoints } from '@/hooks/use-breakpoints';
import { OptimizedHeroImage } from '@/components/OptimizedHeroImage';
// Using organized door textures
const doorLeft = '/images/hero-door-left.png';
const doorRight = '/images/hero-door-right.png';
const Hero = () => {
  const [panelsOpened, setPanelsOpened] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [animationsStarted, setAnimationsStarted] = useState(false);
  const { isMobile, isDesktop, isMobileOrTablet } = useBreakpoints();

  useEffect(() => {
    // Preload the hero background image for all devices
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = '/images/hero-background.png';
    document.head.appendChild(link);

    // Trigger the opening animation after component mounts (desktop only)
    const timer = setTimeout(() => {
      setPanelsOpened(true);
    }, 500);

    // Start entrance animations after a short delay
    const animationTimer = setTimeout(() => {
      setAnimationsStarted(true);
    }, 800);

    // Handle scroll for parallax effects (desktop only)
    const handleScroll = () => {
      if (isDesktop) {
        const scrollPercent = window.scrollY / window.innerHeight * 100;
        setScrollY(window.scrollY);
        if (scrollPercent > 5 && !panelsOpened) {
          setPanelsOpened(true);
        }
      }
    };

    if (isDesktop) {
      window.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      clearTimeout(timer);
      clearTimeout(animationTimer);
      if (isDesktop) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [panelsOpened, isMobile, isDesktop]);

  const scrollToContact = () => {
    document.getElementById('contact-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section 
      className={`relative ${isMobile ? 'min-h-[90vh]' : 'min-h-screen'} overflow-hidden animate-fade-in`}
      style={{
        animationDuration: '0.5s',
        minHeight: isMobile ? '90vh' : '100vh',
        backgroundColor: 'hsl(var(--bg-deep-green))'
      }}
    >
      {/* Optimized Hero Background */}
      <OptimizedHeroImage 
        style={{
          transform: isDesktop ? `translateY(${scrollY * 0.1}px)` : 'none',
          backgroundAttachment: isMobileOrTablet ? 'scroll' : 'fixed'
        }}
      />
    
    {/* Door Panels - Desktop Only (hide on mobile and tablet) */}
    {isDesktop && (
      <>
        {/* Left Door Panel (duplicated from right) */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-center z-10" style={{
          backgroundImage: `url(${doorRight})`,
          backgroundSize: '50%',
          backgroundRepeat: 'no-repeat',
          transform: `translateX(calc(-50% + 150px - ${scrollY * 0.3}px)) scaleX(-1)`
        }} />
        
        {/* Right Door Panel */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-center z-10" style={{
          backgroundImage: `url(${doorRight})`,
          backgroundSize: '50%',
          backgroundRepeat: 'no-repeat',
          transform: `translateX(calc(50% - 150px + ${scrollY * 0.3}px))`
        }} />
      </>
    )}
    
    {/* Center gradient overlay for text readability */}
    <div className={`absolute inset-0 z-20 ${isMobile ? 'bg-gradient-to-r from-transparent via-black/50 to-transparent' : 'bg-gradient-to-r from-transparent via-black/30 to-transparent'}`} />
    
    {/* Center Content */}
    <div className={`relative z-30 ${isMobile ? 'min-h-[90vh]' : 'min-h-screen'} flex items-center justify-center px-4 sm:px-6 ${isMobile ? 'py-8' : ''}`}>
      <div className="text-center max-w-none mx-auto px-2 sm:px-4">
        <h1 className={`font-grifter text-text-primary ${isMobile ? 'mb-4' : 'mb-4 sm:mb-6'} ${isMobile ? 'leading-tight' : 'leading-tight'} ${animationsStarted ? 'animate-fade-up animation-delay-500' : 'opacity-0'}`}>
          <div className={`${isMobile ? 'text-3xl leading-tight' : 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[120px]'} ${animationsStarted ? 'animate-fade-up animation-delay-700' : 'opacity-0'}`}>Unique Handmade</div>
          <div className={`${isMobile ? 'text-3xl leading-tight px-1' : 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[120px] px-2 sm:px-8 md:px-16'} ${animationsStarted ? 'animate-fade-up animation-delay-900' : 'opacity-0'}`}>Furniture from Dublin</div>
        </h1>
        <div className={`${isMobile ? 'text-sm leading-relaxed px-4' : 'text-lg sm:text-xl md:text-2xl'} text-text-secondary ${isMobile ? 'mb-6' : 'mb-6 sm:mb-8'} max-w-2xl mx-auto leading-relaxed px-2 ${animationsStarted ? 'animate-fade-up animation-delay-1100' : 'opacity-0'}`}>
          <div className="font-body font-normal text-white">Handcrafted bars, restaurants, outdoor living spaces and furniture.</div>
          <div className="text-white">Designed once, built to last.</div>
        </div>
        
        {/* Unique Badge - Desktop Only */}
        {isDesktop && (
          <div className={`mb-6 sm:mb-8 ${animationsStarted ? 'animate-fade-up animation-delay-1300' : 'opacity-0'}`}>
            <span className={`text-white font-heading font-bold tracking-wider text-xl sm:text-2xl md:text-[32px]`}>Unique.</span>
          </div>
        )}
        
        {/* CTAs */}
        <div className={`${isMobile ? 'space-y-3 px-6' : 'space-y-6'}`}>
          {/* Main CTA */}
          <div className={`${isMobile ? 'mt-8' : 'flex justify-center'} ${animationsStarted ? 'animate-fade-up animation-delay-1500' : 'opacity-0'}`}>
            <Button variant="outline" className={`${isMobile ? 'border-accent-primary border-2 text-white font-semibold hover:bg-accent-primary/20 hover:border-accent-primary/80 transition-all duration-500 ease-out w-full mx-auto flex items-center justify-center text-base px-6 py-3 min-h-[48px] rounded-lg' : 'btn-primary font-bold bg-transparent text-white uppercase border-2 border-white hover:bg-white/10 transition-all duration-300 ease-in-out shadow-xl hover-scale w-auto text-lg sm:text-xl md:text-2xl px-6 sm:px-12 md:px-18 py-6 sm:py-10 md:py-14'}`} style={isMobile ? {} : {boxShadow: '0 0 30px hsl(39 54% 45% / 0.6)'}} onClick={scrollToContact}>
              <span className="block sm:hidden">FREE CONSULTATION</span>
              <span className="hidden sm:block">GET FREE CONSULTATION NOW</span>
            </Button>
          </div>
          
          {/* Secondary CTAs */}
          <div className={`${isMobile ? 'space-y-3' : 'flex justify-center gap-6'} ${animationsStarted ? 'animate-fade-up animation-delay-1700' : 'opacity-0'}`}>
            <Button variant="outline" className={`border-accent-primary text-white hover:bg-accent-primary/20 hover:border-accent-primary/80 transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg hover:shadow-accent-primary/25 ${isMobile ? 'w-full mx-auto block text-sm px-6 py-2.5 min-h-[42px] rounded-lg' : 'w-auto px-6 sm:px-10 md:px-14 py-4 sm:py-6 md:py-7 text-lg sm:text-xl'}`} onClick={scrollToContact}>
              <span className="block sm:hidden">GET A QUOTE</span>
              <span className="hidden sm:block">GET A QUOTE</span>
            </Button>

            <Button variant="outline" className={`border-accent-primary text-white hover:bg-accent-primary/20 hover:border-accent-primary/80 transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg hover:shadow-accent-primary/25 ${isMobile ? 'w-full mx-auto block text-sm px-6 py-2.5 min-h-[42px] rounded-lg' : 'w-auto px-6 sm:px-10 md:px-14 py-4 sm:py-6 md:py-7 text-lg sm:text-xl'}`} asChild>
              <a href="https://wa.me/353879380494" target="_blank" rel="noopener noreferrer">
                <span className="block sm:hidden">WHATSAPP US</span>
                <span className="hidden sm:block">TALK TO US ON WHATSAPP</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
    
    {/* Scroll indicator */}
    <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30 ${animationsStarted ? 'animate-fade-up animation-delay-2000' : 'opacity-0'}`}>
      <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center animate-bounce">
        <div className="w-1 h-3 bg-white rounded-full"></div>
      </div>
    </div>
  </section>
  );
};
export default Hero;