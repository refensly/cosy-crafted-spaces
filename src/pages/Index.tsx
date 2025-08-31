import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ScrollReveal from '@/components/ScrollReveal';
import { imageConfig } from '@/lib/imageConfig';
const Index = () => {
  const {
    toast
  } = useToast();
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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.contact,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormData({ name: '', contact: '', message: '' }); // Clear form
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
    description: "Share your idea"
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
      <Hero />

      {/* Section 2: Pain → Value */}
      <section className="section-padding bg-bg-section-alt-2">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <h2 className="font-heading font-bold text-text-primary mb-6">
                  Not another mass-production look
                </h2>
                <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                  If you want something nobody else has, we design and build it for you. 
                  Premium materials, made locally.
                </p>
                <div className="space-y-4">
                  {["One-of-a-kind design (never repeated)", "Premium hardwoods & brass", "Built in Ireland, built to last"].map((item, index) => <div key={index} className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded-full bg-accent-primary flex items-center justify-center">
                        <svg className="w-3 h-3 text-bg-main" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-text-primary">{item}</span>
                    </div>)}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="relative">
                <div className="w-full h-96 rounded-xl overflow-hidden">
                  <ScrollReveal delay={250}>
                     <img 
                       src="/images/custom-bar-interior.png" 
                       alt="Custom bar interior with warm lighting and wood finishes" 
                       className="w-full h-full object-cover transform scale-125"
                       loading="lazy"
                     />
                  </ScrollReveal>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* New Section: Handmade Quality Examples */}
      <section className="pt-24 pb-24 bg-bg-main">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-text-primary text-center mb-12">Our Promise</h2>
            
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[{
            title: "Crafted for Real Spaces",
            image: "/images/promise-real-spaces.png",
            description: "Every project transforms pubs, homes, and outdoor living areas"
          }, {
            title: "Built with Precision",
            image: "/images/promise-precision.png",
            description: "Joinery details, finishing, and premium materials"
          }, {
            title: "One-of-a-Kind Results",
            image: "/images/promise-unique-results.png",
            description: "Never repeated, always designed for your exact space"
          }].map((example, index) => <ScrollReveal key={index} delay={index * 100}>
                <div className="text-center">
                  <div className="relative mb-4">
                    <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
                      <ScrollReveal delay={index * 100 + 50}>
                        <img 
                          src={example.image} 
                          alt="Custom craftsmanship and interior design" 
                          className="w-full h-full object-cover object-center"
                          loading="lazy"
                        />
                      </ScrollReveal>
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-text-primary mb-2 text-lg">
                    {example.title}
                  </h3>
                  <p className="text-text-secondary text-sm">{example.description}</p>
                </div>
              </ScrollReveal>)}
          </div>

          <ScrollReveal>
            <div className="bg-bg-section-alt rounded-xl p-8 text-center">
              <h3 className="font-heading font-bold text-text-primary mb-4">
                Producing
              </h3>
              <p className="text-lg text-text-secondary max-w-4xl mx-auto mb-6 lg:mb-8">
                Each piece goes through careful planning, selection of premium materials, 
                and meticulous handcrafting to ensure it meets our quality standards.
              </p>
            </div>
          </ScrollReveal>
          

          {/* NEW CTA Button - Between Producing and What We Create */}
          <div className="mt-16 text-center">
            <ScrollReveal delay={250}>
              <Button onClick={scrollToContact} className="bg-[#0F1111] text-white font-medium uppercase border border-accent hover:bg-transparent hover:scale-105 hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 ease-out px-8 py-4 md:px-16 md:py-6 rounded-lg text-lg md:text-2xl min-w-[240px] md:min-w-[280px] text-center">
                Start Your Project
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 3: Interactive Portfolio */}
      <section id="work" className="py-20 md:py-24 lg:py-32 relative overflow-hidden bg-deep-green">
        
        <div className="container mx-auto px-8 md:px-12 lg:px-16 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-heading font-bold text-text-primary text-center mb-6 text-5xl md:text-6xl">
                What We Create
              </h2>
              <div className="w-24 h-0.5 bg-accent-primary mx-auto"></div>
            </div>
          </ScrollReveal>
          
          <div className="space-y-4">
            {portfolioCategories.map((category, categoryIndex) => <div key={category.id} className="w-full">
                <ScrollReveal delay={categoryIndex * 100}>
                  <div className={`
                      relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ease-out
                      bg-gradient-to-br from-bg-section-alt/80 via-bg-section-alt-2/75 to-bg-section-alt/80
                      backdrop-blur-md border border-bg-section-alt/60 shadow-2xl
                      border-b-2 border-b-accent-primary/30 px-10 py-8
                      hover:shadow-accent-primary/30 hover:shadow-[0_25px_50px_-12px_rgba(197,156,87,0.35)]
                      hover:border-accent-primary/50 hover:border-b-accent-primary/60 hover:scale-[1.02] 
                      hover:bg-gradient-to-br hover:from-bg-section-alt-2/90 hover:via-bg-section-alt/85 hover:to-bg-section-alt-2/90
                      ${expandedCategory === category.id ? 'shadow-accent-primary/40 shadow-[0_30px_60px_-12px_rgba(197,156,87,0.4)] border-accent-primary/70 border-b-accent-primary/80 bg-gradient-to-br from-bg-section-alt-2/90 via-bg-section-alt/85 to-bg-section-alt-2/90' : ''}
                    `} onClick={() => handleCategoryClick(category.id)}>
                    {/* Premium inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent"></div>
                    
                    {/* Active state accent line */}
                    {expandedCategory === category.id && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-primary to-transparent"></div>}
                    
                    <div className="relative px-2 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-heading font-bold text-white text-2xl md:text-3xl mb-3 tracking-tight">
                            {category.title}
                          </h3>
                          <p className="text-gray-300 text-lg font-medium">{category.description}</p>
                        </div>
                        <div className={`transform transition-all duration-300 ease-out ${expandedCategory === category.id ? 'rotate-180 text-accent-primary' : 'text-gray-400'}`}>
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    
                    {/* Accordion Content */}
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${expandedCategory === category.id ? 'max-h-[1500px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.projects.map((project, projectIndex) => <div key={project.id} className="bg-bg-section-alt/50 rounded-xl overflow-hidden cursor-pointer group hover:bg-bg-section-alt/75 transition-all duration-300 border border-bg-section-alt/30 hover:border-accent-primary/50 border-b-2 border-b-accent-primary/40 hover:border-b-accent-primary/70 p-1 hover:shadow-lg hover:shadow-accent-primary/20" onClick={e => {
                        e.stopPropagation();
                        handleProjectClick(project);
                      }}>
                            <div className="relative h-48 bg-gradient-to-br from-bg-section-alt-2 to-bg-section-alt overflow-hidden">
                              <ScrollReveal delay={projectIndex * 50}>
                                <img 
                                  src={project.images[0]} 
                                  alt={`${project.title} preview`} 
                                  className="w-full h-full object-cover transform scale-110"
                                  loading="lazy"
                                />
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
      <section className="py-16 md:py-20 bg-bg-section-alt">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            
            {/* Headline */}
            <ScrollReveal>
              <h2 className="font-heading font-bold text-text-primary text-4xl lg:text-5xl mb-8 text-center">
                Why choose custom over mass-market
              </h2>
            </ScrollReveal>
            
            {/* Intro Text */}
            <ScrollReveal delay={100}>
              <p className="text-xl lg:text-2xl text-text-secondary leading-relaxed mb-12 text-center max-w-4xl mx-auto">
                Most furniture today is disposable. We build for decades — each piece unique, designed and crafted in Ireland from premium oak, walnut, and brass.
              </p>
            </ScrollReveal>

            {/* Comparison Table */}
            <ScrollReveal delay={200}>
              <div className="bg-bg-section-alt-2 rounded-2xl border border-accent-primary/20 shadow-lg shadow-accent-primary/10 mb-12 overflow-hidden">
                
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
              <div className="bg-bg-section-alt-2 rounded-2xl p-8 border border-accent-primary/20 shadow-lg shadow-accent-primary/10 mb-12">
                <div className="grid md:grid-cols-4 gap-8">
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
                      <div className="text-4xl mb-3">{benefit.icon}</div>
                      <h4 className="font-heading font-bold text-text-primary mb-2 text-lg">
                        {benefit.title}
                      </h4>
                      <p className="text-text-secondary text-sm">{benefit.subtitle}</p>
                    </div>)}
                </div>
              </div>
            </ScrollReveal>

            {/* CTA Button - After comparison table */}
            <ScrollReveal delay={400}>
              <div className="text-center">
                <Button onClick={scrollToContact} className="bg-[#0F1111] text-white font-medium uppercase border border-accent hover:bg-transparent hover:scale-105 hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 ease-out px-8 py-4 md:px-16 md:py-6 rounded-lg text-lg md:text-2xl min-w-[240px] md:min-w-[280px] text-center">
                  Get Free Consultation
                </Button>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Section 5: Portfolio */}
      <section className="section-padding bg-bg-main">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-text-primary text-center mb-16">
              Recent projects
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => <ScrollReveal key={index} delay={index * 100}>
                <div className="premium-card group cursor-pointer" onClick={() => handleProjectClick(project)}>
                  <div className="relative overflow-hidden rounded-lg">
                    <ScrollReveal delay={index * 100}>
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </ScrollReveal>
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-main/90 to-transparent opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6">
                        <h3 className="font-heading font-bold text-text-primary mb-1">
                          {project.title}
                        </h3>
                        <p className="text-text-secondary text-sm mb-3">{project.subtitle}</p>
                        <Button variant="outline" size="sm" className="btn-secondary">
                          View Project
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>)}
          </div>
          
          {/* CTA Button */}
          <div className="text-center mt-16">
            <ScrollReveal delay={300}>
              <Button onClick={scrollToContact} className="bg-[#0F1111] text-white font-medium uppercase border border-accent hover:bg-transparent hover:scale-105 hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 ease-out px-8 py-4 md:px-16 md:py-6 rounded-lg text-lg md:text-2xl min-w-[240px] md:min-w-[280px] text-center">
                Start Your Project
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="section-padding bg-bg-section-alt-2">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-text-primary text-center mb-16 text-4xl">
              What our clients say
            </h2>
          </ScrollReveal>

          {/* Hero Review */}
          <ScrollReveal>
            <div className="bg-bg-section-alt rounded-2xl p-8 mb-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-accent-primary/50 group">
              <div className="grid md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-2 relative">
                  <ScrollReveal delay={100}>
                    <img 
                      src={imageConfig.testimonial} 
                      alt="The Summit Inn custom bar" 
                      className="w-full h-64 md:h-80 object-cover rounded-xl"
                      loading="lazy"
                    />
                  </ScrollReveal>
                </div>
                <div className="md:col-span-3">
                  <div className="flex items-start mb-4">
                    
                    <div className="flex text-accent-primary">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg className="w-5 h-5 fill-current ml-1" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg className="w-5 h-5 fill-current ml-1" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg className="w-5 h-5 fill-current ml-1" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg className="w-5 h-5 fill-current ml-1" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <blockquote className="text-xl text-text-primary mb-6 leading-relaxed">
                    Absolutely stunning work. The attention to detail and quality of craftsmanship 
                    exceeded our expectations. This bar is the centerpiece of our venue.
                  </blockquote>
                  <cite className="text-text-secondary font-bold text-lg">— The Summit Inn</cite>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Grid of Reviews */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <ScrollReveal delay={100}>
              <div className="bg-bg-section-alt rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-accent-primary/50 group">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-accent-primary mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  
                </div>
                <p className="text-text-primary mb-4 leading-relaxed">Perfect craftsmanship. Built exactly to our specifications.</p>
                <cite className="text-text-secondary font-bold">— Abbey Tavern</cite>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <div className="bg-bg-section-alt rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-accent-primary/50 group">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-accent-primary mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  
                </div>
                <p className="text-text-primary mb-4 leading-relaxed">Our customers constantly compliment the bar design.</p>
                <cite className="text-text-secondary font-bold">— Findlaters</cite>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={300}>
              <div className="bg-bg-section-alt rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-accent-primary/50 group">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-accent-primary mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  
                </div>
                <p className="text-text-primary mb-4 leading-relaxed">Exceptional attention to detail. Worth every penny.</p>
                <cite className="text-text-secondary font-bold">— Private Client</cite>
              </div>
            </ScrollReveal>
          </div>

          {/* CTA Button */}
          <ScrollReveal delay={400}>
            <div className="text-center">
                <Button onClick={() => scrollToContact()} className="bg-[#0F1111] text-white font-medium uppercase border border-accent hover:bg-transparent hover:scale-105 hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 ease-out px-8 py-4 md:px-16 md:py-6 rounded-lg text-lg md:text-2xl min-w-[240px] md:min-w-[280px] text-center">
                  Let's build yours
                </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* New Section: What We Build */}
      <section className="section-padding bg-bg-main">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <h2 className="font-heading font-bold text-text-primary mb-6">
                  What We Build
                </h2>
                <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                  From full pub interiors to outdoor kitchens, from custom bars to one-off furniture — 
                  we design and craft everything to fit your exact space.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 rounded-xl"></div>
                <div className="absolute inset-0 border border-accent-primary/30 rounded-xl"></div>
                <ScrollReveal delay={250}>
                  <img 
                    src={imageConfig.maker} 
                    alt="Craftsman working in workshop" 
                    className="w-full h-96 object-cover rounded-xl"
                    loading="lazy"
                  />
                </ScrollReveal>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
              </div>
            </ScrollReveal>
          </div>

          {/* CTA Button after What We Build */}
          <div className="text-center mt-16">
            <ScrollReveal delay={300}>
              <Button onClick={scrollToContact} className="bg-[#0F1111] text-white font-medium uppercase border border-accent hover:bg-transparent hover:scale-105 hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 ease-out px-8 py-4 md:px-16 md:py-6 rounded-lg text-lg md:text-2xl min-w-[240px] md:min-w-[280px] text-center">
                Let's build yours
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* New Section: FAQ */}
      <section className="section-padding bg-bg-section-alt">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="bg-bg-main rounded-xl p-8">
                <h2 className="font-heading font-bold text-text-primary mb-6 text-2xl">
                  Can I customize it for myself?
                </h2>
                <p className="text-xl text-text-secondary leading-relaxed">
                  Yes. Every build starts with your vision. Size, finish, details — everything can be 
                  tailored for your space.
                </p>
              </div>
            </ScrollReveal>
          </div>
          
          {/* CTA Button - After FAQ */}
          <div className="text-center mt-12">
            <ScrollReveal delay={100}>
              <Button onClick={scrollToContact} className="bg-[#0F1111] text-white font-medium uppercase border border-accent hover:bg-transparent hover:scale-105 hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 ease-out px-8 py-4 md:px-16 md:py-6 rounded-lg text-lg md:text-2xl min-w-[240px] md:min-w-[280px] text-center">
                Get Your Quote
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 7: Process */}
      <section id="process" className="section-padding bg-bg-section-alt relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={imageConfig.maker} 
            alt="" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="container mx-auto px-6 relative">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-text-primary text-center mb-16">
              How we work
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => <ScrollReveal key={index} delay={index * 150}>
                <div className="text-center bg-bg-section-alt-2/50 rounded-xl p-6 border border-accent-primary/20 hover:border-accent-primary/40 transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent-primary to-accent-hover rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent-primary/30">
                    <span className="text-3xl font-heading font-bold text-bg-main">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-text-primary mb-3 text-xl">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-lg">{step.description}</p>
                  {index < processSteps.length - 1 && <div className="hidden md:block w-full h-px bg-accent-primary/30 mt-8"></div>}
                  {index === processSteps.length - 1 && <div className="hidden md:block w-full h-px bg-accent-primary/30 mt-8"></div>}
                </div>
              </ScrollReveal>)}
          </div>
        </div>
      </section>

      {/* Section 8: Who Am I */}
      <section id="about" className="section-padding bg-bg-main">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/30 rounded-xl"></div>
                <div className="absolute inset-0 border-2 border-accent-primary/40 rounded-xl transform rotate-1 shadow-lg shadow-accent-primary/20"></div>
                <ScrollReveal delay={100}>
                  <img 
                    src={imageConfig.maker} 
                    alt="Craftsman in workshop" 
                    className="relative w-full h-96 object-cover rounded-xl"
                    loading="lazy"
                  />
                </ScrollReveal>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-xl"></div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div>
                <h2 className="font-heading font-bold text-text-primary mb-6">
                  Who I am
                </h2>
                <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                  Every project is built by me, one at a time. I work with walnut, oak and brass to create unique pieces that never repeat. Quality and detail are my signature.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 9: Contact Form */}
      <section id="contact-form" className="section-padding bg-bg-section-alt-2">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-heading font-bold text-text-primary mb-6">
                Ready to start?
              </h2>
              
              {formSubmitted ? <div className="bg-neutral-light/10 border border-neutral-light/20 rounded-xl p-12 text-center">
                  <h3 className="text-2xl font-semibold text-text-primary mb-4">
                    Thanks for reaching out!
                  </h3>
                  <p className="text-text-secondary text-lg">
                    We'll get back to you within 24 hours.
                  </p>
                </div> : <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <label className="block text-text-secondary text-sm font-medium">Your Name</label>
                    <Input 
                      type="text" 
                      placeholder="" 
                      className="w-full bg-transparent border-0 border-b border-gray-300 rounded-none px-0 py-3 text-lg focus:border-primary focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 text-white caret-white" 
                      value={formData.name} 
                      onChange={e => setFormData({
                        ...formData,
                        name: e.target.value
                      })} 
                      required 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-text-secondary text-sm font-medium">Email</label>
                    <Input 
                      type="text" 
                      placeholder="" 
                      className="w-full bg-transparent border-0 border-b border-gray-300 rounded-none px-0 py-3 text-lg focus:border-primary focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 text-white caret-white" 
                      value={formData.contact} 
                      onChange={e => setFormData({
                        ...formData,
                        contact: e.target.value
                      })} 
                      required 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-text-secondary text-sm font-medium">Tell us about your project</label>
                    <Input 
                      placeholder="" 
                      className="w-full bg-transparent border-0 border-b border-gray-300 rounded-none px-0 py-3 text-lg focus:border-primary focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 text-white caret-white" 
                      value={formData.message} 
                      onChange={e => setFormData({
                        ...formData,
                        message: e.target.value
                      })} 
                    />
                  </div>
                  <div className="space-y-4 pt-4">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white font-medium py-4 rounded-full text-lg tracking-wide hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Next"}
                    </Button>
                    
                    <div className="text-center pt-4">
                      <p className="text-text-secondary text-sm mb-4">Or send directly via WhatsApp instead</p>
                      <Button className="bg-transparent border border-gray-300 text-text-primary font-medium px-8 py-3 rounded-full text-sm hover:bg-gray-50 transition-all duration-300" asChild>
                        <a href="https://wa.me/353879380494" target="_blank" rel="noopener noreferrer">
                          WhatsApp Us
                        </a>
                      </Button>
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
              <h3 className="text-2xl font-bold tracking-wider mb-2">TINY OUTDOOR</h3>
              <p className="text-gray-400 text-sm tracking-wide">CUSTOM WOODWORKING</p>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wider mb-4">SERVICES</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide">CUSTOM BARS</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide">FURNITURE</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide">OUTDOOR SPACES</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide">HOME BARS</a></li>
              </ul>
            </div>

            {/* Portfolio Column */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wider mb-4">PORTFOLIO</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide">RECENT WORK</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide">COMMERCIAL</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide">RESIDENTIAL</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide">GALLERY</a></li>
              </ul>
            </div>

            {/* About Column */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wider mb-4">ABOUT US</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide">OUR STORY</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide">THE MAKER</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide">PROCESS</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide">TESTIMONIALS</a></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wider mb-4">CONTACT</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide">GET QUOTE</a></li>
                <li><a href="https://wa.me/353879380494" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide">WHATSAPP</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide">EMAIL</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm tracking-wide">LOCATION</a></li>
              </ul>
            </div>
          </div>

          {/* Divider Line */}
          <div className="border-t border-gray-800 mb-8"></div>

          {/* Social Media & Copyright */}
          <div className="flex flex-col items-center space-y-6">
            {/* Social Media Icon */}
            <div className="flex justify-center">
              <a 
                href="#" 
                className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:border-white hover:bg-white/10 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg 
                  width="20" 
                  height="20" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <p className="text-gray-500 text-sm text-center">
              ©Copyright. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;