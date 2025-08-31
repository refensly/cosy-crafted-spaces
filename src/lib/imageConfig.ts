// Image Configuration for Easy Management
// Replace images by simply updating the paths in this file

export const imageConfig = {
  // Hero and Main Images
  hero: {
    background: '/images/hero-background.png',
    doorLeft: '/images/hero-door-left.png',
    doorRight: '/images/hero-door-right.png'
  },

  // Pain & Value Section
  painValue: '/images/pain-value.jpg',

  // Capabilities Images
  capabilities: {
    bars: '/images/capability-bars.jpg',
    homeBars: '/images/capability-home-bars.jpg',
    outdoor: '/images/capability-outdoor.jpg',
    furniture: '/images/capability-furniture.jpg'
  },

  // Project Images
  projects: {
    summit: '/images/project-summit-inn.jpg',
    abbey: '/images/project-abbey.jpg',
    findlaters: '/images/project-findlaters.jpg',
    
    // MAMO Project Gallery
    mamo: {
      main: '/images/project-mamo-1.png',
      gallery: [
        '/images/project-mamo-1.png',
        '/images/project-mamo-2.png',
        '/images/project-mamo-3.png',
        '/images/project-mamo-4.png'
      ]
    },

    // Riverside Bar Project Gallery  
    riversideBar: {
      main: '/images/project-riverside-bar-1.png',
      gallery: [
        '/images/project-riverside-bar-1.png',
        '/images/project-riverside-bar-2.png',
        '/images/project-riverside-bar-3.png'
      ]
    },

    // Findlaters Project
    findlatersGallery: ['/images/project-findlaters-2.png']
  },

  // Team & Social Proof
  maker: '/images/maker-profile.jpg',
  testimonial: '/images/client-testimonial.jpg',

  // Promise/Feature Icons
  promises: {
    precision: '/images/promise-precision.png',
    realSpaces: '/images/promise-real-spaces.png',
    uniqueResults: '/images/promise-unique-results.png'
  },

  // Custom Bar Interior
  customBar: '/images/custom-bar-interior.png'
};

// Helper function to get image path
export const getImagePath = (path: string): string => {
  return path;
};

// Helper to get project gallery images
export const getProjectGallery = (projectKey: keyof typeof imageConfig.projects): string[] => {
  const project = imageConfig.projects[projectKey];
  if (typeof project === 'object' && 'gallery' in project) {
    return project.gallery;
  }
  if (Array.isArray(project)) {
    return project;
  }
  return [typeof project === 'string' ? project : ''];
};