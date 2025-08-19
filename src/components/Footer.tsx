import { MapPin, Phone, Mail, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '/about', isRoute: true },
    { name: 'Services', href: '/services', isRoute: false },
    { name: 'Contact', href: '/contact', isRoute: false }
  ];

  const services = [
    { name: 'Authority Approvals', href: '/services', isRoute: true },
    { name: 'Construction', href: '/services', isRoute: true },
    { name: 'Property Management', href: '/services', isRoute: true },
    { name: 'Business Support Services', href: '/services', isRoute: true },
    { name: 'General Maintenance', href: '/services', isRoute: true },
    { name: 'IT and Security Solutions', href: '/services', isRoute: true },
    { name: 'Pest Control Services', href: '/services', isRoute: true },
    { name: 'Additional Services', href: '/services', isRoute: true },
    { name: 'Interior Design', href: '/services', isRoute: true },
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Instagram, href: '#', name: 'Instagram' }
  ];

  return (
    <footer className="bg-gray-900 font-poppins text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6">Keynes Group UAE</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
              Transforming businesses across the UAE with innovative solutions,
              strategic guidance, and unwavering commitment to excellence.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <span className="text-gray-300">304 & 305 , Oxford Tower , Business Bay, Dubai</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <span className="text-gray-300">+971 4 453 4945</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <span className="text-gray-300">info@keynesgroupuae.com</span>
              </div>
            </div>

            <div className="flex pt-4 space-x-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-amber-500 transition-colors duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-amber-500 transition-colors duration-300"
                      data-isroute="true"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-amber-500 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index}>
                  {service.isRoute ? (
                    <Link
                      to={service.href}
                      className="text-gray-300 hover:text-amber-500 transition-colors duration-300"
                      data-isroute="true"
                    >
                      {service.name}
                    </Link>
                  ) : (
                    <a
                      href={service.href}
                      className="text-gray-300 hover:text-amber-500 transition-colors duration-300"
                    >
                      {service.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Keynes Group UAE. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
