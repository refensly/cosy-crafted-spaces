import { useState } from 'react';
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
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
      toast({
        title: "Thanks for reaching out!",
        description: "We'll get back to you within 24 hours.",
      });
    }, 500);
  };

  const capabilities = [
    {
      title: "Bars",
      image: capBarsImg,
      description: "Custom outdoor bar installations"
    },
    {
      title: "Home Bars",
      image: capHomeBarsImg,
      description: "Sophisticated home entertainment spaces"
    },
    {
      title: "Outdoor Spaces",
      image: capOutdoorImg,
      description: "Complete outdoor living solutions"
    },
    {
      title: "Custom Furniture",
      image: capFurnitureImg,
      description: "Bespoke furniture pieces"
    }
  ];

  const projects = [
    {
      title: "The Summit Inn — Custom Bar Design and Production",
      image: projSummitImg
    },
    {
      title: "The Abbey Tavern — Walnut Backlit Bar",
      image: projAbbeyImg
    },
    {
      title: "Findlaters — Interior Shelving in Solid Oak",
      image: projFindlatersImg
    }
  ];

  const processSteps = [
    { number: "1", title: "Consultation", description: "We discuss your vision" },
    { number: "2", title: "Design", description: "Custom plans created" },
    { number: "3", title: "Production", description: "Crafted by hand" },
    { number: "4", title: "Installation", description: "Professional setup" }
  ];

  return (
    <div className="min-h-screen">
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
                  {[
                    "One-of-a-kind, never repeat",
                    "Natural materials & premium finish", 
                    "Designed for your exact space"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded-full bg-accent-primary flex items-center justify-center">
                        <svg className="w-3 h-3 text-bg-main" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-text-primary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="relative">
                <img 
                  src={painValueImg} 
                  alt="Premium custom bar furniture" 
                  className="w-full h-96 object-cover rounded-xl"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* New Section: Handmade Quality Examples */}
      <section className="section-padding bg-bg-main">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-text-primary text-center mb-4">
              How does it look?
            </h2>
            <p className="text-xl text-text-secondary text-center mb-16 max-w-3xl mx-auto">
              "What is it really beautiful? Do I want this at home?"
            </p>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Interior Shot",
                image: projAbbeyImg,
                description: "See how pieces fit in real spaces"
              },
              {
                title: "Details",
                image: projSummitImg,
                description: "Close-up craftsmanship and finishing"
              },
              {
                title: "Handmade Quality",
                image: projFindlatersImg,
                description: "Premium materials and construction"
              }
            ].map((example, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="text-center">
                  <div className="relative mb-4">
                    <img 
                      src={example.image} 
                      alt={example.title}
                      className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <h3 className="font-heading font-bold text-text-primary mb-2 text-lg">
                    {example.title}
                  </h3>
                  <p className="text-text-secondary text-sm">{example.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="bg-bg-section-alt rounded-xl p-8 text-center">
              <h3 className="font-heading font-bold text-text-primary mb-4">
                Producing
              </h3>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Each piece goes through careful planning, selection of premium materials, 
                and meticulous handcrafting to ensure it meets our quality standards.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 3: Capabilities */}
      <section id="work" className="section-padding bg-bg-main">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-text-primary text-center mb-16">
              What we create
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="premium-card group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img 
                      src={capability.image} 
                      alt={capability.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-bg-main/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-text-primary font-semibold">View examples</span>
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-text-primary mb-2">
                    {capability.title}
                  </h3>
                  <p className="text-text-secondary">{capability.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
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
                {[
                  "Never repeat",
                  "Made in Ireland", 
                  "Natural materials",
                  "Built to last"
                ].map((feature, index) => (
                  <div key={index}>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-accent-primary rounded-full"></div>
                      <span className="text-lg text-text-primary font-medium">{feature}</span>
                    </div>
                    {index < 3 && <div className="brass-divider mt-6"></div>}
                  </div>
                ))}
                
                {/* Comparison table */}
                <div className="mt-12 bg-bg-section-alt-2 rounded-xl p-6">
                  <h3 className="font-heading font-bold text-text-primary mb-6">Mass-market vs Custom</h3>
                  <div className="space-y-4">
                    {[
                      { standard: "Same as everyone", custom: "One-of-a-kind design" },
                      { standard: "Machine produced", custom: "Hand crafted" },
                      { standard: "Cheap materials", custom: "Premium oak, walnut, brass" }
                    ].map((row, index) => (
                      <div key={index} className="grid grid-cols-2 gap-4 text-sm">
                        <span className="text-text-muted">{row.standard}</span>
                        <span className="text-text-primary font-medium">{row.custom}</span>
                      </div>
                    ))}
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
                <div className="premium-card group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-main/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6">
                        <h3 className="font-heading font-bold text-text-primary mb-2">
                          {project.title}
                        </h3>
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
                <img 
                  src={socialProofImg} 
                  alt="Happy customers at our custom bar" 
                  className="w-full h-64 object-cover rounded-xl"
                />
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
            {processSteps.map((step, index) => (
              <ScrollReveal key={index} delay={index * 150}>
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
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block w-full h-px bg-accent-primary/30 mt-8"></div>
                  )}
                  {index === processSteps.length - 1 && (
                    <div className="hidden md:block w-full h-px bg-accent-primary/30 mt-8"></div>
                  )}
                </div>
              </ScrollReveal>
            ))}
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
                <img 
                  src={makerImg} 
                  alt="Craftsman in workshop" 
                  className="relative w-full h-96 object-cover rounded-xl"
                />
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
              
              {formSubmitted ? (
                <div className="bg-neutral-light/10 border border-neutral-light/20 rounded-xl p-8 text-center">
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    Thanks for reaching out!
                  </h3>
                  <p className="text-text-secondary">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      type="text"
                      placeholder="Your name"
                      className="form-field"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="Email or phone"
                      className="form-field"
                      value={formData.contact}
                      onChange={(e) => setFormData({...formData, contact: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Tell us about your project"
                      className="form-field min-h-[120px]"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
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
                </form>
              )}
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
    </div>
  );
};

export default Index;