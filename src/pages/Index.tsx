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

      {/* Section 2: Pain → Value - Enhanced Mobile */}
      <section id="pain-value-section" className="max-sm:pt-8 max-sm:pb-6 pt-12 pb-6 lg:pt-16 lg:pb-8" style={{ background: 'var(--gradient-brown-primary)' }}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <ScrollReveal>
              <div>
                <h2 className="font-heading font-bold text-text-primary max-sm:text-[clamp(24px,6vw,32px)] max-sm:font-bold max-sm:leading-tight max-sm:mb-4 mb-4 text-4xl md:text-5xl">
                  Not another mass-production look
                </h2>
                <p className="max-sm:text-[16px] max-sm:leading-relaxed text-lg text-text-secondary max-sm:mb-6 mb-6">
                  If you want something nobody else has, we design and build it for you. 
                  Premium materials, made locally.
                </p>
                <div className="max-sm:space-y-3 space-y-3">
                  {["One-of-a-kind design (never repeated)", "Premium hardwoods & brass", "Built in Ireland, built to last"].map((item, index) => 
                    <ScrollReveal key={index} delay={index * 100}>
                      <div className="relative group">
                        <div className="bg-gradient-to-r from-bg-section-alt/30 via-bg-section-alt/50 to-bg-section-alt/30 backdrop-blur-sm border border-accent-primary/20 rounded-lg max-sm:p-4 p-4 shadow-md shadow-accent-primary/5 hover:shadow-accent-primary/15 transition-all duration-300 hover:border-accent-primary/40 hover:scale-[1.01]">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-accent-primary rounded-full mr-4 opacity-80 animate-pulse"></div>
                            <span className="text-text-primary font-medium max-sm:text-[15px] text-sm">{item}</span>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  )}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="relative max-sm:mt-6">
                <div className="w-full rounded-xl overflow-hidden shadow-xl shadow-accent-primary/15 border border-accent-primary/15">
                  <ScrollReveal delay={250}>
                     <img src="/images/custom-bar-interior.png" alt="Custom bar interior with warm lighting and wood finishes" className="w-full max-sm:h-64 h-48 sm:h-56 md:h-64 object-cover object-center bg-gray-900" loading="lazy" />
                  </ScrollReveal>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Promise Section - Mobile Animated */}
      <section className="max-sm:py-8 py-16 lg:py-20" style={{ background: 'var(--gradient-brown-primary)' }}>
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-text-primary text-center max-sm:text-[clamp(24px,6vw,32px)] max-sm:font-bold max-sm:leading-tight max-sm:mb-6 mb-6 text-4xl md:text-5xl">Our Promise</h2>
            <div className="w-24 h-0.5 bg-accent-primary mx-auto max-sm:mb-6 mb-8"></div>
          </ScrollReveal>
          
          {/* Mobile Animated Version */}
          <div className="md:hidden mb-8">
            <PromiseCarousel />
          </div>
          
          {/* Desktop Grid Version */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 mb-8">
            <ScrollReveal className="flex flex-col items-center text-center">
              <div className="w-24 h-24 lg:w-32 lg:h-32 mb-4 rounded-full overflow-hidden bg-gradient-to-br from-amber-600 to-amber-800 p-1">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img 
                    src="/images/promise-precision.png" 
                    alt="Precision craftsmanship tools and measurements" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="font-heading font-semibold text-text-primary text-xl lg:text-2xl mb-3">Precision</h3>
              <p className="text-text-secondary text-base leading-relaxed">
                Every measurement, every cut, every joint crafted with meticulous attention to detail for perfect results.
              </p>
            </ScrollReveal>
            <ScrollReveal className="flex flex-col items-center text-center">
              <div className="w-24 h-24 lg:w-32 lg:h-32 mb-4 rounded-full overflow-hidden bg-gradient-to-br from-amber-600 to-amber-800 p-1">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img 
                    src="/images/promise-real-spaces.png" 
                    alt="Real customer spaces transformed with custom woodwork" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="font-heading font-semibold text-text-primary text-xl lg:text-2xl mb-3">Real Spaces</h3>
              <p className="text-text-secondary text-base leading-relaxed">
                We work in your actual space, ensuring perfect fit and functionality that transforms your environment.
              </p>
            </ScrollReveal>
            <ScrollReveal className="flex flex-col items-center text-center">
              <div className="w-24 h-24 lg:w-32 lg:h-32 mb-4 rounded-full overflow-hidden bg-gradient-to-br from-amber-600 to-amber-800 p-1">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img 
                    src="/images/promise-unique-results.png" 
                    alt="Unique custom woodwork designs showcasing creativity" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="font-heading font-semibold text-text-primary text-xl lg:text-2xl mb-3">Unique Results</h3>
              <p className="text-text-secondary text-base leading-relaxed">
                No cookie-cutter solutions. Each piece is uniquely designed to match your style and needs.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="bg-bg-section-alt rounded-xl max-sm:p-4 p-8 text-center max-sm:mb-6 mb-8">
              <h3 className="font-heading font-bold text-text-primary max-sm:text-lg max-sm:mb-3 mb-4 text-2xl md:text-3xl">
                Producing Quality Results
              </h3>
              <p className="max-sm:text-sm max-sm:leading-relaxed text-lg text-text-secondary max-w-4xl mx-auto">
                Careful planning, premium materials, and meticulous handcrafting.
              </p>
            </div>
          </ScrollReveal>

          {/* CTA Button */}
          <div className="text-center">
            <ScrollReveal delay={250}>
                <Button onClick={scrollToContact} variant="outline" size="mobile-compact" className="border-accent-primary text-white hover:bg-accent-primary/20 hover:border-accent-primary/80 transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg hover:shadow-accent-primary/25 max-sm:w-full max-sm:max-w-[300px] max-sm:mx-auto max-sm:py-3 max-sm:text-base bg-[#0F1111] border border-accent px-8 py-4 md:px-16 md:py-6 rounded-lg text-lg md:text-2xl min-w-[240px] md:min-w-[280px] text-center">
                Start Your Project
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 3: Interactive Portfolio */}
      <section id="work" className="max-sm:py-6 py-16 lg:py-20 relative overflow-hidden" style={{ background: 'var(--gradient-brown-primary)' }}>
        
        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <ScrollReveal>
            <div className="text-center max-sm:mb-8 mb-16">
              <h2 className="font-heading font-bold text-text-primary text-center max-sm:text-[clamp(22px,5vw,28px)] max-sm:font-bold max-sm:leading-snug max-sm:mb-4 mb-6 text-4xl md:text-5xl">
                What We Create
              </h2>
              <div className="w-24 h-0.5 bg-accent-primary mx-auto mb-8"></div>
            </div>
          </ScrollReveal>
          
          <div className="max-sm:space-y-2 space-y-3 max-w-3xl lg:max-w-5xl mx-auto">
            {portfolioCategories.map((category, categoryIndex) => <div key={category.id} className="w-full">
                <ScrollReveal delay={categoryIndex * 100}>
                  <div className={`
                      relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 ease-out
                      bg-gradient-to-br from-bg-section-alt/80 via-bg-section-alt-2/75 to-bg-section-alt/80
                      backdrop-blur-md border border-bg-section-alt/60 shadow-xl
                      border-b-2 border-b-accent-primary/30 max-sm:px-4 max-sm:py-4 px-6 py-5
                      hover:shadow-accent-primary/30 hover:shadow-[0_20px_40px_-12px_rgba(197,156,87,0.35)]
                      hover:border-accent-primary/50 hover:border-b-accent-primary/60 hover:scale-[1.01] 
                      hover:bg-gradient-to-br hover:from-bg-section-alt-2/90 hover:via-bg-section-alt/85 hover:to-bg-section-alt-2/90
                      ${expandedCategory === category.id ? 'shadow-accent-primary/40 shadow-[0_25px_50px_-12px_rgba(197,156,87,0.4)] border-accent-primary/70 border-b-accent-primary/80 bg-gradient-to-br from-bg-section-alt-2/90 via-bg-section-alt/85 to-bg-section-alt-2/90' : ''}
                    `} onClick={() => handleCategoryClick(category.id)}>
                    {/* Premium inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent"></div>
                    
                    {/* Active state accent line */}
                    {expandedCategory === category.id && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-primary to-transparent"></div>}
                    
                    <div className="relative max-sm:px-1 max-sm:py-2 px-2 py-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-heading font-bold text-white max-sm:text-lg max-sm:mb-1 text-xl md:text-2xl mb-2 tracking-tight">
                            {category.title}
                          </h3>
                          <p className="text-gray-300 max-sm:text-[14px] text-base font-medium">{category.description}</p>
                        </div>
                        <div className={`transform transition-all duration-300 ease-out ${expandedCategory === category.id ? 'rotate-180 text-accent-primary' : 'text-gray-400'}`}>
                          <svg className="max-sm:w-5 max-sm:h-5 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    
                    {/* Accordion Content */}
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${expandedCategory === category.id ? 'max-h-[1500px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {((category.id === 'bars-restaurants' && isMobile === true) ? 
                          // On mobile, show only 3 specific projects for hospitality spaces
                          category.projects.filter(p => ['summit-inn', 'riverside-bar', 'peggys'].includes(p.id))
                          : (category.id === 'outdoor-spaces' && isMobile === true) ?
                          // On mobile, show only 4 specific projects for outdoor spaces
                          category.projects.filter(p => ['thormanby-lawns', 'pergola-decking', 'howth-decking', 'raheny-patio'].includes(p.id))
                          : category.projects
                        ).map((project, projectIndex) => <div key={project.id} className="bg-bg-section-alt/50 rounded-xl overflow-hidden cursor-pointer group hover:bg-bg-section-alt/75 transition-all duration-300 border border-bg-section-alt/30 hover:border-accent-primary/50 border-b-2 border-b-accent-primary/40 hover:border-b-accent-primary/70 p-1 hover:shadow-lg hover:shadow-accent-primary/20" onClick={e => {
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
                  
                  {/* Navigation Arrows */}
                  {selectedProject.images.length > 1 && <>
                      <button onClick={handlePrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>}
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
      <section className="max-sm:py-8 py-16 lg:py-20" style={{ background: 'var(--gradient-brown-primary)' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            
            {/* Headline */}
            <ScrollReveal>
              <h2 className="font-heading font-bold text-text-primary max-sm:text-[clamp(22px,5vw,28px)] max-sm:font-bold max-sm:leading-snug max-sm:mb-4 mb-6 text-4xl lg:text-5xl text-center">
                Why choose custom over mass-market
              </h2>
              <div className="w-24 h-0.5 bg-accent-primary mx-auto mb-8"></div>
            </ScrollReveal>
            
            {/* Intro Text */}
            <ScrollReveal delay={100}>
              <p className="max-sm:text-[15px] max-sm:leading-relaxed max-sm:mb-6 text-xl lg:text-2xl text-text-secondary leading-relaxed mb-8 text-center max-w-4xl mx-auto">
                Most furniture today is disposable. We build for decades — each piece unique, designed and crafted in Ireland from premium oak, walnut, and brass.
              </p>
            </ScrollReveal>

            {/* Comparison Table */}
            <ScrollReveal delay={200}>
              <div className="bg-gradient-to-br from-bg-section-alt-2 via-bg-wood-dark to-bg-main rounded-2xl border border-accent-primary/20 shadow-lg shadow-accent-primary/10 mb-12 overflow-hidden">
                
                {/* Mobile-Optimized Table */}
                <div className="md:hidden">
                  {/* Header */}
                  <div className="grid grid-cols-2 bg-bg-main/30">
                    <div className="text-center py-4 bg-bg-main/50 border-r border-accent-primary/30">
                      <span className="text-text-muted font-bold text-sm uppercase tracking-wider">Mass-market</span>
                    </div>
                    <div className="text-center py-4 bg-gradient-to-r from-accent-primary/20 to-accent-hover/20 border border-accent-primary/40">
                      <span className="text-accent-primary font-bold text-sm uppercase tracking-wider">Custom</span>
                    </div>
                  </div>
                  
                  {/* Rows */}
                  <div className="divide-y divide-bg-main/10">
                    {[{
                    standard: "Same as everyone",
                    custom: "One-of-a-kind design"
                  }, {
                    standard: "Machine produced",
                    custom: "Hand crafted"
                  }, {
                    standard: "Cheap materials",
                    custom: "Premium oak, walnut, brass"
                  }, {
                    standard: "Disposable",
                    custom: "Heirloom quality"
                  }, {
                    standard: "Flat-packed",
                    custom: "Installed by craftsmen"
                  }].map((row, index) => <div key={index} className="grid grid-cols-2">
                        <div className="p-4 text-text-muted text-sm text-center border-r border-accent-primary/20">
                          {row.standard}
                        </div>
                        <div className="p-4 text-text-primary font-semibold text-sm text-center bg-accent-primary/5 border-l-2 border-accent-primary/40">
                          {row.custom}
                        </div>
                      </div>)}
                  </div>
                </div>

                {/* Desktop Table - Redesigned to match mobile */}
                <div className="hidden md:block">
                  {/* Header */}
                  <div className="grid grid-cols-2 bg-bg-main/30 rounded-t-xl">
                    <div className="text-center py-6 bg-bg-main/50 border-r border-accent-primary/30 rounded-tl-xl">
                      <span className="text-text-muted font-bold text-lg uppercase tracking-wider">Mass-market</span>
                    </div>
                    <div className="text-center py-6 bg-gradient-to-r from-accent-primary/20 to-accent-hover/20 border border-accent-primary/40 rounded-tr-xl">
                      <span className="text-accent-primary font-bold text-lg uppercase tracking-wider">Custom</span>
                    </div>
                  </div>
                  
                  {/* Rows */}
                  <div className="divide-y divide-bg-main/10">
                    {[{
                    standard: "Same as everyone",
                    custom: "One-of-a-kind design"
                  }, {
                    standard: "Machine produced",
                    custom: "Hand crafted"
                  }, {
                    standard: "Cheap materials",
                    custom: "Premium oak, walnut, brass"
                  }, {
                    standard: "Disposable",
                    custom: "Heirloom quality"
                  }, {
                    standard: "Flat-packed",
                    custom: "Installed by craftsmen"
                  }].map((row, index) => <div key={index} className="grid grid-cols-2">
                        <div className="p-6 text-text-muted text-base text-center border-r border-accent-primary/20">
                          {row.standard}
                        </div>
                        <div className="p-6 text-text-primary font-semibold text-base text-center bg-accent-primary/5 border-l-2 border-accent-primary/40">
                          {row.custom}
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Benefits Icons Row */}
            <ScrollReveal delay={300}>
              <div className="bg-gradient-to-br from-bg-section-alt-2 via-bg-wood-dark to-bg-main rounded-xl max-sm:p-3 p-5 border border-accent-primary/20 shadow-lg shadow-accent-primary/10 max-sm:mb-4 mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 max-sm:gap-3 gap-4">
                  {[{
                  icon: "🔨",
                  title: "Unique every time",
                  subtitle: "Never repeated design"
                }, {
                  icon: "🇮🇪",
                  title: "Local craftsmanship",
                  subtitle: "Made in Ireland"
                }, {
                  icon: "🌳",
                  title: "Natural materials",
                  subtitle: "Oak. Walnut. Brass."
                }, {
                  icon: "🛡️",
                  title: "Built to last",
                  subtitle: "Decades, not years"
                }].map((benefit, index) => <div key={index} className="text-center">
                      <div className="max-sm:text-xl text-2xl max-sm:mb-1 mb-2">{benefit.icon}</div>
                      <h4 className="font-heading font-bold text-text-primary max-sm:text-[14px] max-sm:mb-1 mb-2 text-base">
                        {benefit.title}
                      </h4>
                      <p className="text-text-secondary max-sm:text-[12px] text-sm">{benefit.subtitle}</p>
                    </div>)}
                </div>
              </div>
            </ScrollReveal>

            {/* CTA Button - After comparison table */}
            <ScrollReveal delay={400}>
              <div className="text-center">
                <Button onClick={scrollToContact} variant="outline" size="mobile-compact" className="border-accent-primary text-white hover:bg-accent-primary/20 hover:border-accent-primary/80 transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg hover:shadow-accent-primary/25 max-sm:w-full max-sm:max-w-[320px] max-sm:mx-auto bg-[#0F1111] border border-accent px-8 py-4 md:px-16 md:py-6 rounded-lg text-lg md:text-2xl min-w-[240px] md:min-w-[280px] text-center">
                  Get Free Consultation
                </Button>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Section 5: Portfolio */}
      <section className="max-sm:py-6 py-16 lg:py-20" style={{ background: 'var(--gradient-brown-primary)' }}>
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
                        <Button variant="outline" size="project-card" className="border-accent-primary/80 text-accent-primary hover:bg-accent-primary hover:text-bg-main hover:border-accent-primary transition-all duration-300 shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/40 hover:scale-105">
                          View Project
                        </Button>
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
              <Button onClick={scrollToContact} variant="outline" size="mobile-compact" className="border-accent-primary text-white hover:bg-accent-primary/20 hover:border-accent-primary/80 transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg hover:shadow-accent-primary/25 max-sm:w-full max-sm:max-w-[320px] max-sm:mx-auto bg-[#0F1111] border border-accent px-8 py-4 md:px-16 md:py-6 rounded-lg text-lg md:text-2xl min-w-[240px] md:min-w-[280px] text-center">
                Start Your Project
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="max-sm:py-4 py-12 lg:py-16" style={{ background: 'var(--gradient-brown-primary)' }}>
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-text-primary max-sm:text-[clamp(22px,5vw,28px)] max-sm:font-bold max-sm:leading-snug max-sm:mb-4 mb-6 text-4xl md:text-5xl">
              What our clients say
            </h2>
            <div className="w-24 h-0.5 bg-accent-primary mb-8"></div>
          </ScrollReveal>

          {/* Hero Review */}
          <ScrollReveal>
            <div className="bg-bg-section-alt rounded-xl max-sm:p-2 p-6 max-sm:mb-4 mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-accent-primary/50 group">
              <div className="grid md:grid-cols-5 max-sm:gap-2 gap-6 items-center">
                <div className="md:col-span-2 relative">
                  <ScrollReveal delay={100}>
                    <img src={imageConfig.testimonial} alt="The Summit Inn custom bar" className="w-full max-sm:max-h-20 h-48 md:h-64 object-cover rounded-xl" loading="lazy" />
                  </ScrollReveal>
                </div>
                <div className="md:col-span-3">
                  <div className="flex items-start mb-4">
                    
                    <div className="flex text-accent-primary">
                      <svg className="max-sm:w-4 max-sm:h-4 w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg className="max-sm:w-4 max-sm:h-4 w-5 h-5 fill-current ml-1" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg className="max-sm:w-4 max-sm:h-4 w-5 h-5 fill-current ml-1" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg className="max-sm:w-4 max-sm:h-4 w-5 h-5 fill-current ml-1" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg className="max-sm:w-4 max-sm:h-4 w-5 h-5 fill-current ml-1" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <blockquote className="max-sm:text-[12px] max-sm:leading-relaxed max-sm:mb-2 text-lg text-text-primary mb-4 leading-relaxed">
                    Absolutely stunning work. The attention to detail and quality of craftsmanship 
                    exceeded our expectations. This bar is the centerpiece of our venue.
                  </blockquote>
                  <cite className="text-text-secondary font-bold max-sm:text-[11px] text-base">— The Summit Inn</cite>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Grid of Reviews */}
          <div className="grid md:grid-cols-3 max-sm:gap-2 gap-4 mb-8">
            <ScrollReveal delay={100}>
              <div className="bg-bg-section-alt rounded-lg max-sm:p-2 p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-accent-primary/50 group">
                <div className="flex items-center max-sm:mb-2 mb-4">
                  <svg className="max-sm:w-3 max-sm:h-3 w-4 h-4 text-accent-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  
                </div>
                <p className="text-text-primary max-sm:text-[11px] max-sm:leading-relaxed max-sm:mb-1 mb-3 leading-relaxed">Perfect craftsmanship. Built exactly to our specifications.</p>
                <cite className="text-text-secondary font-bold max-sm:text-[10px] text-sm">— Abbey Tavern</cite>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <div className="bg-bg-section-alt rounded-lg max-sm:p-2 p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-accent-primary/50 group">
                <div className="flex items-center max-sm:mb-2 mb-4">
                  <svg className="max-sm:w-3 max-sm:h-3 w-4 h-4 text-accent-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  
                </div>
                <p className="text-text-primary max-sm:text-[11px] max-sm:leading-relaxed max-sm:mb-1 mb-3 leading-relaxed">Our customers constantly compliment the bar design.</p>
                <cite className="text-text-secondary font-bold max-sm:text-[10px] text-sm">— Findlaters</cite>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={300}>
              <div className="bg-bg-section-alt rounded-lg max-sm:p-2 p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-accent-primary/50 group">
                <div className="flex items-center max-sm:mb-2 mb-4">
                  <svg className="max-sm:w-3 max-sm:h-3 w-4 h-4 text-accent-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  
                </div>
                <p className="text-text-primary max-sm:text-[11px] max-sm:leading-relaxed max-sm:mb-1 mb-3 leading-relaxed">Exceptional attention to detail. Worth every penny.</p>
                <cite className="text-text-secondary font-bold max-sm:text-[10px] text-sm">— Private Client</cite>
              </div>
            </ScrollReveal>
          </div>

          {/* CTA Button */}
          <ScrollReveal delay={400}>
            <div className="text-center">
                <Button onClick={() => scrollToContact()} variant="outline" size="mobile-compact" className="border-accent-primary text-white hover:bg-accent-primary/20 hover:border-accent-primary/80 transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg hover:shadow-accent-primary/25 max-sm:w-full max-sm:max-w-[320px] max-sm:mx-auto bg-[#0F1111] border border-accent px-8 py-4 md:px-16 md:py-6 rounded-lg text-lg md:text-2xl min-w-[240px] md:min-w-[280px] text-center">
                  Let's build yours
                </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* New Section: What We Build */}
      <section className="max-sm:py-6 py-16 lg:py-20" style={{ background: 'var(--gradient-brown-primary)' }}>
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
               <Button onClick={scrollToContact} variant="outline" size="mobile-compact" className="border-accent-primary text-white hover:bg-accent-primary/20 hover:border-accent-primary/80 transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg hover:shadow-accent-primary/25 max-sm:w-full max-sm:max-w-[320px] max-sm:mx-auto bg-[#0F1111] border border-accent px-8 py-4 md:px-16 md:py-6 rounded-lg text-lg md:text-2xl min-w-[240px] md:min-w-[280px] text-center">
                Let's build yours
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* New Section: FAQ */}
      <section className="max-sm:py-6 py-16 lg:py-20" style={{ background: 'var(--gradient-brown-primary)' }}>
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
              <Button onClick={scrollToContact} variant="outline" size="mobile-compact" className="border-accent-primary text-white hover:bg-accent-primary/20 hover:border-accent-primary/80 transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg hover:shadow-accent-primary/25 max-sm:w-full max-sm:max-w-[320px] max-sm:mx-auto bg-[#0F1111] border border-accent px-8 py-4 md:px-16 md:py-6 rounded-lg text-lg md:text-2xl min-w-[240px] md:min-w-[280px] text-center">
                Get Your Quote
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 7: Process */}
      <section id="process" className="max-sm:py-6 py-16 lg:py-20 relative overflow-hidden" style={{ background: 'var(--gradient-brown-primary)' }}>
        <div className="absolute inset-0 opacity-10">
          <img src={imageConfig.maker} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="container mx-auto px-6 relative">
          <ScrollReveal>
            <div className="text-center max-sm:mb-6 mb-12">
              <h2 className="font-heading font-bold text-text-primary text-center max-sm:text-[clamp(22px,5vw,28px)] max-sm:font-bold max-sm:leading-snug max-sm:mb-3 mb-6 text-4xl md:text-5xl">
                How We Work
              </h2>
              <div className="w-24 h-0.5 bg-accent-primary mx-auto"></div>
            </div>
          </ScrollReveal>
          
          {/* Mobile - modern minimal cards */}
          <div className="max-sm:block hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 px-1 hide-scrollbar">
              {processSteps.map((step, index) => (
                  <div key={index} className="group flex-shrink-0 w-[160px] relative">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Card */}
                    <div className="relative bg-bg-main/90 backdrop-blur-sm rounded-lg p-4 border border-accent-primary/10 group-hover:border-accent-primary/30 transition-all duration-300 shadow-lg group-hover:shadow-accent-primary/10">
                      {/* Modern step indicator */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-6 bg-gradient-to-b from-accent-primary to-accent-secondary rounded-full"></div>
                        <span className="text-accent-primary font-heading font-bold text-xs">STEP {step.number}</span>
                      </div>
                      
                      <h3 className="font-heading font-bold text-text-primary text-sm mb-2 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-text-secondary text-xs leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
              ))}
            </div>
          </div>

          {/* Desktop - modern grid */}
          <div className="max-sm:hidden grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
                <div key={index} className="group relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary/20 via-accent-secondary/20 to-accent-primary/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Card */}
                  <div className="relative bg-bg-main/95 backdrop-blur-sm rounded-xl p-6 border border-accent-primary/10 group-hover:border-accent-primary/25 transition-all duration-500 shadow-xl group-hover:shadow-accent-primary/5">
                    {/* Modern step indicator */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1.5 h-8 bg-gradient-to-b from-accent-primary to-accent-secondary rounded-full"></div>
                      <div>
                        <span className="text-accent-primary font-heading font-bold text-sm tracking-wider">STEP</span>
                        <div className="text-accent-primary font-heading font-bold text-lg">{step.number}</div>
                      </div>
                    </div>
                    
                    <h3 className="font-heading font-bold text-text-primary mb-3 text-lg">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Who Am I */}
      <section id="about" className="max-sm:py-6 py-16 lg:py-20" style={{ background: 'var(--gradient-brown-primary)' }}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <ScrollReveal>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/30 rounded-xl"></div>
                <div className="absolute inset-0 border-2 border-accent-primary/40 rounded-xl transform rotate-1 shadow-lg shadow-accent-primary/20"></div>
                <ScrollReveal delay={100}>
                  <img src={imageConfig.maker} alt="Craftsman in workshop" className="relative w-full max-sm:max-h-[300px] h-80 lg:h-96 object-cover rounded-xl" loading="lazy" />
                </ScrollReveal>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-xl"></div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div>
                <h2 className="font-heading font-bold text-text-primary max-sm:text-[clamp(22px,5vw,28px)] max-sm:font-bold max-sm:leading-snug max-sm:mb-4 mb-6 text-4xl md:text-5xl">The Signature</h2>
                <div className="w-24 h-0.5 bg-accent-primary mb-8"></div>
                <p className="max-sm:text-[15px] max-sm:leading-relaxed max-sm:mb-6 text-xl text-text-secondary mb-8 leading-relaxed">Crafted from walnut, oak, and brass, each piece is unique and unrepeatable. Defined by precision and distinguished by detail, this work carries the signature of timeless craftsmanship, embodied in the hands of its maker</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 9: Contact Form */}
      <section id="contact-form" className="max-sm:py-6 py-16 lg:py-20" style={{ background: 'var(--gradient-brown-primary)' }}>
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-heading font-bold text-text-primary max-sm:text-[clamp(22px,5vw,28px)] max-sm:font-bold max-sm:leading-snug max-sm:mb-4 mb-6 text-4xl md:text-5xl">Ready To Start?</h2>
              <div className="w-24 h-0.5 bg-accent-primary mx-auto mb-8"></div>
              
              {formSubmitted ? <div className="bg-neutral-light/10 border border-neutral-light/20 rounded-xl p-12 text-center">
                  <h3 className="max-sm:text-lg text-2xl font-semibold text-text-primary max-sm:mb-3 mb-4">
                    Thanks for reaching out!
                  </h3>
                  <p className="text-text-secondary max-sm:text-[15px] text-lg">
                    We'll get back to you within 24 hours.
                  </p>
                </div> : <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <Input type="text" placeholder="Your name" className="form-field max-sm:h-12 h-16 max-sm:text-[15px] text-lg px-6 py-4 rounded-xl border-2 border-input/50 focus:border-accent-primary/60 bg-bg-main/50" value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} required />
                  </div>
                  <div>
                    <Input type="text" placeholder="Email or phone" className="form-field max-sm:h-12 h-16 max-sm:text-[15px] text-lg px-6 py-4 rounded-xl border-2 border-input/50 focus:border-accent-primary/60 bg-bg-main/50" value={formData.contact} onChange={e => setFormData({
                  ...formData,
                  contact: e.target.value
                })} required />
                  </div>
                  <div>
                    <Textarea placeholder="Tell us about your project" className="form-field min-h-[160px] max-sm:text-[15px] text-lg px-6 py-4 rounded-xl border-2 border-input/50 focus:border-accent-primary/60 bg-bg-main/50 resize-none" value={formData.message} onChange={e => setFormData({
                  ...formData,
                  message: e.target.value
                })} />
                  </div>
                  <div className="max-sm:space-y-4 space-y-6 pt-4">
                    <Button type="submit" disabled={isSubmitting} variant="outline" size="mobile-compact" className="border-accent-primary text-white hover:bg-accent-primary/20 hover:border-accent-primary/80 transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg hover:shadow-accent-primary/25 max-sm:w-full max-sm:max-w-[320px] max-sm:mx-auto w-full max-w-[320px] mx-auto bg-[#0F1111] border border-accent px-8 py-4 md:px-16 md:py-6 rounded-xl text-lg md:text-2xl tracking-wider disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0F1111] disabled:hover:scale-100">
                      {isSubmitting ? "Sending..." : "Send message"}
                    </Button>
                    
                    <div className="text-center pt-2">
                      <p className="text-text-secondary max-sm:text-[15px] text-base max-sm:mb-3 mb-4">Or send directly via WhatsApp instead</p>
                      <a href="https://wa.me/353879380494" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-accent-primary text-white hover:bg-accent-primary/20 hover:border-accent-primary/80 transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg hover:shadow-accent-primary/25 max-sm:w-full max-sm:max-w-[320px] max-sm:mx-auto max-sm:text-[15px] max-sm:px-5 max-sm:py-3 max-sm:rounded-xl bg-[#0F1111] border border-accent px-8 py-4 md:px-16 md:py-6 rounded-xl text-lg md:text-2xl min-w-[240px] md:min-w-[280px] text-center tracking-wider">WHATSAPP US</a>
                    </div>
                  </div>
                </form>}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F0F0F] text-white py-16">
        <div className="container mx-auto px-6">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
            {/* Company Branding */}
            <div className="lg:col-span-1">
              <h3 className="max-sm:text-lg text-2xl font-heading font-bold max-sm:mb-2 mb-2">Tiny Outdoor Spaces</h3>
              
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