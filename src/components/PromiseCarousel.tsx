import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
const PromiseCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const promises = [{
    title: "Precision",
    image: "/images/promise-precision.png",
    description: "Every measurement, every cut, every joint crafted with meticulous attention to detail for perfect results."
  }, {
    title: "Real Spaces",
    image: "/images/promise-real-spaces.png",
    description: "We work in your actual space, ensuring perfect fit and functionality that transforms your environment."
  }, {
    title: "Unique Results",
    image: "/images/promise-unique-results.png",
    description: "No cookie-cutter solutions. Each piece is uniquely designed to match your style and needs."
  }];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % promises.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return <div className="relative">
      <ScrollReveal>
        <div className="relative h-80 bg-black/5 rounded-none overflow-hidden backdrop-blur-none border-none">
          {promises.map((promise, index) => <div key={index} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex flex-col h-full p-6">
                <div className="flex-1 flex items-center justify-center mb-6">
                  <div className="w-40 h-40 rounded-full overflow-hidden bg-accent-primary/10 shadow-2xl shadow-amber-500/50">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img src={promise.image} alt={`${promise.title} - Professional woodworking craftsmanship and custom furniture making in Dublin`} className="w-full h-full object-cover scale-150" />
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="font-heading text-text-primary text-xl mb-3 font-light">
                    {promise.title}
                  </h3>
                  <p className="text-text-secondary text-base leading-relaxed font-light mt-[10px] mb-16">
                    {promise.description}
                  </p>
                </div>
              </div>
            </div>)}
          
        </div>
      </ScrollReveal>
    </div>;
};
export default PromiseCarousel;