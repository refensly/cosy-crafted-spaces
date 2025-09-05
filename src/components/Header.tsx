import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useMobileMenu } from '@/contexts/MobileMenuContext';
import { scrollToSection as scrollToSectionWithOffset } from '@/lib/scrollUtils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { mobileMenuOpen, setMobileMenuOpen } = useMobileMenu();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    scrollToSectionWithOffset(sectionId, mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-bg-main backdrop-blur-sm' 
          : 'bg-bg-main/60 backdrop-blur-sm'
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-heading font-bold text-text-primary">
          Tiny Outdoor Spaces
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('work')}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            Work
          </button>
          <button 
            onClick={() => scrollToSection('process')}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            Process
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('reviews')}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            Reviews
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            Contact
          </button>
          
          <Button 
            variant="glow"
            size="mobile-compact"
            className="bg-transparent text-white font-normal border border-neutral-light hover:bg-white/10 transition-all duration-300"
            onClick={() => scrollToSection('contact-form')}
          >
            let's build yours
          </Button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden bg-bg-main border-t border-border transition-all duration-300 ease-in-out ${
        mobileMenuOpen 
          ? 'max-h-screen opacity-100 visible' 
          : 'max-h-0 opacity-0 invisible overflow-hidden'
      }`}>
        <div className="px-6 py-4 space-y-4">
          <button 
            onClick={() => {
              scrollToSection('work');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left text-text-secondary hover:text-text-primary transition-colors py-2"
          >
            Work
          </button>
          <button 
            onClick={() => {
              scrollToSection('process');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left text-text-secondary hover:text-text-primary transition-colors py-2"
          >
            Process
          </button>
          <button 
            onClick={() => {
              scrollToSection('about');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left text-text-secondary hover:text-text-primary transition-colors py-2"
          >
            About
          </button>
          <button 
            onClick={() => {
              scrollToSection('reviews');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left text-text-secondary hover:text-text-primary transition-colors py-2"
          >
            Reviews
          </button>
          <button 
            onClick={() => {
              scrollToSection('contact');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left text-text-secondary hover:text-text-primary transition-colors py-2"
          >
            Contact
          </button>
          <Button 
            variant="glow"
            size="mobile-compact"
            className="w-full bg-transparent text-white font-normal border border-neutral-light hover:bg-white/10 transition-all duration-300 mt-4"
            onClick={() => {
              scrollToSection('contact-form');
              setMobileMenuOpen(false);
            }}
          >
            let's build yours
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;