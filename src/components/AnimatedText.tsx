import { useState, useEffect } from 'react';

interface AnimatedTextItem {
  heading: string;
  body?: string;
}

interface AnimatedTextProps {
  texts: (string | AnimatedTextItem)[];
  className?: string;
  delay?: number;
}

const AnimatedText = ({ texts, className = '', delay = 3000 }: AnimatedTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (texts.length <= 1) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsVisible(true);
      }, 300);
    }, delay);

    return () => clearInterval(interval);
  }, [texts.length, delay]);

  const currentText = texts[currentIndex];
  const isTextObject = typeof currentText === 'object' && currentText !== null;

  return (
    <div 
      className={`transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} ${className}`}
    >
      {isTextObject ? (
        <>
          <div className="font-heading font-light text-text-primary text-2xl md:text-4xl">
            {currentText.heading}
          </div>
          {currentText.body && (
            <p className="text-text-secondary mt-4 text-lg md:text-xl leading-relaxed">
              {currentText.body}
            </p>
          )}
        </>
      ) : (
        <span>{currentText as string}</span>
      )}
    </div>
  );
};

export default AnimatedText;