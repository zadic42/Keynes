import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Phone, MessagesSquare } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ClientPage from './components/Clients';
import ReviewPage from './components/Reviews';
import ServiceDetailPage from './pages/ServiceDetails';
import KeynesAbout from './pages/Aboutus';
import ContactPage from './pages/ContactPage';


interface ContactButtonsProps {
  phoneNumber?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
}

// Scroll to top component
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

const FloatingContactButtons: React.FC<ContactButtonsProps> = ({
  phoneNumber = '+1234567890',
  whatsappNumber = '+1234567890',
  whatsappMessage = 'Hello! I would like to get in touch.'
}) => {
  const handleCallClick = (): void => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleWhatsAppClick = (): void => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="group relative bg-blue-700 hover:bg-blue-900 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label="Contact us on WhatsApp"
        type="button"
      >
        <MessagesSquare size={24} />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          WhatsApp
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
        </div>
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-blue-900 opacity-0 group-hover:opacity-25 group-hover:animate-ping"></div>
      </button>

      {/* Call Button */}
      <button
        onClick={handleCallClick}
        className="group relative bg-blue-700 hover:bg-blue-900 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label="Call us"
        type="button"
      >
        <Phone size={24} />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Call Now
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
        </div>
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-25 group-hover:animate-ping"></div>
      </button>
    </div>
  );
};

// Home page component
const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <ClientPage />
      <ReviewPage />
      <Contact />
    </>
  );
};

// About page component
const AboutPage = () => {
  return (
    <KeynesAbout />
  );
};

// Services page component (if you want ServiceDetailPage on separate route)
const ServicesPage = () => {
  return (
    <ServiceDetailPage />
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen font-poppins">
        <ScrollToTop />
        <Header />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path='/contactus' element={<ContactPage />} />
        </Routes>
        
        <Footer />
        
        {/* Floating Contact Buttons - available on all pages */}
        <FloatingContactButtons 
          phoneNumber="+919074435902"
          whatsappNumber="+918157959828" 
          whatsappMessage="Hello! I'd like to inquire about your services."
        />
      </div>
    </Router>
  );
}

export default App;