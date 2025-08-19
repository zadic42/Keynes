import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Target, Zap, ArrowRight } from 'lucide-react';

// Type definitions
interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
  iconColor: string;
  hoverBg: string;
}

interface Stat {
  number: string;
  label: string;
  actualValue: number;
  suffix: string;
}

interface HeaderSectionProps {
  isVisible: boolean;
}

interface MainContentProps {
  isVisible: boolean;
  features: Feature[];
  animatedFeatures: boolean[];
  videoVisible: boolean;
  videoRef: React.RefObject<HTMLDivElement>;
  featureRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

interface FeaturesGridProps {
  features: Feature[];
  animatedFeatures: boolean[];
  featureRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
  isAnimated: boolean;
}

interface StatsSectionProps {
  isVisible: boolean;
  stats: Stat[];
}

interface AnimatedCounterProps {
  targetValue: number;
  suffix: string;
  duration: number;
  isVisible: boolean;
}

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);
        
        // Once it's been visible, keep track of that
        if (isIntersecting && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '-50px 0px',
        ...options
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [hasBeenVisible]);

  return { elementRef, isVisible, hasBeenVisible };
};

// Animated Counter Component
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  targetValue,
  suffix,
  duration,
  isVisible
}) => {
  const [currentValue, setCurrentValue] = useState<number>(0);
  const animationRef = useRef<number>();
  const hasStarted = useRef(false);

  useEffect(() => {
    // Reset if not visible
    if (!isVisible) {
      setCurrentValue(0);
      hasStarted.current = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    // Don't restart if already started
    if (hasStarted.current) return;
    hasStarted.current = true;

    const startTime = Date.now();
    const startValue = 0;

    const updateValue = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const newValue = Math.round(startValue + (targetValue - startValue) * easeOut);

      setCurrentValue(newValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(updateValue);
      }
    };

    // Start animation with a slight delay
    setTimeout(() => {
      animationRef.current = requestAnimationFrame(updateValue);
    }, 200);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, duration, isVisible]);

  return (
    <span>
      {currentValue}{suffix}
    </span>
  );
};

const About: React.FC = () => {
  // Main section visibility
  const { 
    elementRef: sectionRef, 
    isVisible: mainVisible, 
    hasBeenVisible: mainHasBeenVisible 
  } = useIntersectionObserver({ threshold: 0.1, rootMargin: '-20px 0px' });

  // Stats section visibility
  const { 
    elementRef: statsRef, 
    isVisible: statsVisible,
    hasBeenVisible: statsHasBeenVisible 
  } = useIntersectionObserver({ threshold: 0.3, rootMargin: '-30px 0px' });

  // Video section visibility
  const { 
    elementRef: videoRef, 
    isVisible: videoVisible 
  } = useIntersectionObserver({ threshold: 0.4 });

  // Features visibility - individual tracking
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [featureVisibility, setFeatureVisibility] = useState<boolean[]>([false, false, false, false]);

  // Feature data
  const features: Feature[] = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering exceptional quality in every project we undertake.',
      gradient: 'from-amber-100 to-yellow-100',
      iconColor: 'text-amber-600',
      hoverBg: 'group-hover:bg-amber-600'
    },
    {
      icon: Users,
      title: 'Expertise',
      description: 'Our team of professionals brings decades of combined industry experience.',
      gradient: 'from-green-100 to-emerald-100',
      iconColor: 'text-green-600',
      hoverBg: 'group-hover:bg-green-600'
    },
    {
      icon: Target,
      title: 'Results',
      description: 'Focused on achieving measurable outcomes that drive your business forward.',
      gradient: 'from-purple-100 to-violet-100',
      iconColor: 'text-purple-600',
      hoverBg: 'group-hover:bg-purple-600'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Leveraging cutting-edge solutions to keep you ahead of the competition.',
      gradient: 'from-blue-100 to-indigo-100',
      iconColor: 'text-blue-600',
      hoverBg: 'group-hover:bg-blue-600'
    }
  ];

  // Stats data
  const stats: Stat[] = [
    { number: '15+', label: 'Years of Excellence', actualValue: 15, suffix: '+' },
    { number: '5012+', label: 'Projects Completed', actualValue: 5012, suffix: '+' },
    { number: '200+', label: 'Happy Clients', actualValue: 200, suffix: '+' },
    { number: '100%', label: 'Success Rate', actualValue: 100, suffix: '%' }
  ];

  // Individual feature card observers
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    featureRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setFeatureVisibility(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            } else {
              // Reset animation when out of view
              setFeatureVisibility(prev => {
                const newState = [...prev];
                newState[index] = false;
                return newState;
              });
            }
          },
          { 
            threshold: 0.3,
            rootMargin: '-50px 0px'
          }
        );
        
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden relative"
    >
      {/* Background Decorative Elements */}
      <BackgroundDecorations isVisible={mainVisible} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <HeaderSection isVisible={mainVisible} />

        {/* Main Content */}
        <MainContent
          isVisible={mainVisible}
          videoVisible={videoVisible}
          videoRef={videoRef}
          features={features}
          animatedFeatures={featureVisibility}
          featureRefs={featureRefs}
        />

        {/* Stats Section */}
        <div ref={statsRef}>
          <StatsSection 
            isVisible={mainHasBeenVisible} 
            stats={stats} 
            statsVisible={statsVisible}
          />
        </div>
      </div>
    </section>
  );
};

// Enhanced background decorations with visibility control
const BackgroundDecorations: React.FC<{ isVisible: boolean }> = ({ isVisible }) => (
  <div className="absolute inset-0 overflow-hidden">
    <div 
      className={`absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 transition-all duration-1000 ${
        isVisible ? 'animate-pulse scale-100' : 'scale-50 opacity-5'
      }`}
      style={{ animationDuration: '6s' }} 
    />
    <div 
      className={`absolute -bottom-32 -left-32 w-64 h-64 bg-indigo-200 rounded-full opacity-15 transition-all duration-1000 delay-500 ${
        isVisible ? 'animate-pulse scale-100' : 'scale-50 opacity-5'
      }`}
      style={{ animationDuration: '8s', animationDelay: '2s' }} 
    />
  </div>
);

// Header section component
const HeaderSection: React.FC<HeaderSectionProps> = ({ isVisible }) => (
  <div className={`text-center mb-16 transform transition-all duration-1000 ${
    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
  }`}>
    {/* Badge */}
    <div className={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-sm font-semibold mb-6 transform transition-all duration-700 delay-300 ${
      isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
    }`}>
      <div className={`w-2 h-2 bg-blue-600 rounded-full mr-3 transition-all duration-500 ${
        isVisible ? 'animate-pulse' : ''
      }`} />
      About Keynes Group
    </div>

    {/* Title */}
    <h2 className={`text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight transform transition-all duration-800 delay-500 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
    }`}>
      Building the Future of
      <br />
      <span className="relative inline-block mt-2">
        <span className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Business Solutions
        </span>
        <div className={`absolute inset-0 bg-gradient-to-r from-blue-200 to-indigo-200 transform -skew-x-12 opacity-30 scale-110 transition-all duration-1000 ${
          isVisible ? 'animate-pulse' : 'opacity-0'
        }`} />
      </span>
    </h2>

    {/* Subtitle */}
    <p className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transform transition-all duration-800 delay-700 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    }`}>
      For over 15 years, Keynes Group has been at the forefront of business transformation in the UAE,
      combining deep industry knowledge with innovative approaches.
    </p>
  </div>
);

// Enhanced main content section
const MainContent: React.FC<MainContentProps> = ({ 
  isVisible, 
  videoVisible, 
  videoRef, 
  features, 
  animatedFeatures,
  featureRefs 
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
    {/* Left Column - Company Description & Video */}
    <div className={`transform transition-all duration-1000 delay-300 ${
      isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
    }`}>
      {/* Video Placeholder */}
      <div 
        ref={videoRef}
        className={`relative mb-8 rounded-2xl overflow-hidden shadow-2xl group transition-all duration-1000 ${
          videoVisible ? 'scale-100 opacity-100 rotate-0' : 'scale-95 opacity-70 rotate-1'
        }`}
      >
        {/* Video Embed */}
        <div className="aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/vG19Ueo7FPI?rel=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Company Description */}
      <CompanyDescription isVisible={isVisible} />
    </div>

    {/* Right Column - Features Grid */}
    <FeaturesGrid 
      features={features} 
      animatedFeatures={animatedFeatures}
      featureRefs={featureRefs}
    />
  </div>
);

// Enhanced company description component
const CompanyDescription: React.FC<{ isVisible: boolean }> = ({ isVisible }) => (
  <div className={`space-y-6 transform transition-all duration-800 delay-800 ${
    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
  }`}>
    <p className="text-lg text-gray-700 leading-relaxed">
      Our comprehensive suite of services spans consulting, technology implementation,
      and strategic advisory, ensuring our clients have everything they need to succeed
      in today's dynamic business environment.
    </p>

    <p className="text-lg text-gray-700 leading-relaxed">
      We don't just provide services—we forge partnerships. Our client-centric approach,
      combined with our deep understanding of the UAE market, makes us the ideal choice
      for businesses looking to achieve their full potential.
    </p>

    {/* CTA Buttons */}
    <div
      className={`flex flex-col sm:flex-row gap-4 pt-4 transform transition-all duration-700 delay-1000 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      {/* About Link */}
      <Link
        to="/about"
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative overflow-hidden group"
        data-isroute="true"
      >
        <span className="relative z-10 flex items-center justify-center">
          Learn More About Us
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </span>
      </Link>

      {/* Services Link */}
      <Link
        to="/services"
        className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
        data-isroute="true"
      >
        Our Services
      </Link>
    </div>
  </div>
);

// Enhanced features grid component
const FeaturesGrid: React.FC<FeaturesGridProps> = ({ features, animatedFeatures, featureRefs }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {features.map((feature, index) => (
      <FeatureCard
        key={index}
        feature={feature}
        index={index}
        isAnimated={animatedFeatures[index]}
        ref={(el) => (featureRefs.current[index] = el)}
      />
    ))}
  </div>
);

// Enhanced individual feature card component with ref forwarding
const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ feature, index, isAnimated }, ref) => (
    <div
      ref={ref}
      className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 group relative overflow-hidden border border-gray-100 ${
        isAnimated 
          ? 'translate-y-0 opacity-100 rotate-0 scale-100' 
          : 'translate-y-8 opacity-0 rotate-2 scale-95'
      }`}
    >
      {/* Background gradient on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative z-10">
        {/* Icon */}
        <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12 ${
          feature.hoverBg
        } ${isAnimated ? 'animate-pulse' : ''}`}>
          <feature.icon className={`h-8 w-8 ${feature.iconColor} group-hover:text-white transition-colors duration-500`} />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {feature.description}
        </p>
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </div>
  )
);

// Enhanced stats section component
const StatsSection: React.FC<StatsSectionProps & { statsVisible: boolean }> = ({
  isVisible,
  stats,
  statsVisible
}) => (
  <div className={`bg-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden transform transition-all duration-1000 delay-300 border border-gray-100 ${
    isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
  }`}>
    {/* Background decorations */}
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-50 transform transition-all duration-1000 ${
      statsVisible ? 'translate-x-16 -translate-y-16 scale-100' : 'translate-x-20 -translate-y-20 scale-75'
    }`} />
    <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-30 transform transition-all duration-1000 delay-200 ${
      statsVisible ? '-translate-x-8 translate-y-8 scale-100' : '-translate-x-12 translate-y-12 scale-75'
    }`} />

    {/* Stats grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`group transform transition-all duration-700 ${
            statsVisible 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-4 opacity-0 scale-90'
          }`}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
            <AnimatedCounter
              targetValue={stat.actualValue}
              suffix={stat.suffix}
              duration={2000 + (index * 200)}
              isVisible={statsVisible}
            />
          </div>
          <div className="text-sm text-gray-600 font-medium uppercase tracking-wide">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default About;