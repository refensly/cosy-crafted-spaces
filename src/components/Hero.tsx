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
  const {
    isMobile,
    isDesktop,
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
    document.getElementById('contact-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  const scrollToNextSection = () => {
    const element = document.getElementById('pain-value-section');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section className={`relative ${isMobile ? 'min-h-[90vh]' : 'min-h-screen'} overflow-hidden animate-fade-in`} style={{
    animationDuration: '0.5s',
    minHeight: isMobile ? '90vh' : '100vh',
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
    <div className={`absolute inset-0 z-20 ${isMobile ? 'bg-gradient-to-r from-transparent via-black/50 to-transparent' : 'bg-gradient-to-r from-transparent via-black/30 to-transparent'}`} />
    
    {/* Center Content */}
    <div className={`relative z-30 ${isMobile ? 'min-h-[90vh]' : 'min-h-screen'} flex items-center justify-center px-4 sm:px-6 ${isMobile ? 'py-8' : ''}`}>
      <div className="text-center max-w-none mx-auto px-2 sm:px-4">
        <h1 className={`font-grifter text-text-primary ${isMobile ? 'mb-6' : 'mb-6 sm:mb-8'} ${animationsStarted ? 'animate-fade-up animation-delay-500' : 'opacity-0'}`}>
          <div className={`${isMobile ? 'text-[clamp(36px,8vw,48px)] font-extrabold leading-[1.1]' : 'text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[140px]'} ${animationsStarted ? 'animate-fade-up animation-delay-700' : 'opacity-0'}`}>Unique Handmade</div>
          <div className={`${isMobile ? 'text-[clamp(36px,8vw,48px)] font-extrabold leading-[1.1] px-1' : 'text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[140px] px-2 sm:px-8 md:px-16'} ${animationsStarted ? 'animate-fade-up animation-delay-900' : 'opacity-0'}`}>Furniture from Dublin</div>
        </h1>
        <div className={`${isMobile ? 'text-[16px] leading-relaxed px-6 max-w-[70ch] mx-auto' : 'text-xl sm:text-2xl md:text-3xl'} text-text-secondary ${isMobile ? 'mb-8' : 'mb-8 sm:mb-10'} max-w-3xl mx-auto leading-relaxed px-4 ${animationsStarted ? 'animate-fade-up animation-delay-1100' : 'opacity-0'}`}>
          <div className="font-body font-normal text-white mx-0">Handcrafted bars, restaurants, outdoor living spaces and furniture.</div>
          <div className="text-white mx-0">Designed once, built to last.</div>
        </div>
        
        {/* Unique Badge - Desktop Only */}
        {isDesktop && <div className={`mb-6 sm:mb-8 ${animationsStarted ? 'animate-fade-up animation-delay-1300' : 'opacity-0'}`}>
            
          </div>}
        
        {/* CTAs */}
        <div className={`${isMobile ? 'space-y-6 px-6' : 'space-y-10'}`}>
          {/* Main CTA */}
          <div className={`${isMobile ? 'mt-8' : 'flex justify-center'} ${animationsStarted ? 'animate-fade-up animation-delay-1500' : 'opacity-0'}`}>
            <Button variant="glow" size="mobile-compact" className="w-full max-w-[320px] mx-auto sm:w-auto" onClick={scrollToContact}>
              <span className="block sm:hidden">free consultation</span>
              <span className="hidden sm:block">get free consultation now</span>
            </Button>
          </div>
          
          {/* Secondary CTAs */}
          <div className={`${isMobile ? 'flex flex-col gap-4' : 'flex flex-col gap-5 items-center'} ${animationsStarted ? 'animate-fade-up animation-delay-1700' : 'opacity-0'}`}>
            

            <Button variant="glow" size="mobile-compact" className="w-full max-w-[320px] mx-auto sm:w-auto" onClick={scrollToContact}>
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