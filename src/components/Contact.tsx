import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
    const primaryContactInfo = [
        {
            icon: MapPin,
            title: 'Office Location',
            details: ['304 & 305 , Oxford Tower , Business Bay, Dubai', 'United Arab Emirates']
        },
        {
            icon: Phone,
            title: 'Phone Numbers',
            details: ['+971 4 453 4945']
        },
        {
            icon: Mail,
            title: 'Email Address',
            details: ['info@keynesgroupuae.com']
        }
    ];

    return (
        <section id="contact" className="py-24 font-poppins bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                        Get In Touch
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        Let's Start a
                        <span className="text-blue-600"> Conversation</span>
                    </h2>

                    <p className="text-xl text-gray-600 leading-relaxed">
                        Ready to take your business to the next level? We'd love to hear from you.
                        Get in touch and let's discuss how we can help achieve your goals.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* First Section: Office, Phone, Email */}
                    <div className="space-y-8">
                        {primaryContactInfo.map((info, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <info.icon className="h-7 w-7 text-blue-600" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                                            {info.title}
                                        </h4>
                                        {info.details.map((detail, detailIndex) => (
                                            <p key={detailIndex} className="text-gray-600 leading-relaxed break-words text-sm sm:text-base">
                                                {detail}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Second Section: Business Hours and Map */}
                    <div className="space-y-8">
                        {/* Business Hours */}
                        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-start space-x-4">
                                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <Clock className="h-7 w-7 text-blue-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                                        Business Hours
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                        Sunday - Thursday: 9:00 AM - 6:00 PM
                                    </p>
                                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                        Friday - Saturday: Closed
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="bg-white p-5 rounded-3xl shadow-sm">
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
                </div>
            </div>
        </section>
    );
};

export default Contact;