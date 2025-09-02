import { useState, useEffect } from 'react';

interface AnimatedTextProps {
  texts: string[];
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

  return (
    <span 
      className={`transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} ${className}`}
    >
      {texts[currentIndex]}
    </span>
  );
};

export default AnimatedText;