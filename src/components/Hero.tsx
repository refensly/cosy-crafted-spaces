import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useBreakpoints } from '@/hooks/use-breakpoints';
import { OptimizedHeroImage } from '@/components/OptimizedHeroImage';
import { scrollToContact as scrollToContactWithOffset, scrollToSection } from '@/lib/scrollUtils';
// Using organized door textures
const doorLeft = '/images/hero-door-left.png';
const doorRight = '/images/hero-door-right.png';
const Hero = () => {
  const [panelsOpened, setPanelsOpened] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [animationsStarted, setAnimationsStarted] = useState(false);
  const {
    isMobile,
    isTablet,
    isDesktop,
    isIpad,
    isMobileOrTablet
  } = useBreakpoints();
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
    scrollToContactWithOffset();
  };
  const scrollToNextSection = () => {
    scrollToSection('pain-value-section');
  };
  return <section className="relative min-h-screen overflow-hidden animate-fade-in" style={{
    animationDuration: '0.5s',
    backgroundColor: 'hsl(var(--bg-deep-green))'
  }}>
      {/* Optimized Hero Background */}
      <OptimizedHeroImage style={{
      backgroundAttachment: isMobileOrTablet ? 'scroll' : 'fixed'
    }} />
    
    {/* Door Panels - Desktop Only (hide on mobile and tablet) */}
    {isDesktop && <>
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
      </>}
    
    {/* Center gradient overlay for text readability */}
    <div className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-black/40 to-transparent" />
    
    {/* Center Content */}
    <div className="relative z-30 min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 pb-16">
      <div className="text-center max-w-none mx-auto">
        <h1 className={`font-grifter text-text-primary mb-6 sm:mb-8 ${animationsStarted ? 'animate-fade-up animation-delay-500' : 'opacity-0'}`}>
          <div className={`hero-title ${animationsStarted ? 'animate-fade-up animation-delay-700' : 'opacity-0'}`}>Unique Handmade</div>
          <div className={`hero-title ${animationsStarted ? 'animate-fade-up animation-delay-900' : 'opacity-0'}`}>Furniture from Dublin</div>
        </h1>
        <div className={`hero-subtitle text-white mb-8 sm:mb-10 max-w-3xl mx-auto ${animationsStarted ? 'animate-fade-up animation-delay-1100' : 'opacity-0'}`}>
          <div className="font-body font-normal mx-0">Handcrafted bars, restaurants, outdoor living spaces and furniture.</div>
          <div className="mx-0">Designed once, built to last.</div>
        </div>
        
        {/* Unique Badge - Desktop Only */}
        {isDesktop && <div className={`mb-6 sm:mb-8 ${animationsStarted ? 'animate-fade-up animation-delay-1300' : 'opacity-0'}`}>
            
          </div>}
        
        {/* CTAs */}
        <div className="space-y-6">
          {/* Main CTA */}
          <div className={`flex justify-center ${animationsStarted ? 'animate-fade-up animation-delay-1500' : 'opacity-0'}`}>
            <Button variant="glow" size="mobile-compact" className="w-full max-w-[320px] sm:w-auto" onClick={scrollToContact}>
              <span className="block sm:hidden">free consultation</span>
              <span className="hidden sm:block">get free consultation now</span>
            </Button>
          </div>
          
          {/* Secondary CTAs */}
          <div className={`flex justify-center ${animationsStarted ? 'animate-fade-up animation-delay-1700' : 'opacity-0'}`}>
            <Button variant="glow" size="mobile-compact" className="w-full max-w-[320px] sm:w-auto" onClick={scrollToContact}>
              <span className="block sm:hidden">whatsapp us</span>
              <span className="hidden sm:block">talk to us on whatsapp</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
    
    {/* Scroll indicator */}
    <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 transition-opacity duration-500 cursor-pointer hover:scale-110 transition-transform ${animationsStarted ? 'opacity-100 animate-[pulse-glow_2s_ease-in-out_infinite]' : 'opacity-0'}`} onClick={scrollToNextSection} role="button" aria-label="Scroll to next section" tabIndex={0} onKeyDown={e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToNextSection();
      }
    }}>
      <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
        <div className="w-1 h-3 bg-white rounded-full"></div>
      </div>
    </div>
  </section>;
};
export default Hero;