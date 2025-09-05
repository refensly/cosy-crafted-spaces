import { useState, useEffect } from 'react';

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

const AnimatedProcess = ({ steps, className = '', delay = 3000 }: AnimatedProcessProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (steps.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % steps.length);
    }, delay);

    return () => clearInterval(interval);
  }, [steps.length, delay]);

  const currentStep = steps[currentIndex];

  if (!currentStep) {
    return null;
  }

  return (
    <div className={`scroll-reveal ${className}`}>
      <div className="text-center">
        <div className="min-h-[320px] md:min-h-[360px] flex items-center justify-center">
          <div className="space-y-8 max-w-lg mx-auto">
            {/* Step number */}
            <div className="flex items-center justify-center">
              <div className="text-accent-primary font-heading font-light text-4xl md:text-5xl tracking-wider">
                {currentStep.number}
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
  );
};

export default AnimatedProcess;