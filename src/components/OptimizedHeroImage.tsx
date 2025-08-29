import { useState, useEffect } from 'react'

// LQIP (Low Quality Image Placeholder) - tiny blurred base64
const LQIP_BASE64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyiwP"

// Use the same desktop background image for all devices
const HERO_IMAGE_URL = '/lovable-uploads/7928fc98-36e8-4b94-bd48-06681d62fc6f.png'

interface OptimizedHeroImageProps {
  className?: string
  style?: React.CSSProperties
}

export const OptimizedHeroImage: React.FC<OptimizedHeroImageProps> = ({ 
  className = "", 
  style = {} 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    // Preload the hero image
    const img = new Image()
    img.onload = () => setImageLoaded(true)
    img.src = HERO_IMAGE_URL
  }, [])

  return (
    <div 
      className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500 ${className}`}
      style={{
        ...style,
        backgroundImage: imageLoaded 
          ? `url('${HERO_IMAGE_URL}')`
          : `url('${LQIP_BASE64}')`,
        filter: imageLoaded ? 'none' : 'blur(2px)',
      }}
    />
  )
}