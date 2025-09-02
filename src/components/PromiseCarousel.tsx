import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';

const PromiseCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const promises = [
    {
      title: "Precision",
      image: "/images/promise-precision.png",
      description: "Every measurement, every cut, every joint crafted with meticulous attention to detail for perfect results."
    },
    {
      title: "Real Spaces", 
      image: "/images/promise-real-spaces.png",
      description: "We work in your actual space, ensuring perfect fit and functionality that transforms your environment."
    },
    {
      title: "Unique Results",
      image: "/images/promise-unique-results.png", 
      description: "No cookie-cutter solutions. Each piece is uniquely designed to match your style and needs."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promises.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <ScrollReveal>
        <div className="relative h-80 bg-gradient-to-br from-accent-primary/10 to-accent-primary/5 rounded-2xl overflow-hidden border border-accent-primary/20">
          {promises.map((promise, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                index === currentIndex 
                  ? 'opacity-100 translate-x-0' 
                  : index < currentIndex 
                    ? 'opacity-0 -translate-x-full' 
                    : 'opacity-0 translate-x-full'
              }`}
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex-1 flex items-center justify-center mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-amber-600 to-amber-800 p-1 shadow-xl">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img 
                        src={promise.image} 
                        alt={`${promise.title} craftsmanship example`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="font-heading font-bold text-text-primary text-2xl mb-3">
                    {promise.title}
                  </h3>
                  <p className="text-text-secondary text-base leading-relaxed">
                    {promise.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Progress indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {promises.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-accent-primary shadow-lg' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </ScrollReveal>
      
      {/* Navigation arrows */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + promises.length) % promises.length)}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center transition-all duration-200 text-white hover:scale-110"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % promises.length)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center transition-all duration-200 text-white hover:scale-110"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default PromiseCarousel;