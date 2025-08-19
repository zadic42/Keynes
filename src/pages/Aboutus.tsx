import React, { useState, useEffect, useRef } from 'react';
import { Users, Award, Zap, Target, Shield, TrendingUp, Globe, Lightbulb, Heart, ArrowRight } from 'lucide-react';

interface StatCardProps {
    number: string;
    label: string;
    delay: number;
}

interface ValueCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay: number;
}

interface TeamMemberProps {
    name: string;
    position: string;
    photo: string;
    delay: number;
}

interface CompanyCardProps {
    name: string;
    icon: React.ReactNode;
    delay: number;
}


const StatCard: React.FC<StatCardProps> = ({ number, label, delay }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [animatedNumber, setAnimatedNumber] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    const target = parseInt(number.replace(/[^\d]/g, ''));
                    if (target) {
                        animateNumber(target);
                    }
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [number]);

    const animateNumber = (target: number) => {
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setAnimatedNumber(target);
                clearInterval(timer);
            } else {
                setAnimatedNumber(Math.floor(current));
            }
        }, duration / steps);
    };

    return (
        <div
            ref={ref}
            className={`group relative bg-white rounded-xl shadow-lg p-8 text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Animated border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-xl transition-all duration-500" />

            <div className="relative z-10">
                <div className="text-4xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {animatedNumber}{number.includes('+') ? '+' : ''}
                </div>
                <div className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{label}</div>

                {/* Decorative element */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100" />
            </div>
        </div>
    );
};

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description, delay }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`group relative bg-white rounded-xl shadow-lg p-8 transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 border border-gray-100 overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {/* Gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Animated border effect */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="relative z-10">
                <div className="flex justify-center mb-6">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl text-blue-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 group-hover:shadow-lg">
                        {icon}
                    </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center group-hover:text-blue-700 transition-colors duration-300">{title}</h3>
                <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{description}</p>

                {/* Arrow indicator */}
                <div className="flex justify-center mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowRight size={20} className="text-blue-500" />
                </div>
            </div>
        </div>
    );
};

const TeamMember: React.FC<TeamMemberProps> = ({ name, position, photo, delay }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`group relative bg-[#E7EEFF] rounded-2xl shadow-lg text-center transition-all duration-700 hover:shadow-2xl hover:-translate-y-4 border border-gray-100 overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {/* Full photo overlay - shown on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out">
                <img
                    src={photo}
                    alt={name}
                    className="w-full h-96 object-cover rounded-2xl"
                />
                {/* Optional dark overlay for better contrast if needed */}
                <div className="absolute inset-0 rounded-2xl" />
            </div>

            {/* Original content - hidden on hover */}
            <div className="relative z-10 p-8 group-hover:opacity-0 transition-opacity duration-300">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Animated background elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-125" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-125" />

                <div className="relative z-10">
                    <div className="mb-6">
                        <div className="relative inline-block">
                            <img
                                src={photo}
                                alt={name}
                                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Ring animation */}
                            <div className="absolute inset-0 rounded-full border-2 border-blue-300 opacity-0 group-hover:opacity-100 transform scale-110 group-hover:scale-125 transition-all duration-500" />
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">{name}</h3>
                    <p className="text-blue-600 font-semibold mb-4 group-hover:text-blue-700 transition-colors duration-300">{position}</p>
                </div>
            </div>
        </div>
    );
};

// Fixed: Renamed from CompanyItem to CompanyCard to match usage
const CompanyCard: React.FC<CompanyCardProps> = ({ name, icon, delay }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`group relative text-center transition-all duration-500 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {/* Icon container */}
            <div className="flex justify-center mb-3">
                <div className="flex items-center justify-center w-28 h-20 group-hover:scale-110 transition-all duration-500 group-hover:drop-shadow-lg">
                    {icon}
                </div>
            </div>

            {/* Company name */}
            <h3 className="text-base font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                {name}
            </h3>

            {/* Optional underline effect */}
            <div className="mt-1 mx-auto w-0 h-0.5 bg-blue-500 group-hover:w-8 transition-all duration-300" />
        </div>
    );
};

export default function KeynesAbout() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);


    const whatsappNumber = "+971 4 453 4945";
    const whatsappMessage = "Hello, I’d like to know more about Keynes Group.";

    const handleCTAWhatsAppClick = (): void => {
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    const stats = [
        { number: '5012+', label: 'Successfully Completed Projects' },
        { number: '15+', label: 'Years of Experience with Pride' },
        { number: '1120', label: 'Revenue Milestone Investment' },
        { number: '1520+', label: 'Colleagues & Counting More' }
    ];

    const values = [
        {
            icon: <Zap size={24} />,
            title: 'Speed & Efficiency',
            description: 'Speed is a virtue that we stand by at all times, delivering projects promptly without compromising quality.'
        },
        {
            icon: <Target size={24} />,
            title: 'Excellence',
            description: 'We strive to exceed expectations through innovative solutions and meticulous attention to detail.'
        },
        {
            icon: <Shield size={24} />,
            title: 'Trust & Reliability',
            description: 'Building lasting relationships through consistent delivery and unwavering commitment to our clients.'
        },
        {
            icon: <Lightbulb size={24} />,
            title: 'Innovation',
            description: 'Harnessing cutting-edge technology and creative solutions to tackle the most complex projects.'
        },
        {
            icon: <Globe size={24} />,
            title: 'Global Reach',
            description: 'Leveraging our network of partnerships to deliver world-class solutions across all sectors.'
        },
        {
            icon: <Heart size={24} />,
            title: 'Commitment',
            description: 'Long-term partnerships built on trust, with dedicated support throughout every project lifecycle.'
        }
    ];

    const keynesCompanies = [
        {
            name: 'Keynes Accounting And Corporate Services',
            icon: <img src="/logos/keynes-accounting.png" alt="" />
        },
        {
            name: 'Keynes Advertising',
            icon: <img src="/logos/keynes-advertising.png" alt="" />
        },
        {
            name: 'Keynes Business Men Services',
            icon: <img src="/logos/keynes-businessmen.png" alt="" />
        },
        {
            name: 'Keynes Approvals',
            icon: <img src="/logos/keynes-approvals.png" alt="" />
        },
        {
            name: 'Keynes Constructions',
            icon: <img src="/logos/keynes-construction.png" alt="" />
        },
        {
            name: 'Keynes General Maintenance',
            icon: <img src="/logos/keynes-general-maintenance.png" alt="" />
        },
        {
            name: 'Keynes Interiors',
            icon: <img src="/logos/keynes-interiors.png" alt="" />
        },
        {
            name: 'Keynes It and Secureity Solutions',
            icon: <img src="/logos/keynes-it-solutions.png" alt="" />
        },
        {
            name: 'Keynes Pest Control',
            icon: <img src="/logos/keynes-pest-control.png" alt="" />
        },
        {
            name: 'Keynes Properties',
            icon: <img src="/logos/keynes-properties.png" alt="" />
        }
    ];

    const teamMembers = [
        {
            name: 'Jahanara Sahif',
            position: 'MANAGER',
            photo: '/Manager.png',
        },
        {
            name: 'Mr.Shamsudeen',
            position: 'MARKETING MANAGER',
            photo: '/Marketing-Manager.png',
        },
        {
            name: 'Anoop Kumar K Anandan',
            position: 'FINANCE MANAGER',
            photo: '/Finance-Manager.png',
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 relative overflow-hidden">
            {/* Mouse follower effect */}
            <div
                className="fixed inset-0 opacity-5 pointer-events-none transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent)`
                }}
            />

            {/* Hero Section */}
            <section className="relative text-white py-24 overflow-hidden">
                {/* Background image with zoom animation */}
                <div
                    className="absolute inset-0 bg-cover bg-center zoom-in-out"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
                    }}
                ></div>

                {/* Dark overlay for better text contrast */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Content */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in">
                            About{" "}
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                Keynes
                            </span>{" "}
                            Group
                        </h1>

                        <p
                            className="text-2xl md:text-3xl mb-8 max-w-4xl mx-auto opacity-90 animate-fade-in"
                            style={{ animationDelay: "0.2s" }}
                        >
                            UAE's Leading Construction & Service Conglomerate
                        </p>

                        <p
                            className="text-lg mb-12 max-w-2xl mx-auto opacity-80 animate-fade-in"
                            style={{ animationDelay: "0.4s" }}
                        >
                            Building Excellence, Delivering Innovation
                        </p>

                        <div
                            className="flex flex-wrap justify-center gap-4 animate-fade-in"
                            style={{ animationDelay: "0.6s" }}
                        >
                            {[
                                { icon: TrendingUp, text: "Growing Rapidly" },
                                { icon: Award, text: "Industry Leader" },
                                { icon: Users, text: "Expert Team" },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="group flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105"
                                >
                                    <item.icon
                                        size={20}
                                        className="text-white group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <span className="font-semibold">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 -mt-12 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <StatCard
                                key={index}
                                number={stat.number}
                                label={stat.label}
                                delay={index * 200}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                            Our Story
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <p className="text-xl text-gray-700 leading-relaxed">
                                <strong className="text-blue-600">Keynes Group</strong> is growing rapidly into UAE's leading company in delivering exceptional service. As the industry moves forward, so does our company.
                            </p>

                            <p className="text-lg text-gray-600 leading-relaxed">
                                Our journey from a construction company to a conglomerate comprising of contracting and service industries has been filled with its fair share of trials. However, we can honestly say that today, our employees are richer in experience than their counterparts.
                            </p>

                            <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                                <div className="flex items-center mb-4">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">Innovation & Excellence</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                                    Keynes Group symbolizes the best in innovation, creativity and technological mastery, befitting for a group that harnesses a culture of innovation to deliver technical expertise in tackling the most complex of projects.
                                </p>
                            </div>
                        </div>

                        <div className="group relative">
                            <div className="p-12 min-h-[400px] flex items-center justify-center">
                                <img
                                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                    alt="Construction and innovation"
                                    className="w-full h-full object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                            Our Leadership Team
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Meet the experienced professionals leading Keynes Group to new heights of excellence
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {teamMembers.map((member, index) => (
                            <TeamMember
                                key={index}
                                name={member.name}
                                position={member.position}
                                photo={member.photo}
                                delay={index * 200}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Keynes Companies Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                            The Keynes Family
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                            Our strong network of specialized companies working together to deliver comprehensive solutions across all industries
                        </p>
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
                        {keynesCompanies.map((company, index) => (
                            <CompanyCard
                                key={index}
                                name={company.name}
                                icon={company.icon}
                                delay={index * 100}
                            />
                        ))}
                    </div>

                    <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12 border border-blue-100 hover:shadow-xl transition-all duration-500">
                        <div className="grid md:grid-cols-3 gap-10 text-center">
                            {[
                                { icon: Globe, title: 'Integrated Solutions', desc: 'Seamless collaboration across all Keynes companies for comprehensive project delivery' },
                                { icon: Users, title: 'Shared Expertise', desc: 'Leveraging collective knowledge and skills from our diverse portfolio of companies' },
                                { icon: Award, title: 'Quality Assurance', desc: 'Unified standards of excellence maintained across all our subsidiary companies' }
                            ].map((item, index) => (
                                <div key={index} className="group/item">
                                    <div className="flex justify-center mb-6">
                                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl text-blue-600 group-hover/item:scale-110 group-hover/item:rotate-3 transition-all duration-500 group-hover/item:shadow-lg">
                                            <item.icon size={24} />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover/item:text-blue-700 transition-colors duration-300">{item.title}</h3>
                                    <p className="text-gray-600 group-hover/item:text-gray-700 transition-colors duration-300">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                        Our Mission
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-16"></div>

                    <div className="group bg-white rounded-2xl shadow-xl p-12 mb-16 border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                        <p className="text-xl text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                            To exceed the expectations of our business partners through groups of highly qualified teams and professional employees, enabling us to serve you better. We build trust with our customers by providing our clients with services in a long-term commitment and our experienced employees will be there at your discretion to help you troubleshoot any issues that might arise.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <ValueCard
                                key={index}
                                icon={value.icon}
                                title={value.title}
                                description={value.description}
                                delay={index * 100}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Partnership Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="text-left">
                                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                                    Strong Partnerships
                                </h2>
                                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-8"></div>
                            </div>

                            <p className="text-xl text-gray-700 leading-relaxed">
                                Keynes Group has strong relationships with other Keynes companies and subsidiaries and, as a result, can leverage ideas, skills and entrepreneurial flair to deliver top-quality work in all sectors.
                            </p>

                            <p className="text-lg text-gray-600 leading-relaxed">
                                Our network of partnerships enables us to tackle projects of any scale and complexity, bringing together the best minds and resources to achieve exceptional outcomes for our clients.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                                    <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
                                    <div className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Client Satisfaction</div>
                                </div>
                                <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                                    <div className="text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                                    <div className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Support Available</div>
                                </div>
                            </div>
                        </div>

                        <div className="group relative">
                            <div className="min-h-[500px] flex items-center justify-center overflow-hidden">
                                <div className="relative text-center">
                                    <img
                                        src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                        alt="Partnership and collaboration"
                                        className="w-full h-full object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">
                        Ready to Work with
                        <span className="block bg-gradient-to-r from-orange-300 to-cyan-300 bg-clip-text text-transparent">
                            Keynes Group?
                        </span>
                    </h2>

                    <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
                        Let's collaborate on your next project and experience the excellence that has made us UAE's trusted construction and service partner.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        <button
                            onClick={handleCTAWhatsAppClick}
                            className="group bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-3">
                            Get Started Today
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                    </div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
          opacity: 0;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .group:hover .animate-on-hover {
          animation: float 2s ease-in-out infinite;
        }

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
        </div>
    );
}