import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ScrollReveal from '@/components/ScrollReveal';

// Import images
import painValueImg from '@/assets/pain-value.jpg';
import capBarsImg from '@/assets/cap-bars.jpg';
import capHomeBarsImg from '@/assets/cap-home-bars.jpg';
import capOutdoorImg from '@/assets/cap-outdoor.jpg';
import capFurnitureImg from '@/assets/cap-furniture.jpg';
import projSummitImg from '@/assets/proj-summit.jpg';
import projAbbeyImg from '@/assets/proj-abbey.jpg';
import projFindlatersImg from '@/assets/proj-findlaters.jpg';
import makerImg from '@/assets/maker.jpg';
import socialProofImg from '@/assets/social-proof.jpg';
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
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Portfolio data structure
  const portfolioCategories = [
    {
      id: 'bars-restaurants',
      title: 'Hospitality Spaces',
      description: 'Commercial hospitality spaces',
      projects: [
        { id: 'summit-inn', title: 'The Summit Inn', subtitle: 'Custom bar design and production', caption: 'Premium walnut bar with brass fixtures', images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg'] },
        { id: 'mamo', title: 'MAMO', subtitle: 'Contemporary restaurant interior', caption: 'Modern dining space with custom furnishings', images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg', 'placeholder4.jpg'] },
        { id: 'riverside-bar', title: 'Riverside Bar', subtitle: 'Waterfront bar installation', caption: 'Outdoor-inspired bar design', images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg'] },
        { id: 'peggys', title: 'Peggy\'s St Stephens', subtitle: 'Traditional pub refurbishment', caption: 'Classic Irish pub with modern touches', images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg', 'placeholder4.jpg', 'placeholder5.jpg'] },
        { id: 'casa-clontarf', title: 'Casa Clontarf', subtitle: 'Mediterranean restaurant', caption: 'Warm, inviting dining atmosphere', images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg'] },
        { id: 'green-phone-box', title: 'The Green Phone Box', subtitle: 'Unique themed bar', caption: 'Creative concept bar design', images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg'] }
      ]
    },
    {
      id: 'outdoor-spaces',
      title: 'Outdoor Spaces',
      description: 'Gardens, decking, and outdoor living',
      projects: [
        { id: 'thormanby-lawns', title: 'Thormanby Lawns', subtitle: 'Landscape garden design', caption: 'Extensive outdoor living space', images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg'] },
        { id: 'pergola-decking', title: 'Pergola Decking', subtitle: 'Covered outdoor area', caption: 'Timber pergola with integrated seating', images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg', 'placeholder4.jpg'] },
        { id: 'howth-decking', title: 'Howth Decking', subtitle: 'Coastal deck installation', caption: 'Weather-resistant decking solution', images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg'] },
        { id: 'raheny-patio', title: 'Raheny Patio', subtitle: 'Stone patio design', caption: 'Natural stone outdoor entertaining area', images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg'] },
        { id: 'decking-2024', title: 'Decking 2024', subtitle: 'Modern deck construction', caption: 'Contemporary outdoor platform', images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg', 'placeholder4.jpg'] },
        { id: 'treehouse', title: 'Children\'s Treehouse', subtitle: 'Custom playground structure', caption: 'Safe and imaginative play space', images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg'] },
        { id: 'raheny-garage', title: 'Raheny Garage', subtitle: 'Garage conversion project', caption: 'Multi-purpose outdoor building', images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg'] },
        { id: 'container-home', title: 'Container Home', subtitle: 'Shipping container conversion', caption: 'Innovative living space solution', images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg', 'placeholder4.jpg'] },
        { id: 'archideo', title: 'Archideo', subtitle: 'Architectural outdoor feature', caption: 'Statement outdoor installation', images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg'] }
      ]
    },
    {
      id: 'custom-pieces',
      title: 'Custom Pieces',
      description: 'Bespoke furniture and installations',
      projects: [
        { id: 'art-studio', title: 'Art Studio', subtitle: 'Custom studio furniture', caption: 'Tailored workspace solutions', images: ['placeholder1.jpg', 'placeholder2.jpg', 'placeholder3.jpg'] }
      ]
    }
  ];

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
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
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

    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
      toast({
        title: "Thanks for reaching out!",
        description: "We'll get back to you within 24 hours."
      });
    }, 500);
  };
  const capabilities = [{
    title: "Hospitality Spaces",
    image: capBarsImg,
    description: "Custom outdoor bar installations"
  }, {
    title: "Outdoor Spaces",
    image: capHomeBarsImg,
    description: "Sophisticated home entertainment spaces"
  }, {
    title: "Custom Pieces",
    image: capOutdoorImg,
    description: "Complete outdoor living solutions"
  }];
  const projects = [{
    id: 'summit-inn-recent',
    title: "The Summit Inn", 
    subtitle: "Custom Bar Design and Production",
    caption: "Premium walnut bar with brass fixtures and custom lighting design",
    image: projSummitImg,
    images: ['summit1.jpg', 'summit2.jpg', 'summit3.jpg', 'summit4.jpg']
  }, {
    id: 'abbey-tavern-recent',
    title: "The Abbey Tavern", 
    subtitle: "Walnut Backlit Bar",
    caption: "Sophisticated backlit bar featuring rich walnut wood and integrated LED lighting",
    image: projAbbeyImg,
    images: ['abbey1.jpg', 'abbey2.jpg', 'abbey3.jpg']
  }, {
    id: 'findlaters-recent',
    title: "Findlaters", 
    subtitle: "Interior Shelving in Solid Oak",
    caption: "Custom solid oak shelving system with precision joinery and natural finish",
    image: projFindlatersImg,
    images: ['findlaters1.jpg', 'findlaters2.jpg', 'findlaters3.jpg', 'findlaters4.jpg']
  }];
  const processSteps = [{
    number: "1",
    title: "Consultation",
    description: "We discuss your vision"
  }, {
    number: "2",
    title: "Design",
    description: "Custom plans created"
  }, {
    number: "3",
    title: "Production",
    description: "Crafted by hand"
  }, {
    number: "4",
    title: "Installation",
    description: "Professional setup"
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
                  Not another IKEA look.
                </h2>
                <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                  If you want something no one else has — we design and build it for you. 
                  Premium materials, made locally.
                </p>
                <div className="space-y-4">
                  {["One-of-a-kind, never repeat", "Natural materials & premium finish", "Designed for your exact space"].map((item, index) => <div key={index} className="flex items-center space-x-3">
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
                  <img src="/lovable-uploads/11fcac85-5eb5-4170-b6ab-5d8ca77d9335.png" alt="Custom bar interior with warm lighting and wood finishes" className="w-full h-full object-cover transform scale-125" />
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
            <h2 className="font-heading font-bold text-text-primary text-center mb-12">Every piece begins where mass production ends</h2>
            
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[{
            title: "Interior Shot",
            image: projAbbeyImg,
            description: "See how pieces fit in real spaces"
          }, {
            title: "Details",
            image: projSummitImg,
            description: "Close-up craftsmanship and finishing"
          }, {
            title: "Handmade Quality",
            image: projFindlatersImg,
            description: "Premium materials and construction"
          }].map((example, index) => <ScrollReveal key={index} delay={index * 100}>
                <div className="text-center">
                  <div className="relative mb-4">
                    <img src={example.image} alt={example.title} className="w-full h-64 object-cover rounded-lg shadow-lg" />
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
              <p className="text-lg text-text-secondary max-w-4xl mx-auto">
                Each piece goes through careful planning, selection of premium materials, 
                and meticulous handcrafting to ensure it meets our quality standards.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 3: Interactive Portfolio */}
      <section id="work" className="py-16 md:py-20 lg:py-24 relative overflow-hidden bg-wood-dark">
        
        <div className="container mx-auto px-8 md:px-12 lg:px-16 relative z-10">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-text-primary text-center mb-16">
              What We Create
            </h2>
          </ScrollReveal>
          
          <div className="space-y-4">
            {portfolioCategories.map((category, categoryIndex) => (
              <div key={category.id} className="w-full">
                <ScrollReveal delay={categoryIndex * 100}>
                  <div 
                    className={`
                      relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ease-out
                      bg-gradient-to-br from-bg-section-alt/80 via-bg-section-alt-2/75 to-bg-section-alt/80
                      backdrop-blur-md border border-bg-section-alt/60 shadow-2xl
                      hover:shadow-accent-primary/20 hover:shadow-[0_20px_40px_-12px_rgba(197,156,87,0.25)]
                      hover:border-accent-primary/40 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-bg-section-alt-2/85 hover:via-bg-section-alt/80 hover:to-bg-section-alt-2/85
                      ${expandedCategory === category.id 
                        ? 'shadow-accent-primary/30 shadow-[0_25px_50px_-12px_rgba(197,156,87,0.35)] border-accent-primary/60 bg-gradient-to-br from-bg-section-alt-2/85 via-bg-section-alt/80 to-bg-section-alt-2/85' 
                        : ''
                      }
                    `}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    {/* Premium inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent"></div>
                    
                    {/* Active state accent line */}
                    {expandedCategory === category.id && (
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-primary to-transparent"></div>
                    )}
                    
                    <div className="relative p-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-heading font-bold text-white text-2xl md:text-3xl mb-3 tracking-tight">
                            {category.title}
                          </h3>
                          <p className="text-gray-300 text-lg font-medium">{category.description}</p>
                        </div>
                        <div className={`transform transition-all duration-300 ease-out ${
                          expandedCategory === category.id ? 'rotate-180 text-accent-primary' : 'text-gray-400'
                        }`}>
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    
                    {/* Accordion Content */}
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      expandedCategory === category.id 
                        ? 'max-h-[1500px] opacity-100 mt-8' 
                        : 'max-h-0 opacity-0'
                    }`}>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.projects.map((project, projectIndex) => (
                          <div
                            key={project.id}
                            className="bg-bg-section-alt/50 rounded-xl overflow-hidden cursor-pointer group hover:bg-bg-section-alt/70 transition-all duration-300 border border-bg-section-alt/30 hover:border-accent-primary/40"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProjectClick(project);
                            }}
                          >
                            <div className="relative h-48 bg-gradient-to-br from-bg-section-alt-2 to-bg-section-alt overflow-hidden">
                              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgb3BhY2l0eT0iMC4xIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iI2ZmZmZmZiIvPgo8L2c+Cjwvc3ZnPgo=')] opacity-20"></div>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                              <div className="absolute bottom-4 left-4 right-4">
                                <div className="text-white font-medium text-sm opacity-70">Preview Image</div>
                              </div>
                            </div>
                            <div className="p-4">
                              <h4 className="font-heading font-bold text-text-primary mb-1 group-hover:text-accent-primary transition-colors">{project.title}</h4>
                              <p className="text-text-secondary text-sm">{project.subtitle}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
        
        {/* Project Modal */}
        {selectedProject && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
            onClick={handleCloseModal}
          >
            <div 
              className="bg-gray-900 rounded-2xl max-w-4xl max-h-[80vh] w-full overflow-hidden shadow-2xl border border-gray-700/50 relative animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
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
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgb3BhY2l0eT0iMC4xIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iI2ZmZmZmZiIvPgo8L2c+Cjwvc3ZnPgo=')] opacity-20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-white text-2xl font-bold mb-2">Image {currentImageIndex + 1} of {selectedProject.images.length}</div>
                        <div className="text-gray-400">Max size: 1280px wide, object-contain</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation Arrows */}
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
                
                {/* Image Thumbnails */}
                {selectedProject.images.length > 1 && (
                  <div className="flex gap-2 mt-4 justify-center items-center overflow-x-auto px-4 py-2 min-h-[50px]">
                    {selectedProject.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                          currentImageIndex === index 
                            ? 'ring-2 ring-white/80 opacity-100' 
                            : 'opacity-60 hover:opacity-80'
                        }`}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-700 relative">
                          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgb3BhY2l0eT0iMC4xIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iI2ZmZmZmZiIvPgo8L2c+Cjwvc3ZnPgo=')] opacity-30"></div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Section 4: Why Custom > Standard */}
      <section className="section-padding bg-bg-section-alt">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <ScrollReveal>
              <h2 className="font-heading font-bold text-text-primary">
                Why custom beats standard
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="space-y-6">
                {["Never repeat", "Made in Ireland", "Natural materials", "Built to last"].map((feature, index) => <div key={index}>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-accent-primary rounded-full"></div>
                      <span className="text-lg text-text-primary font-medium">{feature}</span>
                    </div>
                    {index < 3 && <div className="brass-divider mt-6"></div>}
                  </div>)}
                
                {/* Comparison table */}
                <div className="mt-12 bg-bg-section-alt-2 rounded-xl p-6">
                  <h3 className="font-heading font-bold text-text-primary mb-6">Mass-market vs Custom</h3>
                  <div className="space-y-4">
                    {[{
                    standard: "Same as everyone",
                    custom: "One-of-a-kind design"
                  }, {
                    standard: "Machine produced",
                    custom: "Hand crafted"
                  }, {
                    standard: "Cheap materials",
                    custom: "Premium oak, walnut, brass"
                  }].map((row, index) => <div key={index} className="grid grid-cols-2 gap-4 text-sm">
                        <span className="text-text-muted">{row.standard}</span>
                        <span className="text-text-primary font-medium">{row.custom}</span>
                      </div>)}
                  </div>
                </div>
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
            {projects.map((project, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div 
                  className="premium-card group cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img src={project.image} alt={project.title} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-main/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
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
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Social Proof */}
      <section id="reviews" className="section-padding bg-bg-section-alt-2">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="grid md:grid-cols-3 gap-12 items-center">
              <div className="relative">
                <img src={socialProofImg} alt="Happy customers at our custom bar" className="w-full h-64 object-cover rounded-xl" />
              </div>
              <div className="md:col-span-2">
                <div className="text-6xl text-accent-focus mb-4">"</div>
                <blockquote className="text-xl text-text-primary mb-6 leading-relaxed">
                  "Absolutely stunning work. The attention to detail and quality of craftsmanship 
                  exceeded our expectations. This bar is the centerpiece of our venue."
                </blockquote>
                <cite className="text-text-secondary font-medium">— The Summit Inn</cite>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 7: Process */}
      <section id="process" className="section-padding bg-bg-section-alt relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={makerImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-6 relative">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-text-primary text-center mb-16">
              How we work
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => <ScrollReveal key={index} delay={index * 150}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-heading font-bold text-bg-main">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary">{step.description}</p>
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
                <div className="absolute inset-0 border-2 border-accent-hover rounded-xl transform rotate-1"></div>
                <img src={makerImg} alt="Craftsman in workshop" className="relative w-full h-96 object-cover rounded-xl" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div>
                <h2 className="font-heading font-bold text-text-primary mb-6">
                  Who I am
                </h2>
                <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                  One person behind every piece. I take one project at a time to keep the quality absolute.
                </p>
                <div className="space-y-3">
                  <p className="text-text-primary">
                    <span className="font-semibold">Materials I love:</span> walnut, oak, brass. Oil finish.
                  </p>
                </div>
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
              
              {formSubmitted ? <div className="bg-neutral-light/10 border border-neutral-light/20 rounded-xl p-8 text-center">
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    Thanks for reaching out!
                  </h3>
                  <p className="text-text-secondary">
                    We'll get back to you within 24 hours.
                  </p>
                </div> : <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input type="text" placeholder="Your name" className="form-field" value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} required />
                  </div>
                  <div>
                    <Input type="text" placeholder="Email or phone" className="form-field" value={formData.contact} onChange={e => setFormData({
                  ...formData,
                  contact: e.target.value
                })} required />
                  </div>
                  <div>
                    <Textarea placeholder="Tell us about your project" className="form-field min-h-[120px]" value={formData.message} onChange={e => setFormData({
                  ...formData,
                  message: e.target.value
                })} />
                  </div>
                  <Button type="submit" className="btn-primary w-full">
                    Send message
                  </Button>
                  
                  <div className="flex justify-center space-x-4 pt-4">
                    <Button variant="outline" className="btn-secondary" asChild>
                      <a href="https://wa.me/353000000000" target="_blank" rel="noopener noreferrer">
                        WhatsApp
                      </a>
                    </Button>
                    <Button variant="outline" className="btn-secondary" asChild>
                      <a href="https://t.me/tinyoutdoorspaces" target="_blank" rel="noopener noreferrer">
                        Telegram
                      </a>
                    </Button>
                  </div>
                </form>}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-main py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-heading font-bold text-text-primary mb-4 md:mb-0">
              Tiny Outdoor Spaces
            </div>
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <button className="text-text-secondary hover:text-text-primary transition-colors">Work</button>
              <button className="text-text-secondary hover:text-text-primary transition-colors">Process</button>
              <button className="text-text-secondary hover:text-text-primary transition-colors">About</button>
              <button className="text-text-secondary hover:text-text-primary transition-colors">Contact</button>
            </div>
            <div className="text-sm text-text-muted">
              Made in Ireland
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;