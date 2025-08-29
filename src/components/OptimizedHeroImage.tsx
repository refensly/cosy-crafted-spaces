import { useState, useEffect } from 'react'

// LQIP (Low Quality Image Placeholder) - tiny blurred base64
const LQIP_BASE64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyiwP"

interface OptimizedHeroImageProps {
  className?: string
  style?: React.CSSProperties
}

export const OptimizedHeroImage: React.FC<OptimizedHeroImageProps> = ({ 
  className = "", 
  style = {} 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  
  // Define the hero image URL inside the component to avoid scoping issues
  const heroImageUrl = '/lovable-uploads/7928fc98-36e8-4b94-bd48-06681d62fc6f.png'

  useEffect(() => {
    // Preload the hero image
    const img = new Image()
    img.onload = () => setImageLoaded(true)
    img.src = heroImageUrl
  }, [])

  return (
    <div 
      className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500 ${className}`}
      style={{
        ...style,
        backgroundImage: imageLoaded 
          ? `url('${heroImageUrl}')`
          : `url('${LQIP_BASE64}')`,
        filter: imageLoaded ? 'none' : 'blur(2px)',
      }}
    />
  )
}