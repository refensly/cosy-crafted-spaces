import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
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
            className="bg-transparent text-white font-bold uppercase border-2 border-white hover:bg-white/10 transition-all duration-300"
            onClick={() => scrollToSection('contact-form')}
          >
            Let's build yours
          </Button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-text-primary">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  );
};

export default Header;