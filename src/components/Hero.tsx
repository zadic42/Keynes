import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const slides = [
        {
            badge: "Leading Business Solutions in UAE",
            title: "Transforming",
            highlight: "Business Excellence",
            subtitle: "in the UAE",
            description: "Partner with Keynes Group for innovative solutions that drive growth, enhance efficiency, and deliver exceptional results for your business.",
            backgroundImage: "/Banner-1.jpg",
            highlightGradient: "from-cyan-400 to-blue-500",
            stats: [
                { value: "500+", label: "Projects" },
                { value: "15+", label: "Years" },
                { value: "98%", label: "Satisfaction" },
                { value: "50+", label: "Experts" },
                { value: "24/7", label: "Support" }
            ]
        },
        {
            badge: "Innovation & Technology Leader",
            title: "Empowering",
            highlight: "Digital Transformation",
            subtitle: "Across Industries",
            description: "Leverage cutting-edge technology and strategic consulting to revolutionize your business operations and stay ahead of the competition.",
            backgroundImage: "/Banner-2.jpg",
            highlightGradient: "from-cyan-400 to-blue-500",
            stats: [
                { value: "200+", label: "Solutions" },
                { value: "10+", label: "Industries" },
                { value: "99%", label: "Uptime" },
                { value: "30+", label: "Partners" },
                { value: "5★", label: "Rating" }
            ]
        },
        {
            badge: "Strategic Growth Partner",
            title: "Accelerating",
            highlight: "Business Success",
            subtitle: "Through Excellence",
            description: "From startups to enterprises, we provide comprehensive solutions that scale with your ambitions and deliver measurable results.",
            backgroundImage: "/Banner-3.jpg",
            highlightGradient: "from-cyan-400 to-blue-500",
            stats: [
                { value: "300%", label: "ROI" },
                { value: "85%", label: "Retention" },
                { value: "120+", label: "Stories" },
                { value: "25+", label: "Awards" },
                { value: "100+", label: "Team" }
            ]
        }
    ];

    // Auto-advance slides
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const goToSlide = (index : any) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const currentSlideData = slides[currentSlide];

    return (
        <section id="home" className="relative font-poppins h-screen flex items-center justify-center overflow-hidden">
            {/* Background with image and zoom effect */}
            <div className="absolute inset-0">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 bg-cover bg-center bg-no-repeat zoom-in-out transition-opacity duration-1000 ease-in-out`}
                        style={{
                            backgroundImage: `url(${slide.backgroundImage})`,
                            opacity: index === currentSlide ? 1 : 0,
                        }}
                    />
                ))}
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <button
                onClick={nextSlide}
                className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Next slide"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* Main Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div
                    key={currentSlide}
                    className="max-w-4xl mx-auto transition-opacity duration-1000 ease-in-out"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center px-3 py-1.5 bg-blue-500/20 text-blue-200 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                        {currentSlideData.badge}
                    </div>

                    {/* Main headline */}
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                        {currentSlideData.title}
                        <span className={`block text-transparent bg-clip-text bg-gradient-to-r ${currentSlideData.highlightGradient}`}>
                            {currentSlideData.highlight}
                        </span>
                        <span className="block text-2xl md:text-3xl lg:text-4xl">{currentSlideData.subtitle}</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-blue-100 mb-6 max-w-3xl mx-auto leading-relaxed">
                        {currentSlideData.description}
                    </p>

                    {/* CTA Button */}
                    <div className="mb-8">
                        <a
                            href="#services"
                            className="group inline-flex items-center border-2 border-white/30 hover:border-white text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
                        >
                            Get Started Today
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-5 gap-4 md:gap-8 pt-6 border-t border-white/20">
                        {currentSlideData.stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-xs md:text-sm text-blue-200">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-9 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentSlide
                                ? 'bg-blue-500 scale-125'
                                : 'bg-white/40 hover:bg-white/60'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
                <div
                    className="h-full bg-blue-500 transition-all duration-300 ease-linear"
                    style={{
                        width: `${((currentSlide + 1) / slides.length) * 100}%`
                    }}
                />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes zoomInOut {
                        0% {
                            transform: scale(1);
                        }
                        50% {
                            transform: scale(1.1);
                        }
                        100% {
                            transform: scale(1);
                        }
                    }

                    .zoom-in-out {
                        animation: zoomInOut 10s ease-in-out infinite;
                    }
                `
            }} />
        </section>
    );
};

export default Hero;