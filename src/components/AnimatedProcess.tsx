import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface AnimatedProcessProps {
  steps: ProcessStep[];
  className?: string;
  delay?: number;
}

const AnimatedProcess = ({ steps, className = '', delay = 3500 }: AnimatedProcessProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (steps.length <= 1) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % steps.length);
        setIsVisible(true);
      }, 400);
    }, delay);

    return () => clearInterval(interval);
  }, [steps.length, delay]);

  const currentStep = steps[currentIndex];

  return (
    <ScrollReveal className={className}>
      <div className="text-center">
        <div 
          className={`transition-all duration-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="space-y-6 max-w-md mx-auto">
            {/* Step indicator */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-1 h-16 bg-gradient-to-b from-accent-primary to-accent-secondary rounded-full"></div>
              <div className="text-left">
                <div className="text-accent-primary font-heading font-bold text-sm tracking-wider opacity-70">
                  STEP
                </div>
                <div className="text-accent-primary font-heading font-bold text-3xl">
                  {currentStep.number}
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="space-y-4">
              <h3 className="font-heading font-light text-text-primary text-2xl md:text-3xl">
                {currentStep.title}
              </h3>
              <p className="text-text-secondary text-lg font-light leading-relaxed">
                {currentStep.description}
              </p>
            </div>
          </div>
        </div>
        
        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-accent-primary w-8' 
                  : 'bg-accent-primary/30 hover:bg-accent-primary/50'
              }`}
            />
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default AnimatedProcess;