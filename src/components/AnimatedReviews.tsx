import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';

interface Review {
  text: string;
  author: string;
  rating?: number;
}

interface AnimatedReviewsProps {
  reviews: Review[];
  className?: string;
  delay?: number;
}

const AnimatedReviews = ({ reviews, className = '', delay = 4000 }: AnimatedReviewsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (reviews.length <= 1) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
        setIsVisible(true);
      }, 400);
    }, delay);

    return () => clearInterval(interval);
  }, [reviews.length, delay]);

  const currentReview = reviews[currentIndex];

  return (
    <ScrollReveal className={className}>
      {/* Fixed height container to prevent layout shifts */}
      <div className="relative h-[300px] md:h-[280px] flex items-center justify-center">
        <div 
          className={`transition-opacity duration-400 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="text-center space-y-6">
            {currentReview.rating && (
              <div className="flex justify-center text-accent-primary">
                {[...Array(currentReview.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            )}
            
            <blockquote className="text-xl md:text-2xl text-text-primary font-light leading-relaxed max-w-4xl mx-auto">
              "{currentReview.text}"
            </blockquote>
            
            <cite className="text-text-secondary font-normal text-base">
              — {currentReview.author}
            </cite>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default AnimatedReviews;