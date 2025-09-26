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
        <div className="relative h-96 bg-gradient-to-br from-black/30 to-transparent rounded-2xl overflow-hidden backdrop-blur-sm">
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
                    alt={`${capability.title} - Custom handcrafted woodwork by Tiny Outdoor Spaces Dublin`}
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
          
        </div>
      </ScrollReveal>
      
      {/* Navigation arrows */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + capabilities.length) % capabilities.length)}
        className="carousel-nav absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center z-20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % capabilities.length)}
        className="carousel-nav absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center z-20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default CapabilitiesCarousel;