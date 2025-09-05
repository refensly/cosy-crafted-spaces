import { useState, useEffect, useRef, useCallback } from 'react';

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

const AnimatedProcess = ({ steps, className = '', delay = 2500 }: AnimatedProcessProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start animation cycle
  const startAnimationCycle = useCallback(() => {
    if (steps.length <= 1) return;
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % steps.length);
        setIsVisible(true);
      }, 400);
    }, delay);
  }, [steps.length, delay]);

  // Reset animation when component comes into view
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset to first step and restart animation
            setCurrentIndex(0);
            setIsVisible(true);
            startAnimationCycle();
          } else {
            // Clear interval when not visible to save resources
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startAnimationCycle]);

  // Start animation on mount
  useEffect(() => {
    startAnimationCycle();
  }, [startAnimationCycle]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const currentStep = steps[currentIndex];

  return (
    <div ref={ref} className={`scroll-reveal ${className}`}>
      <div className="text-center">
        {/* Fixed height container to prevent layout shifts */}
        <div className="relative min-h-[320px] md:min-h-[360px] flex items-center justify-center">
          <div 
            className={`transition-opacity duration-400 ${
              isVisible ? 'opacity-100' : 'opacity-0'
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
      </div>
    </div>
  );
};

export default AnimatedProcess;