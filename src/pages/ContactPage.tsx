import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

const ContactPage = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setIsSubmitted(false);
        setErrors({});
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-900 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
                    <p className="text-gray-600 mb-6">
                        Your message has been sent successfully. We'll get back to you soon!
                    </p>
                    <button
                        onClick={resetForm}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Send Another Message
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
            `}} ></style>
            
            {/* Animated Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 py-20 px-4">
                {/* Floating Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="floating-shape absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full blur-sm"></div>
                    <div className="floating-shape absolute top-40 right-20 w-32 h-32 bg-white/15 rounded-full blur-sm"></div>
                    <div className="floating-shape absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-sm"></div>
                    <div className="floating-shape absolute top-32 left-1/2 w-16 h-16 bg-white/25 rounded-full blur-sm"></div>
                    <div className="floating-shape absolute bottom-32 right-1/3 w-28 h-28 bg-white/20 rounded-full blur-sm"></div>
                </div>
                
                {/* Animated Grid Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="pulse-slow absolute top-0 left-0 w-full h-full" 
                         style={{
                             backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                             backgroundSize: '40px 40px'
                         }}></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <div className="backdrop-blur-glass rounded-3xl p-8 shadow-2xl border border-white/30">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-glow">
                            Get in Touch
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                            Have a question or want to work together? We'd love to hear from you.
                            Send us a message and we'll respond as soon as possible.
                        </p>
                        
                        {/* Decorative Elements */}
                        <div className="flex justify-center items-center space-x-4 mt-8">
                            <div className="w-2 h-2 bg-white rounded-full pulse-slow"></div>
                            <div className="w-3 h-3 bg-white rounded-full pulse-slow" style={{animationDelay: '0.5s'}}></div>
                            <div className="w-2 h-2 bg-white rounded-full pulse-slow" style={{animationDelay: '1s'}}></div>
                        </div>
                    </div>
                </div>
                
                {/* Bottom Wave Effect */}
                <div className="absolute bottom-0 left-0 w-full">
                    <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,120 L0,80 Q300,0 600,80 T1200,80 L1200,120 Z" 
                              fill="rgb(249, 250, 251)" 
                              opacity="0.8"/>
                    </svg>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid lg:grid-cols-2 gap-12 -mt-10 relative z-10">
                    {/* Contact Information */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <Mail className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                                    <p className="text-gray-600">info@keynesgroupuae.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <Phone className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                                    <p className="text-gray-600">+971 4 453 4945</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <MapPin className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                                    <p className="text-gray-600">
                                        Office 304 & 305 , Oxford Tower , Business Bay , Dubai<br />
                                        United Arab Emirates
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="bg-white p-5 rounded-3xl shadow-sm mt-8">
                            <h4 className="text-xl font-bold text-gray-900 mb-6">Find Us</h4>
                            <div className="bg-gray-100 h-64 rounded-2xl overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.694150711368!2d76.22092247355516!3d10.986442455287861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7cd17c99d6635%3A0x7148e36faaafed57!2sFirst%20Logic%20Meta%20Lab%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1754644207030!5m2!1sen!2sin"
                                    className="w-full h-full border-0"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

                        <div className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Your full name"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="your.email@example.com"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.subject ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="What's this about?"
                                />
                                {errors.subject && (
                                    <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={5}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical ${errors.message ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Tell us more about your inquiry..."
                                />
                                {errors.message && (
                                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                onClick={handleSubmit}
                                className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-medium transition-colors ${isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200'
                                    } text-white`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;