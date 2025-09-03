import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMobileMenu } from '@/contexts/MobileMenuContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ScrollReveal from '@/components/ScrollReveal';
import PromiseCarousel from '@/components/PromiseCarousel';
import CapabilitiesCarousel from '@/components/CapabilitiesCarousel';
import AnimatedText from '@/components/AnimatedText';
import AnimatedReviews from '@/components/AnimatedReviews';
import AnimatedProcess from '@/components/AnimatedProcess';
import { imageConfig } from '@/lib/imageConfig';
const Index = () => {
  const {
    toast
  } = useToast();
  const {
    mobileMenuOpen
  } = useMobileMenu();
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Portfolio data structure
  const portfolioCategories = [{
    id: 'bars-restaurants',
    title: 'Hospitality Spaces',
    description: 'Commercial hospitality spaces',
    projects: [{
      id: 'summit-inn',
      title: 'The Summit Inn',
      subtitle: 'Custom bar design and production',
      caption: 'Premium walnut bar with brass fixtures',
      images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg']
    }, {
      id: 'mamo',
      title: 'MAMO',
      subtitle: 'Contemporary restaurant interior',
      caption: 'Modern dining space with custom furnishings',
      images: ['/images/project-mamo-1.png', '/images/project-mamo-2.png', '/images/project-mamo-3.png', '/images/project-mamo-4.png']
    }, {
      id: 'riverside-bar',
      title: 'Riverside Bar',
      subtitle: 'Waterfront bar installation',
      caption: 'Outdoor-inspired bar design',
      images: ['/images/project-riverside-bar-1.png', '/images/project-riverside-bar-2.png', '/images/project-riverside-bar-3.png']
    }, {
      id: 'peggys',
      title: 'Peggy\'s St Stephens',
      subtitle: 'Traditional pub refurbishment',
      caption: 'Classic Irish pub with modern touches',
      images: ['/images/project-riverside-bar-1.png', 'placeholder2.jpg', 'placeholder3.jpg', 'placeholder4.jpg', 'placeholder5.jpg']
    }, {
      id: 'casa-clontarf',
      title: 'Casa Clontarf',
      subtitle: 'Mediterranean restaurant',
      caption: 'Warm, inviting dining atmosphere',
      images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg']
    }, {
      id: 'green-phone-box',
      title: 'The Green Phone Box',
      subtitle: 'Unique themed bar',
      caption: 'Creative concept bar design',
      images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg']
    }]
  }, {
    id: 'outdoor-spaces',
    title: 'Outdoor Spaces',
    description: 'Gardens, decking, and outdoor living',
    projects: [{
      id: 'thormanby-lawns',
      title: 'Thormanby Lawns',
      subtitle: 'Landscape garden design',
      caption: 'Extensive outdoor living space',
      images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg']
    }, {
      id: 'pergola-decking',
      title: 'Pergola Decking',
      subtitle: 'Covered outdoor area',
      caption: 'Timber pergola with integrated seating',
      images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg', 'placeholder4.jpg']
    }, {
      id: 'howth-decking',
      title: 'Howth Decking',
      subtitle: 'Coastal deck installation',
      caption: 'Weather-resistant decking solution',
      images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg']
    }, {
      id: 'raheny-patio',
      title: 'Raheny Patio',
      subtitle: 'Stone patio design',
      caption: 'Natural stone outdoor entertaining area',
      images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg']
    }, {
      id: 'decking-2024',
      title: 'Decking 2024',
      subtitle: 'Modern deck construction',
      caption: 'Contemporary outdoor platform',
      images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg', 'placeholder4.jpg']
    }, {
      id: 'treehouse',
      title: 'Children\'s Treehouse',
      subtitle: 'Custom playground structure',
      caption: 'Safe and imaginative play space',
      images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg']
    }, {
      id: 'raheny-garage',
      title: 'Raheny Garage',
      subtitle: 'Garage conversion project',
      caption: 'Multi-purpose outdoor building',
      images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg']
    }, {
      id: 'container-home',
      title: 'Container Home',
      subtitle: 'Shipping container conversion',
      caption: 'Innovative living space solution',
      images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg', 'placeholder4.jpg']
    }, {
      id: 'archideo',
      title: 'Archideo',
      subtitle: 'Architectural outdoor feature',
      caption: 'Statement outdoor installation',
      images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg']
    }]
  }, {
    id: 'custom-pieces',
    title: 'Custom Pieces',
    description: 'Bespoke furniture and installations',
    projects: [{
      id: 'art-studio',
      title: 'Art Studio',
      subtitle: 'Custom studio furniture',
      caption: 'Tailored workspace solutions',
      images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg']
    }]
  }];
  const handleCategoryClick = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };
  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };
  const handleCloseModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };
  const handlePrevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex(prev => prev === 0 ? selectedProject.images.length - 1 : prev - 1);
    }
  };
  const handleNextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex(prev => prev === selectedProject.images.length - 1 ? 0 : prev + 1);
    }
  };
  const scrollToContact = () => {
    document.getElementById('contact-form')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedProject) {
        if (e.key === 'Escape') {
          handleCloseModal();
        } else if (e.key === 'ArrowLeft') {
          handlePrevImage();
        } else if (e.key === 'ArrowRight') {
          handleNextImage();
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedProject]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('https://formspree.io/f/myzdervr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.contact,
          message: formData.message
        })
      });
      if (response.ok) {
        setFormSubmitted(true);
        setFormData({
          name: '',
          contact: '',
          message: ''
        }); // Clear form
        toast({
          title: "Thanks for reaching out!",
          description: "We'll get back to you within 24 hours."
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const capabilities = [{
    title: "Hospitality Spaces",
    image: imageConfig.capabilities.bars,
    description: "Custom outdoor bar installations"
  }, {
    title: "Outdoor Spaces",
    image: imageConfig.capabilities.homeBars,
    description: "Sophisticated home entertainment spaces"
  }, {
    title: "Custom Pieces",
    image: imageConfig.capabilities.outdoor,
    description: "Complete outdoor living solutions"
  }];
  const projects = [{
    id: 'summit-inn-recent',
    title: "Decking",
    subtitle: "Custom Bar Design and Production",
    caption: "Premium walnut bar with brass fixtures and custom lighting design",
    image: imageConfig.projects.summit,
    images: ['summit1.jpg', 'summit2.jpg', 'summit3.jpg', 'summit4.jpg']
  }, {
    id: 'abbey-tavern-recent',
    title: "The Green Phone Box",
    subtitle: "Walnut Backlit Bar",
    caption: "Sophisticated backlit bar featuring rich walnut wood and integrated LED lighting",
    image: imageConfig.projects.abbey,
    images: ['abbey1.jpg', 'abbey2.jpg', 'abbey3.jpg']
  }, {
    id: 'findlaters-recent',
    title: "Home Container",
    subtitle: "Interior Shelving in Solid Oak",
    caption: "Custom solid oak shelving system with precision joinery and natural finish",
    image: imageConfig.projects.findlaters,
    images: ['/images/project-mamo-1.png', '/images/project-findlaters-2.png', 'findlaters3.jpg', 'findlaters4.jpg']
  }];
  const processSteps = [{
    number: "1",
    title: "Consultation",
    description: "Share your ideas, discuss options"
  }, {
    number: "2",
    title: "Design",
    description: "Custom plans created"
  }, {
    number: "3",
    title: "Crafting",
    description: "Built by hand, premium materials"
  }, {
    number: "4",
    title: "Installation",
    description: "Delivered and fitted by us"
  }];
  return <div className="min-h-screen">
      <Header />
      
      {/* Mobile menu overlay for main content */}
      <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-30 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} style={{
      top: 0
    }} />
      
      <div className={`transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-20' : 'opacity-100'}`}>
        <Hero />
      </div>

      {/* Section 2: Pain → Value - Minimal Style */}
      <section id="pain-value-section" className="py-12 md:pt-20 md:pb-20 lg:pt-32 lg:pb-32" style={{
      background: 'var(--gradient-brown-primary)'
    }}>
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">
            <ScrollReveal>
              <div className="space-y-6 md:space-y-8">
                <h2 className="font-heading text-text-primary text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
                  Not another mass-production look
                </h2>
                <p className="text-lg md:text-xl text-text-secondary font-light leading-relaxed">
                  If you want something nobody else has, we design and build it for you. 
                  Premium materials, made locally.
                </p>
                <div className="space-y-4 md:space-y-6 mt-8 md:mt-12">
                  {["One-of-a-kind design (never repeated)", "Premium hardwoods & brass", "Built in Ireland, built to last"].map((item, index) => <ScrollReveal key={index} delay={index * 100}>
                      <div className="flex items-center space-x-3 md:space-x-4">
                        <div className="w-1 h-1 bg-accent-primary rounded-full opacity-60 flex-shrink-0"></div>
                        <span className="text-text-primary font-light text-base md:text-lg">{item}</span>
                      </div>
                    </ScrollReveal>)}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="relative mt-8 lg:mt-0">
                <div className="w-full rounded-none overflow-hidden">
                  <ScrollReveal delay={250}>
                     <img src="/images/custom-bar-interior.png" alt="Custom bar interior with warm lighting and wood finishes" className="w-full h-64 md:h-80 lg:h-96 object-cover object-center" loading="lazy" />
                  </ScrollReveal>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Promise Section - Minimal Clean */}
      <section className="py-16 md:py-32 lg:py-40" style={{
      background: 'var(--gradient-brown-primary)'
    }}>
        <div className="container mx-auto md:px-6 max-w-6xl px-[28px] my-[3px]">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-20 my-[30px]">
              <h2 className="font-heading text-text-primary text-center text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6 md:mb-8">Our Promise</h2>
            </div>
          </ScrollReveal>
          
          {/* Mobile Animated Version */}
          <div className="md:hidden mb-20 md:mb-16 lg:mb-20">
            <PromiseCarousel />
          </div>
          
          {/* Desktop Grid Version - Minimal */}
          <div className="hidden md:grid md:grid-cols-3 gap-16 lg:gap-20 mb-12 md:mb-16 lg:mb-20">
            <ScrollReveal className="text-center">
              <div className="space-y-8">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-accent-primary/20 to-accent-primary/10">
                  <img src="/images/promise-precision.png" alt="Precision craftsmanship tools and measurements" className="w-full h-full object-cover opacity-80" />
                </div>
                <h3 className="font-heading text-text-primary text-2xl font-light">Precision</h3>
                <p className="text-text-secondary text-base font-light leading-relaxed">
                  Every measurement, every cut, every joint crafted with meticulous attention to detail.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal className="text-center" delay={100}>
              <div className="space-y-8">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-accent-primary/20 to-accent-primary/10">
                  <img src="/images/promise-real-spaces.png" alt="Real customer spaces transformed with custom woodwork" className="w-full h-full object-cover opacity-80" />
                </div>
                <h3 className="font-heading text-text-primary text-2xl font-light">Real Spaces</h3>
                <p className="text-text-secondary text-base font-light leading-relaxed">
                  We work in your actual space, ensuring perfect fit and functionality.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal className="text-center" delay={200}>
              <div className="space-y-8">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-accent-primary/20 to-accent-primary/10">
                  <img src="/images/promise-unique-results.png" alt="Unique custom woodwork designs showcasing creativity" className="w-full h-full object-cover opacity-80" />
                </div>
                <h3 className="font-heading text-text-primary text-2xl font-light">Unique Results</h3>
                <p className="text-text-secondary text-base font-light leading-relaxed">
                  No cookie-cutter solutions. Each piece is uniquely designed to match your style.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="text-center space-y-4 md:space-y-6 mb-12 md:mb-16">
              <h3 className="font-heading text-text-primary text-xl md:text-2xl lg:text-3xl font-light">
                Producing Quality Results
              </h3>
              <p className="text-base md:text-lg text-text-secondary font-light max-w-4xl mx-auto leading-relaxed px-[28px] mt-[10px] mb-2 md:my-[10px]">
                Careful planning, premium materials, and meticulous handcrafting.
              </p>
            </div>
          </ScrollReveal>

          {/* CTA Button - Minimal */}
          <div className="text-center">
            <ScrollReveal delay={250}>
              <button onClick={scrollToContact} className="btn-rounded py-[4px] mx-[3px] my-[4px]">
                Start Your Project
              </button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 3: Interactive Portfolio */}
      <section id="work" className="py-12 md:py-16 lg:py-20 relative overflow-hidden" style={{
      background: 'var(--gradient-brown-primary)'
    }}>
        
        <div className="container mx-auto px-4 md:px-12 lg:px-16 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-8 md:mb-16">
              <h2 className="font-heading font-bold text-text-primary text-center text-2xl md:text-4xl lg:text-5xl font-bold leading-snug mb-4 md:mb-6">
                What We Create
              </h2>
              <div className="w-16 md:w-24 h-0.5 bg-accent-primary mx-auto mb-6 md:mb-8"></div>
            </div>
          </ScrollReveal>
          
          <div className="space-y-3 md:space-y-4 max-w-3xl lg:max-w-5xl mx-auto">
            {portfolioCategories.map((category, categoryIndex) => <div key={category.id} className="w-full">
                <ScrollReveal delay={categoryIndex * 100}>
                  <div className={`
                      relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 ease-out
                      bg-gradient-to-br from-bg-section-alt/80 via-bg-section-alt-2/75 to-bg-section-alt/80
                      backdrop-blur-md border border-bg-section-alt/60 shadow-xl
                      border-b-2 border-b-accent-primary/30 px-4 md:px-6 py-4 md:py-5
                      hover:shadow-accent-primary/30 hover:shadow-[0_20px_40px_-12px_rgba(197,156,87,0.35)]
                      hover:border-accent-primary/50 hover:border-b-accent-primary/60 hover:scale-[1.01] 
                      hover:bg-gradient-to-br hover:from-bg-section-alt-2/90 hover:via-bg-section-alt/85 hover:to-bg-section-alt-2/90
                      ${expandedCategory === category.id ? 'shadow-accent-primary/40 shadow-[0_25px_50px_-12px_rgba(197,156,87,0.4)] border-accent-primary/70 border-b-accent-primary/80 bg-gradient-to-br from-bg-section-alt-2/90 via-bg-section-alt/85 to-bg-section-alt-2/90' : ''}
                    `} onClick={() => handleCategoryClick(category.id)}>
                    {/* Premium inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent"></div>
                    
                    {/* Active state accent line */}
                    {expandedCategory === category.id && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-primary to-transparent"></div>}
                    
                    <div className="relative px-2 md:px-3 py-2 md:py-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-heading font-bold text-white text-lg md:text-xl lg:text-2xl mb-1 md:mb-2 tracking-tight">
                            {category.title}
                          </h3>
                          <p className="text-gray-300 text-sm md:text-base font-medium">{category.description}</p>
                        </div>
                        <div className={`transition-all duration-300 ${expandedCategory === category.id ? 'text-accent-primary' : 'text-gray-400'}`}>
                          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${expandedCategory === category.id ? 'bg-accent-primary' : 'bg-gray-400'}`}></div>
                        </div>
                      </div>
                    
                    {/* Accordion Content */}
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${expandedCategory === category.id ? 'max-h-[1500px] opacity-100 mt-6 md:mt-8' : 'max-h-0 opacity-0'}`}>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {(category.id === 'bars-restaurants' && isMobile === true ?
                      // On mobile, show only 3 specific projects for hospitality spaces
                      category.projects.filter(p => ['summit-inn', 'riverside-bar', 'peggys'].includes(p.id)) : category.id === 'outdoor-spaces' && isMobile === true ?
                      // On mobile, show only 4 specific projects for outdoor spaces
                      category.projects.filter(p => ['thormanby-lawns', 'pergola-decking', 'howth-decking', 'raheny-patio'].includes(p.id)) : category.projects).map((project, projectIndex) => <div key={project.id} className="bg-bg-section-alt/50 rounded-xl overflow-hidden cursor-pointer group hover:bg-bg-section-alt/75 transition-all duration-300 border border-bg-section-alt/30 hover:border-accent-primary/50 border-b-2 border-b-accent-primary/40 hover:border-b-accent-primary/70 p-1 hover:shadow-lg hover:shadow-accent-primary/20" onClick={e => {
                        e.stopPropagation();
                        handleProjectClick(project);
                      }}>
                            <div className="relative h-48 bg-gradient-to-br from-bg-section-alt-2 to-bg-section-alt overflow-hidden">
                              <ScrollReveal delay={projectIndex * 50}>
                                <img src={project.images[0]} alt={`${project.title} preview`} className="w-full h-full object-cover transform scale-110" loading="lazy" />
                              </ScrollReveal>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                              <div className="absolute bottom-4 left-4 right-4">
                                <div className="text-white font-medium text-sm opacity-70">Preview Image</div>
                              </div>
                            </div>
                            <div className="p-6">
                              <h4 className="font-heading font-bold text-text-primary mb-1 group-hover:text-accent-primary transition-colors">{project.title}</h4>
                              <p className="text-text-secondary text-sm">{project.subtitle}</p>
                            </div>
                          </div>)}
                      </div>
                    </div>
                  </div>
                  </div>
                </ScrollReveal>
              </div>)}
          </div>
        </div>
        
        {/* Project Modal */}
        {selectedProject && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in" onClick={handleCloseModal}>
            <div className="bg-gray-900 rounded-2xl max-w-4xl max-h-[80vh] w-full overflow-hidden shadow-2xl border border-gray-700/50 relative animate-scale-in" onClick={e => e.stopPropagation()}>
              {/* Close Button */}
              <button onClick={handleCloseModal} className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Modal Content */}
              <div className="p-8">
                <h2 className="font-heading font-bold text-white text-3xl mb-2">{selectedProject.title}</h2>
                <p className="text-gray-300 text-lg mb-8">{selectedProject.caption}</p>
                
                {/* Image Carousel */}
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl overflow-hidden relative">
                    <img src={selectedProject.images[currentImageIndex]} alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`} className="w-full h-full object-cover transform scale-110" />
                  </div>
                  
                  {/* 2025 Navigation - Clean Indicators */}
                  {selectedProject.images.length > 1 && <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedProject.images.map((_, index) => <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'}`} />)}
                    </div>}
                </div>
                
                {/* Image Thumbnails */}
                {selectedProject.images.length > 1 && <div className="flex gap-2 mt-4 justify-center items-center overflow-x-auto px-4 py-2 min-h-[50px]">
                    {selectedProject.images.map((_, index) => <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all ${currentImageIndex === index ? 'ring-2 ring-white/80 opacity-100' : 'opacity-60 hover:opacity-80'}`}>
                        <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-700 relative overflow-hidden">
                          <img src={selectedProject.images[index]} alt={`${selectedProject.title} - Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                      </button>)}
                  </div>}
              </div>
            </div>
          </div>}
      </section>

      {/* Section 4: Why Custom > Standard */}
      <section className="py-12 md:py-16 lg:py-20" style={{
      background: 'var(--gradient-brown-primary)'
    }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            
            {/* Headline */}
            <ScrollReveal>
              <h2 className="font-heading font-bold text-text-primary text-2xl md:text-4xl lg:text-5xl text-center font-bold leading-snug mb-4 md:mb-6">
                Why choose custom over mass-market
              </h2>
              <div className="w-16 md:w-24 h-0.5 bg-accent-primary mx-auto mb-6 md:mb-8"></div>
            </ScrollReveal>
            
            {/* Intro Text */}
            <ScrollReveal delay={100}>
              <p className="text-base md:text-xl lg:text-2xl text-text-secondary leading-relaxed mb-6 md:mb-8 text-center max-w-4xl mx-auto">
                Most furniture today is disposable. We build for decades — each piece unique, designed and crafted in Ireland from premium oak, walnut, and brass.
              </p>
            </ScrollReveal>

            {/* 2025 Comparison - Cardless, Clean Dividers */}
            <ScrollReveal delay={200}>
              <div className="space-y-6 md:space-y-8 mb-8 md:mb-12">
                {/* Header */}
                <div className="grid grid-cols-2 gap-8 md:gap-16 lg:gap-32 text-center mb-6 md:mb-8">
                  <div>
                    <h3 className="text-text-muted font-heading font-light text-lg md:text-xl lg:text-2xl">mass market</h3>
                  </div>
                  <div>
                    <h3 className="text-accent-primary font-heading font-light text-lg md:text-xl lg:text-2xl">custom made</h3>
                  </div>
                </div>
                
                {/* Comparison rows - Clean spacing */}
                <div className="space-y-4 md:space-y-6">
                  {[{
                  standard: "same as everyone",
                  custom: "one-of-a-kind design"
                }, {
                  standard: "machine produced",
                  custom: "hand crafted"
                }, {
                  standard: "cheap materials",
                  custom: "premium oak, walnut, brass"
                }, {
                  standard: "disposable",
                  custom: "heirloom quality"
                }, {
                  standard: "flat-packed",
                  custom: "installed by craftsmen"
                }].map((row, index) => <ScrollReveal key={index} delay={250 + index * 100}>
                      <div className="grid grid-cols-2 gap-8 md:gap-16 lg:gap-32 text-center py-4 md:py-6 hover:bg-text-primary/[0.02] transition-colors duration-300">
                        <div className="text-text-muted font-light text-base md:text-lg lg:text-xl">
                          {row.standard}
                        </div>
                        <div className="text-text-primary font-light text-base md:text-lg lg:text-xl">
                          {row.custom}
                        </div>
                      </div>
                      {index < 4 && <div className="w-full h-px bg-gradient-to-r from-transparent via-text-primary/10 to-transparent"></div>}
                    </ScrollReveal>)}
                </div>
              </div>
            </ScrollReveal>

            {/* 2025 Animated Benefits - Clean, Borderless */}
            <ScrollReveal delay={300}>
              <div className="text-center space-y-12 mb-6">
                
                {/* Main animated text */}
                <div className="pt-8">
                  <AnimatedText texts={[{
                  heading: "unique every time",
                  body: "Every piece is crafted specifically for your space, ensuring no two projects are ever the same."
                }, {
                  heading: "local craftsmanship",
                  body: "Supporting skilled artisans in our community while delivering authentic, handcrafted quality."
                }, {
                  heading: "natural materials",
                  body: "We source sustainable, high-quality wood and materials that age beautifully over time."
                }, {
                  heading: "built to last",
                  body: "Traditional joinery techniques and attention to detail ensure your furniture becomes a family heirloom."
                }]} delay={3500} />
                </div>
              </div>
            </ScrollReveal>

            {/* CTA Button - After comparison table */}
            <ScrollReveal delay={400}>
              <div className="text-center">
                <button onClick={scrollToContact} className="btn-rounded">
                  get free consultation
                </button>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Section 5: Portfolio */}
      <section className="max-sm:py-6 py-16 lg:py-20" style={{
      background: 'var(--gradient-brown-primary)'
    }}>
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-text-primary text-center max-sm:text-[clamp(22px,5vw,28px)] max-sm:font-bold max-sm:leading-snug max-sm:mb-4 mb-6 text-4xl md:text-5xl">
              Recent projects
            </h2>
            <div className="w-24 h-0.5 bg-accent-primary mx-auto mb-8"></div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => <ScrollReveal key={index} delay={index * 100}>
                <div className="group cursor-pointer bg-gradient-to-br from-bg-section-alt/60 via-bg-section-alt-2/50 to-bg-section-alt/60 backdrop-blur-sm border border-accent-primary/30 rounded-2xl shadow-xl shadow-accent-primary/30 hover:shadow-2xl hover:shadow-accent-primary/50 hover:border-accent-primary/60 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 overflow-hidden" onClick={() => handleProjectClick(project)}>
                  <div className="relative overflow-hidden">
                    <ScrollReveal delay={index * 100}>
                      <img src={project.image} alt={project.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    </ScrollReveal>
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-main/95 via-bg-main/40 to-transparent opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="max-sm:p-5 p-6 w-full">
                        <h3 className="font-heading font-bold text-text-primary max-sm:text-lg max-sm:mb-1 mb-2 text-xl">
                          {project.title}
                        </h3>
                        <p className="text-text-secondary max-sm:text-[14px] max-sm:mb-3 text-sm mb-4 leading-relaxed">{project.subtitle}</p>
                        <button className="btn-rounded">
                          View Project
                        </button>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </ScrollReveal>)}
          </div>
          
          {/* CTA Button */}
          <div className="text-center mt-16">
            <ScrollReveal delay={300}>
               <button onClick={scrollToContact} className="btn-rounded">
                 Start Your Project
               </button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2025 Reviews Section - Animated, Clean */}
      <section id="reviews" className="py-16 md:py-24" style={{
      background: 'var(--gradient-brown-primary)'
    }}>
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-heading font-light text-text-primary text-center text-4xl md:text-6xl mb-16">
              what our clients say
            </h2>
          </ScrollReveal>

          {/* Animated Reviews */}
          <div className="max-w-5xl mx-auto mb-16">
            <AnimatedReviews reviews={[{
            text: "Absolutely stunning work. The attention to detail and quality of craftsmanship exceeded our expectations. This bar is the centerpiece of our venue.",
            author: "The Summit Inn",
            rating: 5
          }, {
            text: "Perfect craftsmanship. Built exactly to our specifications.",
            author: "Abbey Tavern",
            rating: 5
          }, {
            text: "Our customers constantly compliment the bar design.",
            author: "Findlaters",
            rating: 5
          }, {
            text: "Exceptional attention to detail. Worth every penny.",
            author: "Private Client",
            rating: 5
          }]} delay={4000} />
          </div>

          {/* CTA Button - 2025 Style */}
          <ScrollReveal delay={400}>
            <div className="text-center">
              <button onClick={() => scrollToContact()} className="btn-rounded">
                Let's Build Yours
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* New Section: What We Build */}
      <section className="max-sm:py-6 py-16 lg:py-20" style={{
      background: 'var(--gradient-brown-primary)'
    }}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 max-sm:gap-4 gap-6 lg:gap-8 items-center">
            <ScrollReveal>
              <div>
                <h2 className="font-heading font-bold text-text-primary max-sm:text-[clamp(22px,5vw,28px)] max-sm:font-bold max-sm:leading-snug max-sm:mb-4 mb-6 text-4xl md:text-5xl">
                  What We Build
                </h2>
                <div className="w-24 h-0.5 bg-accent-primary mb-8"></div>
                <p className="max-sm:text-[15px] max-sm:leading-relaxed max-sm:mb-4 text-xl text-text-secondary mb-6 leading-relaxed">
                  From full pub interiors to outdoor kitchens, from custom bars to one-off furniture — 
                  we design and craft everything to fit your exact space.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="relative max-sm:mt-2">
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 rounded-xl"></div>
                <div className="absolute inset-0 border border-accent-primary/30 rounded-xl"></div>
                <ScrollReveal delay={250}>
                  <img src={imageConfig.maker} alt="Craftsman working in workshop" className="w-full max-sm:max-h-[300px] h-80 lg:h-96 object-cover rounded-xl" loading="lazy" />
                </ScrollReveal>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
              </div>
            </ScrollReveal>
          </div>

          {/* CTA Button after What We Build */}
          <div className="text-center mt-16">
            <ScrollReveal delay={300}>
               <button onClick={scrollToContact} className="btn-rounded">
                 Let's Build Yours
               </button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* New Section: FAQ */}
      <section className="max-sm:py-6 py-16 lg:py-20" style={{
      background: 'var(--gradient-brown-primary)'
    }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="bg-bg-main rounded-xl max-sm:p-5 p-8">
                <h2 className="font-heading font-bold text-text-primary max-sm:text-[clamp(22px,5vw,28px)] max-sm:font-bold max-sm:leading-snug max-sm:mb-4 mb-6 text-4xl md:text-5xl">
                  Can I customize it for myself?
                </h2>
                <div className="w-24 h-0.5 bg-accent-primary mb-8"></div>
                <p className="max-sm:text-[15px] max-sm:leading-relaxed text-xl text-text-secondary leading-relaxed">
                  Yes. Every build starts with your vision. Size, finish, details — everything can be 
                  tailored for your space.
                </p>
              </div>
            </ScrollReveal>
          </div>
          
          {/* CTA Button - After FAQ */}
          <div className="text-center mt-12">
            <ScrollReveal delay={100}>
               <button onClick={scrollToContact} className="btn-rounded">
                 Get Your Quote
               </button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2025 Process Section - Animated, Clean */}
      <section id="process" className="py-12 md:py-16 lg:py-24" style={{
      background: 'var(--gradient-brown-primary)'
    }}>
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal>
            <h2 className="font-heading font-light text-text-primary text-center text-3xl md:text-4xl lg:text-6xl mb-12 md:mb-16">
              how we work
            </h2>
          </ScrollReveal>
          
          {/* Animated Process - All Devices */}
          <div className="max-w-2xl mx-auto">
            <AnimatedProcess steps={processSteps} delay={3500} />
          </div>
        </div>
      </section>

      {/* Section 8: Who Am I */}
      <section id="about" className="py-12 md:py-16 lg:py-20" style={{
      background: 'var(--gradient-brown-primary)'
    }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <ScrollReveal>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/30 rounded-xl"></div>
                <div className="absolute inset-0 border-2 border-accent-primary/40 rounded-xl transform rotate-1 shadow-lg shadow-accent-primary/20"></div>
                <ScrollReveal delay={100}>
                  <img src={imageConfig.maker} alt="Craftsman in workshop" className="relative w-full h-64 md:h-80 lg:h-96 object-cover rounded-xl" loading="lazy" />
                </ScrollReveal>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-xl"></div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="mt-6 lg:mt-0">
                <h2 className="font-heading font-bold text-text-primary text-2xl md:text-4xl lg:text-5xl font-bold leading-snug mb-4 md:mb-6">The Signature</h2>
                <div className="w-16 md:w-24 h-0.5 bg-accent-primary mb-6 md:mb-8"></div>
                <p className="text-base md:text-xl text-text-secondary mb-6 md:mb-8 leading-relaxed">Crafted from walnut, oak, and brass, each piece is unique and unrepeatable. Defined by precision and distinguished by detail, this work carries the signature of timeless craftsmanship, embodied in the hands of its maker</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 9: Contact Form */}
      <section id="contact-form" className="py-12 md:py-16 lg:py-20" style={{
      background: 'var(--gradient-brown-primary)'
    }}>
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-heading font-bold text-text-primary text-2xl md:text-4xl lg:text-5xl font-bold leading-snug mb-4 md:mb-6">Ready To Start?</h2>
              <div className="w-16 md:w-24 h-0.5 bg-accent-primary mx-auto mb-6 md:mb-8"></div>
              
              {formSubmitted ? <div className="bg-neutral-light/10 border border-neutral-light/20 rounded-xl p-8 md:p-12 text-center">
                  <h3 className="text-lg md:text-2xl font-semibold text-text-primary mb-3 md:mb-4">
                    Thanks for reaching out!
                  </h3>
                  <p className="text-text-secondary text-base md:text-lg">
                    We'll get back to you within 24 hours.
                  </p>
                </div> : <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  <div>
                    <Input type="text" placeholder="Your name" className="form-field h-12 md:h-16 text-base md:text-lg px-4 md:px-6 py-3 md:py-4 rounded-xl border-2 border-input/50 focus:border-accent-primary/60 bg-bg-main/50" value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} required />
                  </div>
                  <div>
                    <Input type="text" placeholder="Email or phone" className="form-field h-12 md:h-16 text-base md:text-lg px-4 md:px-6 py-3 md:py-4 rounded-xl border-2 border-input/50 focus:border-accent-primary/60 bg-bg-main/50" value={formData.contact} onChange={e => setFormData({
                  ...formData,
                  contact: e.target.value
                })} required />
                  </div>
                  <div>
                    <Textarea placeholder="Tell us about your project" className="form-field min-h-[120px] md:min-h-[160px] text-base md:text-lg px-4 md:px-6 py-3 md:py-4 rounded-xl border-2 border-input/50 focus:border-accent-primary/60 bg-bg-main/50 resize-none" value={formData.message} onChange={e => setFormData({
                  ...formData,
                  message: e.target.value
                })} />
                  </div>
                  <div className="space-y-4 md:space-y-6 pt-4">
                     <button type="submit" disabled={isSubmitting} className="btn-rounded w-full max-w-[280px] md:max-w-[320px] mx-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#2D2D2D]">
                       {isSubmitting ? "Sending..." : "Send Message"}
                     </button>
                    
                    <div className="text-center pt-2">
                      <p className="text-text-secondary text-sm md:text-base mb-3 md:mb-4">Or send directly via WhatsApp instead</p>
                      <a href="https://wa.me/353879380494" target="_blank" rel="noopener noreferrer" className="btn-rounded w-full max-w-[280px] md:max-w-[320px] mx-auto">WhatsApp Us</a>
                    </div>
                  </div>
                </form>}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F0F0F] text-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Main Footer Content */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12">
            {/* Company Branding */}
            <div className="col-span-2 lg:col-span-1">
              <h3 className="text-lg md:text-2xl font-heading font-bold mb-2">Tiny Outdoor Spaces</h3>
              
            </div>

            {/* Services Column */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wider mb-4">SERVICES</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('work')} className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide text-left">CUSTOM BARS</button></li>
                
                <li><button onClick={() => scrollToSection('work')} className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide text-left">OUTDOOR SPACES</button></li>
                <li><button onClick={() => scrollToSection('work')} className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide text-left">HOME BARS</button></li>
              </ul>
            </div>

            {/* Portfolio Column */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wider mb-4">PORTFOLIO</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('work')} className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide text-left">RECENT WORK</button></li>
                <li><button onClick={() => scrollToSection('work')} className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide text-left">COMMERCIAL</button></li>
                
                <li><button onClick={() => scrollToSection('work')} className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide text-left">GALLERY</button></li>
              </ul>
            </div>

            {/* About Column */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wider mb-4">ABOUT US</h4>
              <ul className="space-y-2">
                
                <li><button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide text-left">THE MAKER</button></li>
                <li><button onClick={() => scrollToSection('process')} className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide text-left">PROCESS</button></li>
                <li><button onClick={() => scrollToSection('reviews')} className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide text-left">TESTIMONIALS</button></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wider mb-4">CONTACT</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('contact-form')} className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide text-left">GET QUOTE</button></li>
                <li><a href="https://wa.me/353879380494" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide">WHATSAPP</a></li>
                <li><button onClick={() => scrollToSection('contact-form')} className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide text-left">EMAIL</button></li>
                
              </ul>
            </div>
          </div>

          {/* Divider Line */}
          <div className="border-t border-gray-800 mb-8"></div>

          {/* Social Media & Copyright */}
          <div className="flex flex-col items-center space-y-6">
            {/* Social Media Icons */}
            <div className="flex justify-center gap-4">
              <a href="https://www.instagram.com/tiny_outdoor_spaces" className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:border-white hover:bg-white/10 transition-all duration-300" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="mailto:info@tinyoutdoorspaces.com" className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:border-white hover:bg-white/10 transition-all duration-300">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <p className="text-gray-500 text-sm text-center">©Copyright Tiny Outdoor Spaces. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;