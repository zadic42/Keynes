import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Cog, TrendingUp, Shield, Globe, Lightbulb } from 'lucide-react';

// Types
interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  category: 'strategy' | 'technology' | 'growth';
}

interface VisibleElements {
  header: boolean;
  cta: boolean;
  categories: boolean;
}

// WhatsApp configuration
const whatsappNumber = '+919074435902'; // Replace with your actual WhatsApp number
const whatsappMessage = 'Hi! I\'m interested in your services and would like to learn more about how you can help transform my business.';

// Service Card Component
const ServiceCard: React.FC<{
  service: Service;
  index: number;
}> = ({ service, index }) => {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timer = setTimeout(() => setIsVisible(true), index * 150);
            observer.unobserve(entry.target);
            return () => clearTimeout(timer);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  const IconComponent = service.icon;

  // Create short description (first sentence or first 60 characters)
  const shortDescription = service.description.split('.')[0] + '.';

  return (
    <div
      ref={cardRef}
      className={`group relative h-96 cursor-pointer transition-all duration-700 ${isVisible
        ? 'opacity-100 translate-y-0 scale-100'
        : 'opacity-0 translate-y-8 scale-95'
        }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ perspective: '1000px' }}
    >
      {/* Card container with flip effect */}
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${hovered ? 'rotate-y-180' : ''}`}>

        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white shadow-md p-8 rounded-2xl transition-all duration-300">
          {/* Icon */}
          <div className={`w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ${isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
            }`}>
            <IconComponent className="h-8 w-8 text-white" />
          </div>

          {/* Front content */}
          <div>
            <h3 className={`text-xl font-bold text-gray-900 mb-4 transition-all duration-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              }`}>
              {service.title}
            </h3>

            <p className={`text-gray-600 text-sm leading-relaxed transition-all duration-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              }`} style={{ transitionDelay: '100ms' }}>
              {shortDescription}
            </p>

            {/* Hover indicator */}
            <div className="absolute bottom-6 right-6 text-blue-500 opacity-70">
              <svg className="w-5 h-5 transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-900 p-4 sm:p-6 md:p-8 rounded-2xl text-white border-2 border-gray-300">
          {/* Back content */}
          <div className="h-full flex flex-col">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-amber-200">
              {service.title}
            </h3>

            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 flex-grow">
              {service.description}
            </p>

            {/* Features list */}
            <div>
              <h4 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-amber-200">Key Features:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                {service.features.slice(0, 4).map((feature, idx) => (
                  <div key={idx} className="flex items-start text-xs text-blue-100">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                    <span className="leading-tight">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Category Filter Component
const CategoryFilter: React.FC<{
  categories: { key: string; label: string; count: number }[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  visible: boolean;
}> = ({ categories, activeCategory, onCategoryChange, visible }) => {
  return (
    <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
      {categories.map((category, index) => (
        <button
          key={category.key}
          onClick={() => onCategoryChange(category.key)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${activeCategory === category.key
            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          {category.label}
          <span className={`ml-2 text-xs px-2 py-1 rounded-full ${activeCategory === category.key
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-600'
            }`}>
            {category.count}
          </span>
        </button>
      ))}
    </div>
  );
};

// Main Services Component
// Add custom styles for 3D flip effect
const flipStyles = `
  .transform-style-preserve-3d {
    transform-style: preserve-3d;
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
`;

const Services: React.FC = () => {
  const [visibleElements, setVisibleElements] = useState<VisibleElements>({
    header: false,
    cta: false,
    categories: false
  });
  const [activeCategory, setActiveCategory] = useState('all');

  const headerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // WhatsApp handler for CTA button
  const handleCTAWhatsAppClick = (): void => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Service data organized by categories
  const services: Service[] = [
    {
      icon: Briefcase,
      title: 'Authority Approvals',
      description: 'We handle all necessary approvals from government and local authorities to ensure your projects meet compliance standards without delays.',
      features: ['Building permits and certifications.', 'Trade license approvals.', 'Fire safety and environmental compliance.',],
      category: 'strategy'
    },
    {
      icon: TrendingUp,
      title: 'Construction Services',
      description: 'We specialize in delivering construction solutions that combine precision, innovation, and efficiency. From conceptualization to project handover, our team ensures every detail meets the highest standards.',
      features: ['High-rise residential and commercial buildings.', 'Renovation and remodeling projects', 'Structural design and construction.', 'Turnkey solutions for hassle-free project execution.'],
      category: 'strategy'
    },
    {
      icon: Cog,
      title: 'Property Management',
      description: 'Our property management services focus on maintaining and enhancing the value of your assets, offering peace of mind and professional care.',
      features: ['Tenant management and lease agreements.', 'Property inspections and maintenance.', 'Financial reporting and budgeting.'],
      category: 'technology'
    },
    {
      icon: Shield,
      title: 'Business Support Services',
      description: 'Let us handle the administrative complexities while you focus on growing your business. Our tailored support services simplify your operations.',
      features: ['PRO services for government approvals and licensing.', 'Accounting and bookkeeping services.', 'Marketing, branding, and advertising solutions.', 'Document clearance and visa processing.'],
      category: 'technology'
    },
    {
      icon: Globe,
      title: 'General Maintenance',
      description: 'We specialize in delivering construction solutions that combine precision, innovation, and efficiency. From conceptualization to project handover, our team ensures every detail meets the highest standards.',
      features: ['High-rise residential and commercial buildings', 'Renovation and remodeling projects', 'Structural design and construction', 'Turnkey solutions for hassle-free project execution'],
      category: 'growth'
    },
    {
      icon: Lightbulb,
      title: 'IT and Security Solutions',
      description: 'Stay secure and connected with our innovative IT and security solutions tailored to meet the demands of modern businesses.',
      features: ['IT infrastructure setup and networking', 'Installation of advanced CCTV and surveillance systems', 'Software development and management solutions', 'Cybersecurity services for data protection'],
      category: 'growth'
    },
    {
      icon: Lightbulb,
      title: 'Pest Control Services',
      description: 'Protect your property from pests with our effective pest control solutions.',
      features: ['Safe and eco-friendly pest removal', 'Regular pest monitoring and prevention plans', 'Specialized treatments for termites, rodents, and insects'],
      category: 'growth'
    },
    {
      icon: Lightbulb,
      title: 'Additional Services',
      description: 'We also offer a range of specialized services to cater to specific client requirements:',
      features: ['Event management and setup support', 'Cleaning services for homes and offices', 'Landscaping and gardening solutions'],
      category: 'growth'
    },
    {
      icon: Lightbulb,
      title: 'Interior Design',
      description: 'We specialize in delivering construction solutions that combine precision, innovation, and efficiency. From conceptualization to project handover, our team ensures every detail meets the highest standards.',
      features: ['High-rise residential and commercial buildings', 'Renovation and remodeling projects', 'Structural design and construction', 'Turnkey solutions for hassle-free project execution'],
      category: 'growth'
    },
  ];

  // Category configuration
  const categories = [
    { key: 'all', label: 'All Services', count: services.length },
    { key: 'strategy', label: 'Strategy', count: services.filter(s => s.category === 'strategy').length },
    { key: 'technology', label: 'Technology', count: services.filter(s => s.category === 'technology').length },
    { key: 'growth', label: 'Growth', count: services.filter(s => s.category === 'growth').length }
  ];

  // Filter services based on active category
  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter(service => service.category === activeCategory);

  // Intersection Observer setup
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;

          if (target === headerRef.current) {
            setVisibleElements(prev => ({ ...prev, header: true }));
          } else if (target === categoriesRef.current) {
            setVisibleElements(prev => ({ ...prev, categories: true }));
          } else if (target === ctaRef.current) {
            setVisibleElements(prev => ({ ...prev, cta: true }));
          }

          observer.unobserve(target);
        }
      });
    }, observerOptions);

    [headerRef, categoriesRef, ctaRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Add custom styles */}
      <style dangerouslySetInnerHTML={{ __html: flipStyles }} />

      <section id="services" className="py-20 bg-gradient-to-br from-blue-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div
            ref={headerRef}
            className={`text-center max-w-4xl mx-auto mb-16 transition-all duration-1000 ${visibleElements.header
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
              }`}
          >
            <div className={`inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6 transition-all duration-700 ${visibleElements.header ? 'scale-100' : 'scale-0'
              }`}>
              Our Services Portfolio
            </div>

            <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight transition-all duration-1000 delay-200 ${visibleElements.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
              Comprehensive Solutions for
              <span className="bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent"> Every Business Need</span>
            </h2>

            <p className={`text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto transition-all duration-1000 delay-400 ${visibleElements.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
              From strategic consulting to technology implementation, we provide end-to-end
              solutions tailored to drive your business forward.
            </p>
          </div>

          {/* Category Filter */}
          <div ref={categoriesRef}>
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              visible={visibleElements.categories}
            />
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredServices.map((service, index) => (
              <ServiceCard
                key={`${service.title}-${activeCategory}`}
                service={service}
                index={index}
              />
            ))}
          </div>

          {/* CTA Section */}
          <div
            ref={ctaRef}
            className={`bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-3xl p-10 text-center text-white relative overflow-hidden transition-all duration-1000 ${visibleElements.cta
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-95'
              }`}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />

            <div className="relative">
              <h3 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-800 delay-200 ${visibleElements.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                Ready to Transform Your Business?
              </h3>

              <p className={`text-xl text-blue-100 mb-8 max-w-2xl mx-auto transition-all duration-800 delay-400 ${visibleElements.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                Let's discuss how our comprehensive services can accelerate your growth and drive sustainable success.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={handleCTAWhatsAppClick}
                  className="group border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm hover:bg-white/50 flex items-center gap-2"
                >
                  Get Started Today
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;