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
          <div className="space-y-8 max-w-lg mx-auto">
            {/* Step indicator - Minimalistic glowing digit */}
            <div className="flex items-center justify-center">
              <div className="text-accent-primary font-heading font-light text-4xl md:text-5xl tracking-wider relative">
                <span className="relative inline-block">
                  {currentStep.number}
                  <div className="absolute inset-0 text-accent-primary opacity-40 blur-sm">
                    {currentStep.number}
                  </div>
                  <div className="absolute inset-0 text-accent-primary opacity-20 blur-md">
                    {currentStep.number}
                  </div>
                </span>
              </div>
            </div>
            
            {/* Content */}
            <div className="space-y-4 text-center">
              <h3 className="font-heading font-light text-text-primary text-3xl md:text-4xl">
                {currentStep.title}
              </h3>
              <p className="text-text-secondary text-base md:text-lg font-light leading-relaxed max-w-md mx-auto">
                {currentStep.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default AnimatedProcess;