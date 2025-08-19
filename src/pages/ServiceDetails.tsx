import React, { useState, useEffect, useRef } from 'react';
import ContactButton from './ServiceContact';

import {
  Building,
  FileCheck,
  Home,
  Briefcase,
  Wrench,
  Shield,
  Bug,
  Palette,
  Calendar,
  Sparkles,
  TreePine,
  CheckCircle,
  ArrowLeft,
  Clock,
  Users,
  Award,
  Star,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Target,
  Zap,
  Heart,
} from 'lucide-react';

interface Testimonial {
  text: string;
  author: string;
  company: string;
  rating: number;
}

interface Service {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
  detailedDescription: string;
  benefits: string[];
  process: { step: string; description: string }[];
  pricing: string;
  duration: string;
  teamSize: string;
  testimonials: Testimonial[];
}

const services: Service[] = [
  {
    title: "Authority Approvals",
    description: "Navigating Regulations with Ease",
    features: [
      "Building permits and certifications",
      "Trade license approvals",
      "Fire safety and environmental compliance"
    ],
    icon: <FileCheck className="w-8 h-8" />,
    color: "from-blue-900 to-blue-500",
    detailedDescription: "Our Authority Approvals service streamlines the complex process of obtaining necessary permits and certifications for your business or construction project. We handle all regulatory requirements, ensuring full compliance with UAE laws and regulations while saving you time and reducing bureaucratic hassles.",
    benefits: [
      "Expert knowledge of UAE regulatory framework",
      "Faster approval times through established relationships",
      "Complete documentation management",
      "Regular status updates and transparent communication",
      "Risk mitigation and compliance assurance",
      "Cost-effective solutions with no hidden fees"
    ],
    process: [
      { step: "Initial Consultation", description: "We assess your specific requirements and identify all necessary approvals" },
      { step: "Documentation Preparation", description: "Our team prepares all required documents with precision and accuracy" },
      { step: "Authority Submission", description: "We submit applications to relevant authorities with proper follow-up" },
      { step: "Status Monitoring", description: "Regular tracking and updates on application progress" },
      { step: "Final Delivery", description: "Delivery of all approved permits and certifications to you" }
    ],
    pricing: "Starting from AED 2,500",
    duration: "2-4 weeks",
    teamSize: "3-5 specialists",
    testimonials: [
      {
        text: "Keynes Group made our licensing process incredibly smooth. What usually takes months was completed in just 3 weeks!",
        author: "Ahmed Al-Mansouri",
        company: "Emirates Trading LLC",
        rating: 5
      },
      {
        text: "Professional service and excellent communication throughout the approval process. Highly recommended!",
        author: "Maria Santos",
        company: "Gulf Construction Co.",
        rating: 5
      },
      {
        text: "Their expertise in UAE regulations saved us countless hours and potential compliance issues.",
        author: "John Mitchell",
        company: "Tech Innovations Dubai",
        rating: 5
      }
    ]
  },
  {
    title: "Construction",
    description: "Building the Future, One Project at a Time",
    features: [
      "High-rise residential and commercial buildings",
      "Renovation and remodeling projects",
      "Structural design and construction",
      "Turnkey solutions for hassle-free project execution"
    ],
    icon: <Building className="w-8 h-8" />,
    color: "from-blue-500 to-blue-900",
    detailedDescription: "From concept to completion, our construction services deliver exceptional quality in residential and commercial projects. We combine innovative design, premium materials, and skilled craftsmanship to create structures that stand the test of time while meeting modern sustainability standards.",
    benefits: [
      "End-to-end project management from design to handover",
      "Quality materials sourced from trusted suppliers",
      "Experienced team of architects and engineers",
      "Adherence to international safety and quality standards",
      "Sustainable and energy-efficient construction practices",
      "Flexible project timelines to meet your requirements"
    ],
    process: [
      { step: "Project Consultation", description: "Understanding your vision, requirements, and budget constraints" },
      { step: "Design & Planning", description: "Architectural design, engineering plans, and permit acquisitions" },
      { step: "Construction Phase", description: "Professional construction with regular quality checks and updates" },
      { step: "Quality Inspection", description: "Comprehensive inspection and testing of all systems and structures" },
      { step: "Project Handover", description: "Final walkthrough, documentation, and warranty provision" }
    ],
    pricing: "From AED 150 per sq ft",
    duration: "6-18 months",
    teamSize: "15-50 professionals",
    testimonials: [
      {
        text: "The quality of construction exceeded our expectations. Professional team, timely delivery, and excellent craftsmanship throughout.",
        author: "Sarah Johnson",
        company: "Horizon Developments",
        rating: 5
      },
      {
        text: "Outstanding project management and attention to detail. They delivered exactly what was promised.",
        author: "Omar Al-Rashid",
        company: "Vista Properties",
        rating: 5
      },
      {
        text: "Exceptional build quality and finished on time despite challenging conditions. Will definitely work with them again.",
        author: "Robert Chen",
        company: "Modern Living Spaces",
        rating: 5
      }
    ]
  },
  {
    title: "Property Management",
    description: "Maximizing the Value of Your Investments",
    features: [
      "Tenant management and lease agreements",
      "Property inspections and maintenance",
      "Financial reporting and budgeting"
    ],
    icon: <Home className="w-8 h-8" />,
    color: "from-blue-900 to-blue-500",
    detailedDescription: "Our comprehensive property management services ensure your real estate investments perform at their peak. We handle everything from tenant relations to maintenance, allowing you to enjoy passive income while we maximize your property's value and minimize vacancy rates.",
    benefits: [
      "Professional tenant screening and placement",
      "Regular property maintenance and upkeep",
      "Detailed financial reporting and rent collection",
      "24/7 emergency response and tenant support",
      "Market-rate analysis and rent optimization",
      "Legal compliance and documentation management"
    ],
    process: [
      { step: "Property Assessment", description: "Comprehensive evaluation of your property and market positioning" },
      { step: "Marketing & Tenant Search", description: "Professional photography, listing, and tenant screening process" },
      { step: "Lease Management", description: "Contract preparation, signing, and move-in coordination" },
      { step: "Ongoing Management", description: "Rent collection, maintenance coordination, and tenant relations" },
      { step: "Regular Reporting", description: "Monthly financial reports and property condition updates" }
    ],
    pricing: "8-12% of rental income",
    duration: "Ongoing service",
    teamSize: "2-4 managers per property",
    testimonials: [
      {
        text: "Since partnering with Keynes, our property occupancy increased to 98% and maintenance issues are resolved within hours.",
        author: "Mohammed Al-Rashid",
        company: "Gulf Properties Investment",
        rating: 5
      },
      {
        text: "Excellent property management with transparent reporting. Our rental income has increased by 15%.",
        author: "Lisa Thompson",
        company: "Premium Real Estate Group",
        rating: 5
      },
      {
        text: "Professional tenant screening and quick response to issues. They truly care about property value.",
        author: "Hassan Al-Mansoori",
        company: "Dubai Investment Holdings",
        rating: 5
      }
    ]
  },
  {
    title: "Business Support Services",
    description: "Streamlining Your Business Operations",
    features: [
      "PRO services for government approvals and licensing",
      "Accounting and bookkeeping services",
      "Marketing, branding, and advertising solutions",
      "Document clearance and visa processing"
    ],
    icon: <Briefcase className="w-8 h-8" />,
    color: "from-blue-500 to-blue-900",
    detailedDescription: "Our business support services provide comprehensive administrative and operational assistance to help your company thrive in the competitive UAE market. From legal compliance to marketing strategies, we're your one-stop solution for business growth and efficiency.",
    benefits: [
      "Complete PRO services with government liaison",
      "Professional accounting and tax advisory",
      "Creative marketing and brand development",
      "Efficient visa and immigration services",
      "Digital transformation and automation",
      "Strategic business consulting and planning"
    ],
    process: [
      { step: "Business Analysis", description: "Comprehensive assessment of your business needs and goals" },
      { step: "Service Planning", description: "Customized service package tailored to your requirements" },
      { step: "Implementation", description: "Systematic execution of services with dedicated account management" },
      { step: "Monitoring & Support", description: "Ongoing support, optimization, and performance tracking" },
      { step: "Growth Strategy", description: "Continuous improvement and scaling recommendations" }
    ],
    pricing: "Packages from AED 1,500/month",
    duration: "Flexible contracts",
    teamSize: "5-8 specialists",
    testimonials: [
      {
        text: "Their business support has been invaluable. We've streamlined our operations and increased efficiency by 40%.",
        author: "Lisa Chen",
        company: "TechStart Solutions",
        rating: 5
      },
      {
        text: "Comprehensive PRO services that saved us months of paperwork. Professional and reliable team.",
        author: "Abdul Rahman",
        company: "Emirates Business Hub",
        rating: 5
      },
      {
        text: "Outstanding accounting and marketing support. They've helped us grow our business significantly.",
        author: "Jennifer Martinez",
        company: "Global Trade Partners",
        rating: 5
      }
    ]
  },
  {
    title: "General Maintenance",
    description: "Reliable Upkeep for Your Property",
    features: [
      "Plumbing and electrical repairs",
      "HVAC system maintenance",
      "Interior and exterior painting services",
      "Regular facility maintenance and cleaning"
    ],
    icon: <Wrench className="w-8 h-8" />,
    color: "from-blue-900 to-blue-500",
    detailedDescription: "Keep your property in pristine condition with our comprehensive maintenance services. Our skilled technicians provide reliable, efficient solutions for all your maintenance needs, from routine upkeep to emergency repairs, ensuring your property remains safe, functional, and valuable.",
    benefits: [
      "Preventive maintenance to avoid costly repairs",
      "24/7 emergency response for urgent issues",
      "Certified technicians with extensive experience",
      "Quality parts and materials for lasting solutions",
      "Scheduled maintenance programs for optimal performance",
      "Transparent pricing with detailed service reports"
    ],
    process: [
      { step: "Property Inspection", description: "Comprehensive assessment of maintenance needs and priorities" },
      { step: "Maintenance Plan", description: "Customized maintenance schedule based on property requirements" },
      { step: "Service Execution", description: "Professional maintenance work with quality assurance" },
      { step: "Progress Monitoring", description: "Regular check-ups and performance monitoring" },
      { step: "Reporting & Updates", description: "Detailed reports and recommendations for future maintenance" }
    ],
    pricing: "From AED 200 per service call",
    duration: "Same day to 1 week",
    teamSize: "2-6 technicians",
    testimonials: [
      {
        text: "Quick response times and professional service. They've maintained our facilities perfectly for over 2 years.",
        author: "Robert Kim",
        company: "Metro Office Complex",
        rating: 5
      },
      {
        text: "Reliable maintenance team with excellent technical skills. Always available when we need them.",
        author: "Fatima Al-Zahra",
        company: "Luxury Residences Dubai",
        rating: 5
      },
      {
        text: "Cost-effective maintenance solutions with transparent pricing. Very satisfied with their service quality.",
        author: "Michael Johnson",
        company: "Commercial Properties LLC",
        rating: 5
      }
    ]
  },
  {
    title: "IT and Security Solutions",
    description: "Empowering Businesses with Technology and Safety",
    features: [
      "IT infrastructure setup and networking",
      "Installation of advanced CCTV and surveillance systems",
      "Software development and management solutions",
      "Cybersecurity services for data protection"
    ],
    icon: <Shield className="w-8 h-8" />,
    color: "from-blue-500 to-blue-900",
    detailedDescription: "Secure and optimize your business operations with our cutting-edge IT and security solutions. We provide comprehensive technology services, from network infrastructure to cybersecurity, ensuring your business stays connected, protected, and competitive in the digital age.",
    benefits: [
      "State-of-the-art security systems and monitoring",
      "Robust IT infrastructure with scalable solutions",
      "Expert cybersecurity protection and compliance",
      "Custom software development for business needs",
      "24/7 technical support and system monitoring",
      "Regular updates and maintenance for optimal performance"
    ],
    process: [
      { step: "Technology Assessment", description: "Evaluation of current systems and security requirements" },
      { step: "Solution Design", description: "Custom IT and security architecture planning" },
      { step: "Implementation", description: "Professional installation and configuration of systems" },
      { step: "Testing & Training", description: "System testing and user training for optimal utilization" },
      { step: "Ongoing Support", description: "Continuous monitoring, updates, and technical support" }
    ],
    pricing: "Projects from AED 10,000",
    duration: "2-8 weeks",
    teamSize: "4-8 IT specialists",
    testimonials: [
      {
        text: "Their IT solutions transformed our business operations. Security is top-notch and system performance is excellent.",
        author: "David Wilson",
        company: "Future Finance Group",
        rating: 5
      },
      {
        text: "Professional cybersecurity implementation that gave us peace of mind. Excellent technical support.",
        author: "Aisha Al-Mahmoud",
        company: "Digital Innovation Center",
        rating: 5
      },
      {
        text: "Comprehensive IT infrastructure setup with seamless integration. Highly skilled technical team.",
        author: "Carlos Rodriguez",
        company: "Smart Business Solutions",
        rating: 5
      }
    ]
  },
  {
    title: "Pest Control Services",
    description: "Ensuring Clean and Safe Spaces",
    features: [
      "Safe and eco-friendly pest removal",
      "Regular pest monitoring and prevention plans",
      "Specialized treatments for termites, rodents, and insects"
    ],
    icon: <Bug className="w-8 h-8" />,
    color: "from-blue-900 to-blue-500",
    detailedDescription: "Protect your property and health with our professional pest control services. Using eco-friendly methods and advanced techniques, we eliminate existing pest problems and implement preventive measures to ensure your space remains clean, safe, and comfortable year-round.",
    benefits: [
      "Environmentally safe and family-friendly treatments",
      "Comprehensive pest identification and elimination",
      "Preventive programs to avoid future infestations",
      "Licensed professionals with specialized training",
      "Regular monitoring and maintenance visits",
      "Guaranteed results with service warranties"
    ],
    process: [
      { step: "Property Inspection", description: "Thorough assessment to identify pest issues and entry points" },
      { step: "Treatment Planning", description: "Customized treatment plan based on pest type and severity" },
      { step: "Pest Elimination", description: "Safe and effective treatment application by certified technicians" },
      { step: "Prevention Setup", description: "Installation of preventive measures and monitoring systems" },
      { step: "Follow-up Services", description: "Regular inspections and maintenance to ensure lasting results" }
    ],
    pricing: "From AED 300 per treatment",
    duration: "1-3 days per treatment",
    teamSize: "2-3 certified technicians",
    testimonials: [
      {
        text: "Completely eliminated our termite problem and their prevention program keeps our property pest-free.",
        author: "Fatima Al-Zahra",
        company: "Green Valley Residences",
        rating: 5
      },
      {
        text: "Eco-friendly approach with excellent results. Professional service from start to finish.",
        author: "Ahmed Hassan",
        company: "Family Resort Dubai",
        rating: 5
      },
      {
        text: "Reliable pest control with ongoing prevention. Great value for money and peace of mind.",
        author: "Sandra Williams",
        company: "Residential Complex Management",
        rating: 5
      }
    ]
  },
  {
    title: "Interior Design",
    description: "Creating Inspiring Spaces That Reflect Your Vision",
    features: [
      "Bespoke designs for homes and offices",
      "Luxurious and elegant decor concepts",
      "Eco-friendly and smart design solutions",
      "Furniture layout and space optimization"
    ],
    icon: <Palette className="w-8 h-8" />,
    color: "from-blue-500 to-blue-900",
    detailedDescription: "Transform your space into a masterpiece with our innovative interior design services. Our creative team combines aesthetic excellence with functional design to create environments that inspire, comfort, and reflect your unique style while maximizing space utilization and value.",
    benefits: [
      "Personalized design concepts tailored to your lifestyle",
      "Premium materials and furnishings from trusted suppliers",
      "3D visualization and virtual reality previews",
      "Sustainable and eco-friendly design options",
      "Project management from concept to completion",
      "Post-completion support and warranty services"
    ],
    process: [
      { step: "Design Consultation", description: "Understanding your vision, preferences, and space requirements" },
      { step: "Concept Development", description: "Creating design concepts with 3D visualizations and mood boards" },
      { step: "Design Refinement", description: "Refining designs based on feedback and finalizing details" },
      { step: "Implementation", description: "Professional execution with quality control and progress updates" },
      { step: "Final Styling", description: "Final touches, styling, and handover of your transformed space" }
    ],
    pricing: "From AED 80 per sq ft",
    duration: "4-12 weeks",
    teamSize: "3-6 designers",
    testimonials: [
      {
        text: "Absolutely stunning results! They transformed our office into a space that truly reflects our brand and culture.",
        author: "Maria Rodriguez",
        company: "Creative Agency Dubai",
        rating: 5
      },
      {
        text: "Innovative design concepts with flawless execution. Our home renovation exceeded all expectations.",
        author: "Khalid Al-Mansouri",
        company: "Private Residence",
        rating: 5
      },
      {
        text: "Professional interior designers with amazing attention to detail. Beautiful and functional spaces created.",
        author: "Emma Thompson",
        company: "Luxury Hotel Group",
        rating: 5
      }
    ]
  }
];

const additionalServices = [
  {
    title: "Event Management",
    description: "Professional event setup and coordination support",
    icon: <Calendar className="w-6 h-6" />
  },
  {
    title: "Cleaning Services",
    description: "Comprehensive cleaning for homes and offices",
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    title: "Landscaping Solutions",
    description: "Beautiful gardening and landscape design",
    icon: <TreePine className="w-6 h-6" />
  }
];

// Enhanced custom hook for intersection observer
const useInView = (threshold = 0.1, rootMargin = '0px') => {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, hasAnimated]);

  return [ref, isInView] as const;
};

// Detailed Service Page Component
const DetailedServicePage: React.FC<{ service: Service; onBack: () => void }> = ({ service, onBack }) => {
  const [heroRef, heroInView] = useInView(0.1, '100px');
  const [detailsRef, detailsInView] = useInView(0.1, '50px');
  const [testimonialsRef, testimonialsInView] = useInView(0.1, '50px');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div ref={heroRef} className={`relative overflow-hidden bg-gradient-to-br ${service.color} py-20 px-4`}>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`floating-shape absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full blur-sm transition-all duration-1000 ${heroInView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}></div>
          <div className={`floating-shape absolute top-40 right-20 w-32 h-32 bg-white/15 rounded-full blur-sm transition-all duration-1000 ${heroInView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`} style={{ transitionDelay: '200ms' }}></div>
        </div>

        {/* Back Button */}
        <div className="max-w-7xl mx-auto mb-8">
          <button
            onClick={onBack}
            className={`bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300 flex items-center space-x-2 group transform ${heroInView ? 'translate-x-0 opacity-100' : 'translate-x-(-20) opacity-0'
              }`}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Services</span>
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className={`text-5xl font-bold mb-4 transform transition-all duration-1000 ${heroInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`} style={{ transitionDelay: '200ms' }}>
                Keynes {service.title}
              </h1>
              <p className={`text-2xl text-white/90 mb-8 transform transition-all duration-1000 ${heroInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`} style={{ transitionDelay: '400ms' }}>
                {service.description}
              </p>

              {/* Key Stats */}
              <div className={`grid grid-cols-3 gap-6 transform transition-all duration-1000 ${heroInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`} style={{ transitionDelay: '600ms' }}>
                <div className="text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                  <div className="text-lg font-bold">{service.duration}</div>
                  <div className="text-sm text-white/80">Duration</div>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                  <div className="text-lg font-bold">{service.teamSize}</div>
                  <div className="text-sm text-white/80">Team Size</div>
                </div>
              </div>
            </div>

            {/* Service Features */}
            <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 transform transition-all duration-1000 ${heroInView ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
              }`} style={{ transitionDelay: '800ms' }}>
              <h3 className="text-2xl font-bold text-white mb-6">Key Features</h3>
              <ul className="space-y-4">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-300 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Description and Benefits */}
      <div ref={detailsRef} className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Description */}
          <div className={`transform transition-all duration-1000 ${detailsInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">About This Service</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {service.detailedDescription}
            </p>

            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Zap className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-900">Why Choose Us?</h3>
              </div>
              <p className="text-gray-700">
                With years of experience and a commitment to excellence, we deliver results that exceed expectations while maintaining the highest standards of professionalism and quality.
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className={`transform transition-all duration-1000 ${detailsInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '200ms' }}>
            <div className="flex items-center mb-6">
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Benefits</h2>
            </div>
            <ul className="space-y-4">
              {service.benefits.map((benefit, index) => (
                <li key={index} className={`flex items-start space-x-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 transform ${detailsInView ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                  }`} style={{ transitionDelay: `${300 + index * 100}ms` }}>
                  <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>


      {/* Testimonials Section */}
      <div ref={testimonialsRef} className="max-w-7xl mx-auto px-6 py-16">
        <div className={`text-center mb-12 transform transition-all duration-1000 ${testimonialsInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600">Real feedback from satisfied customers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {service.testimonials.map((testimonial, index) => (
            <div key={index} className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform ${testimonialsInView ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
              }`} style={{ transitionDelay: `${index * 200}ms` }}>
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 italic mb-6 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className={`bg-gradient-to-r ${service.color} text-white py-16`}>
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 leading-relaxed">
            Contact us today to discuss your project and discover how we can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ContactButton phone="+919074435902"/>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Animated Service Card Component
const AnimatedServiceCard: React.FC<{ service: Service; index: number; onClick: () => void }> = ({ service, index, onClick }) => {
  const [ref, isInView] = useInView(0.1, '50px');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-1000 transform overflow-hidden border border-gray-100 cursor-pointer ${isInView
        ? 'translate-y-0 opacity-100 scale-100'
        : 'translate-y-20 opacity-0 scale-95'
        }`}
      style={{
        transitionDelay: `${index * 150}ms`,
        transform: isHovered
          ? 'translateY(-8px) scale(1.02)'
          : isInView
            ? 'translateY(0) scale(1)'
            : 'translateY(80px) scale(0.95)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
        <div className={`w-full h-full bg-gradient-to-br ${service.color}`} />
      </div>

      {/* Service Header */}
      <div className={`bg-gradient-to-r ${service.color} p-6 relative overflow-hidden`}>
        {/* Enhanced floating particles effect */}
        <div className="absolute inset-0">
          <div className={`absolute top-2 right-2 w-2 h-2 bg-white bg-opacity-30 rounded-full transition-all duration-1000 ${isInView ? 'animate-pulse opacity-100' : 'opacity-0'
            }`} style={{ animationDelay: '0s', animationDuration: '2s' }} />
          <div className={`absolute top-8 right-8 w-1 h-1 bg-white bg-opacity-40 rounded-full transition-all duration-1000 ${isInView ? 'animate-pulse opacity-100' : 'opacity-0'
            }`} style={{ animationDelay: '0.5s', animationDuration: '2.5s' }} />
          <div className={`absolute bottom-4 right-6 w-1.5 h-1.5 bg-white bg-opacity-25 rounded-full transition-all duration-1000 ${isInView ? 'animate-pulse opacity-100' : 'opacity-0'
            }`} style={{ animationDelay: '1s', animationDuration: '3s' }} />
        </div>

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <div className={`bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-3 text-white transform transition-all duration-700 ${isHovered ? 'rotate-12 scale-110' : isInView ? 'rotate-0 scale-100' : 'rotate-(-12) scale-75'
              }`}>
              {service.icon}
            </div>
            <div>
              <h3 className={`text-2xl font-bold text-white mb-1 transform transition-all duration-500 ${isInView ? 'translate-x-0 opacity-100' : 'translate-x-(-20) opacity-0'
                }`} style={{ transitionDelay: `${index * 150 + 200}ms` }}>
                Keynes {service.title}
              </h3>
              <p className={`text-white text-opacity-90 font-medium transform transition-all duration-500 ${isInView ? 'translate-x-0 opacity-100' : 'translate-x-(-20) opacity-0'
                }`} style={{ transitionDelay: `${index * 150 + 300}ms` }}>
                {service.description}
              </p>
            </div>
          </div>

          {/* Click indicator */}
          <div className={`text-white transition-all duration-300 ${isHovered ? 'scale-110 translate-x-2' : 'scale-100'
            }`}>
            <ChevronRight className="w-6 h-6" />
          </div>
        </div>

        {/* Enhanced animated wave at bottom */}
        <div className={`absolute bottom-0 left-0 w-full overflow-hidden transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'
          }`}>
          <svg
            className="relative block w-full h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
          >
            <defs>
              <path
                id={`gentle-wave-${index}`}
                d="m-160,44c30,0,58-18,88-18s58,18,88,18,58-18,88-18,58,18,88,18v44h-352z"
              />
            </defs>
            <g className="opacity-40">
              <use xlinkHref={`#gentle-wave-${index}`} x="50" y="0" fill="rgba(255,255,255,0.2)">
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="translate"
                  values="-90 0; 85 0; -90 0"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </use>
            </g>
          </svg>
        </div>
      </div>

      {/* Service Features with enhanced animations */}
      <div className="p-6 relative">
        <ul className="space-y-3 mb-4">
          {service.features.slice(0, 3).map((feature, featureIndex) => (
            <li
              key={featureIndex}
              className={`flex items-start space-x-3 transform transition-all duration-600 ${isInView
                ? 'translate-x-0 opacity-100'
                : 'translate-x-8 opacity-0'
                }`}
              style={{
                transitionDelay: `${(index * 200) + (featureIndex * 150) + 400}ms`
              }}
            >
              <CheckCircle className={`w-5 h-5 text-green-500 mt-0.5 flex-shrink-0 transform transition-all duration-500 ${isHovered ? 'scale-110 rotate-12' : isInView ? 'scale-100 rotate-0' : 'scale-0'
                }`} />
              <span className="text-gray-700 leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Enhanced glow effect on hover */}
        <div className={`absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500 ${isHovered ? 'opacity-10 scale-105' : 'opacity-0 scale-100'
          }`}>
          <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${service.color} blur-xl`} />
        </div>
      </div>
    </div>
  );
};

// Enhanced Animated Additional Service Card
const AnimatedAdditionalCard: React.FC<{ service: any; index: number }> = ({ service, index }) => {
  const [ref, isInView] = useInView(0.1, '30px');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-700 transform text-center border border-gray-100 relative overflow-hidden ${isInView
        ? 'translate-y-0 opacity-100 scale-100'
        : 'translate-y-16 opacity-0 scale-95'
        }`}
      style={{
        transitionDelay: `${index * 200}ms`,
        transform: isHovered
          ? 'translateY(-12px) scale(1.05)'
          : isInView
            ? 'translateY(0) scale(1)'
            : 'translateY(64px) scale(0.95)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced background pattern */}
      <div className={`absolute inset-0 transition-all duration-500 ${isHovered ? 'opacity-5 scale-110' : 'opacity-0 scale-100'
        }`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600"
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
      </div>

      <div className={`bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full p-5 w-16 h-16 mx-auto mb-6 text-white relative transform transition-all duration-700 ${isHovered
        ? 'scale-125 rotate-12'
        : isInView
          ? 'scale-100 rotate-0'
          : 'scale-75 rotate-(-12)'
        }`} style={{ transitionDelay: `${index * 200 + 100}ms` }}>
        {/* Enhanced ripple effect */}
        <div className={`absolute inset-0 rounded-full bg-blue-500 transition-all duration-700 ${isHovered ? 'scale-150 opacity-0' : isInView ? 'scale-100 opacity-30' : 'scale-50 opacity-0'
          }`} />
        <div className="relative z-10">
          {service.icon}
        </div>
      </div>

      <h3 className={`text-xl font-bold text-gray-900 mb-3 transform transition-all duration-600 ${isHovered ? 'scale-105' : isInView ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`} style={{ transitionDelay: `${index * 200 + 200}ms` }}>
        {service.title}
      </h3>
      <p className={`text-gray-600 leading-relaxed transform transition-all duration-600 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`} style={{ transitionDelay: `${index * 200 + 300}ms` }}>
        {service.description}
      </p>
    </div>
  );
};

const ServicesPage: React.FC = () => {
  const [heroRef, heroInView] = useInView(0.1, '100px');
  const [additionalRef, additionalInView] = useInView(0.1, '50px');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  if (selectedService) {
    return (
      <DetailedServicePage
        service={selectedService}
        onBack={() => setSelectedService(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(1deg); }
            66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        @keyframes pulse-slow {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        @keyframes shimmer {
            0% { transform: translateX(-100%) skewX(-12deg); }
            100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes slideInUp {
            from { transform: translateY(100px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeInScale {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        .floating-shape {
            animation: float 6s ease-in-out infinite;
        }
        
        .floating-shape:nth-child(2) {
            animation-delay: -2s;
        }
        
        .floating-shape:nth-child(3) {
            animation-delay: -4s;
        }
        
        .pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .gradient-animate {
            background: linear-gradient(-45deg, #111827, #1e3a8a, #312e81, #0c4a6e, #1f2937, #1e40af);
            background-size: 400% 400%;
            animation: gradient-shift 8s ease infinite;
        }
        
        .text-glow {
            text-shadow: 0 0 20px rgba(129, 140, 248, 0.6);
        }
        
        .backdrop-blur-glass {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.1);
        }
        
        .animate-shimmer {
            animation: shimmer 1s ease-in-out infinite;
        }
        
        .animate-slide-up {
            animation: slideInUp 1s ease-out;
        }
        
        .animate-fade-scale {
            animation: fadeInScale 0.8s ease-out;
        }
    `}} />

      {/* Hero Section with enhanced animations */}
      <div ref={heroRef} className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 py-20 px-4">
        {/* Enhanced floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`floating-shape absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full blur-sm transition-all duration-1000 ${heroInView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}></div>
          <div className={`floating-shape absolute top-40 right-20 w-32 h-32 bg-white/15 rounded-full blur-sm transition-all duration-1000 ${heroInView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`} style={{ transitionDelay: '200ms' }}></div>
          <div className={`floating-shape absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-sm transition-all duration-1000 ${heroInView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`} style={{ transitionDelay: '400ms' }}></div>
          <div className={`floating-shape absolute top-32 left-1/2 w-16 h-16 bg-white/25 rounded-full blur-sm transition-all duration-1000 ${heroInView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`} style={{ transitionDelay: '600ms' }}></div>
          <div className={`floating-shape absolute bottom-32 right-1/3 w-28 h-28 bg-white/20 rounded-full blur-sm transition-all duration-1000 ${heroInView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`} style={{ transitionDelay: '800ms' }}></div>
        </div>

        {/* Enhanced animated Grid Pattern */}
        <div className={`absolute inset-0 transition-opacity duration-1500 ${heroInView ? 'opacity-10' : 'opacity-0'}`}>
          <div className="pulse-slow absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
        </div>

        {/* Enhanced Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className={`backdrop-blur-glass rounded-3xl p-8 shadow-2xl border border-white/30 transform transition-all duration-1200 ${heroInView ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
            }`}>
            <h1 className={`text-5xl md:text-6xl font-bold text-white mb-6 text-glow bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent transform transition-all duration-1000 ${heroInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`} style={{ transitionDelay: '200ms' }}>
              Our Services
            </h1>
            <p className={`text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed transform transition-all duration-1000 ${heroInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`} style={{ transitionDelay: '400ms' }}>
              At Keynes Group, we deliver a wide range of professional solutions designed to meet
              the evolving needs of businesses and individuals across the UAE.
            </p>

            {/* Enhanced decorative Elements */}
            <div className={`flex justify-center items-center space-x-4 mt-8 transform transition-all duration-1000 ${heroInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`} style={{ transitionDelay: '600ms' }}>
              <div className="w-2 h-2 bg-white rounded-full pulse-slow"></div>
              <div className="w-3 h-3 bg-white rounded-full pulse-slow" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-2 h-2 bg-white rounded-full pulse-slow" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className={`mt-6 transform transition-all duration-1000 ${heroInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`} style={{ transitionDelay: '800ms' }}>
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-full px-8 py-3 border border-white border-opacity-20 relative overflow-hidden inline-block group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 transition-all duration-700 translate-x-full group-hover:translate-x-full animate-shimmer" />
                <span className="text-blue-200 font-medium relative z-10">Quality • Innovation • Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced bottom Wave Effect */}
        <div className={`absolute bottom-0 left-0 w-full transition-all duration-1000 ${heroInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
          <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,120 L0,80 Q300,0 600,80 T1200,80 L1200,120 Z"
              fill="rgb(249, 250, 251)"
              opacity="0.8" />
          </svg>
        </div>
      </div>

      {/* Main Services Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <AnimatedServiceCard
              key={index}
              service={service}
              index={index}
              onClick={() => setSelectedService(service)}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Additional Services Section */}
      <div className="bg-gradient-to-br from-gray-100 to-blue-50 relative overflow-hidden">
        {/* Enhanced background decoration */}
        <div className={`absolute inset-0 transition-opacity duration-1500 ${additionalInView ? 'opacity-30' : 'opacity-0'
          }`}>
          <div className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
        </div>

        <div ref={additionalRef} className="max-w-7xl mx-auto px-6 py-16 relative">
          <div className={`text-center mb-12 transform transition-all duration-1000 ${additionalInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive Solutions Under One Roof
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <AnimatedAdditionalCard
                key={index}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 relative overflow-hidden">
        {/* Enhanced animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 opacity-50 animate-pulse"
            style={{ animationDuration: '8s' }} />
        </div>

        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <h2 className="text-4xl font-bold mb-6 animate-fade-scale">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed animate-slide-up">
            Let us help you achieve your goals with our comprehensive range of professional services.
            Contact us today to discuss how we can support your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ContactButton phone='+919074435902' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;