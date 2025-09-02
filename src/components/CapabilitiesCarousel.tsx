import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';

const CapabilitiesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const capabilities = [
    {
      title: "Hospitality Spaces",
      image: "/images/capability-bars.jpg",
      description: "Custom bars, restaurants, and commercial spaces that create unforgettable experiences for your customers."
    },
    {
      title: "Outdoor Living", 
      image: "/images/capability-outdoor.jpg",
      description: "Decking, pergolas, and garden features that extend your living space into the great outdoors."
    },
    {
      title: "Bespoke Furniture",
      image: "/images/capability-furniture.jpg", 
      description: "One-of-a-kind pieces designed specifically for your space, style, and functional needs."
    },
    {
      title: "Home Bars",
      image: "/images/capability-home-bars.jpg", 
      description: "Sophisticated home entertainment spaces that bring the luxury of fine hospitality to your home."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % capabilities.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <ScrollReveal>
        <div className="relative h-96 bg-gradient-to-br from-accent-primary/10 to-accent-primary/5 rounded-2xl overflow-hidden border border-accent-primary/20">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentIndex 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-110'
              }`}
            >
              <div className="relative h-full">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={capability.image} 
                    alt={`${capability.title} example`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                </div>
                
                {/* Content Overlay */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <div className="text-center">
                    <h3 className="font-heading font-bold text-white text-2xl mb-3">
                      {capability.title}
                    </h3>
                    <p className="text-white/90 text-base leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Progress indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {capabilities.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-accent-primary shadow-lg scale-110' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </ScrollReveal>
      
      {/* Navigation arrows */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + capabilities.length) % capabilities.length)}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-all duration-200 text-white hover:scale-110 z-20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % capabilities.length)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-all duration-200 text-white hover:scale-110 z-20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default CapabilitiesCarousel;