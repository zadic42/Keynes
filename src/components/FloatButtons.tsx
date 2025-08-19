import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

interface ContactButtonsProps {
  phoneNumber?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
}

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
        className="group relative bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300"
        aria-label="Contact us on WhatsApp"
        type="button"
      >
        <MessageCircle size={24} />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          WhatsApp
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
        </div>
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-green-400 opacity-0 group-hover:opacity-25 group-hover:animate-ping"></div>
      </button>

      {/* Call Button */}
      <button
        onClick={handleCallClick}
        className="group relative bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
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

// Demo component with sample content
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Floating Contact Buttons Demo
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Features:
          </h2>
          <div className="space-y-2 text-gray-600">
            <p>✓ Fixed positioning at bottom right</p>
            <p>✓ Hover animations and scaling effects</p>
            <p>✓ Tooltips on hover</p>
            <p>✓ Ripple effect animations</p>
            <p>✓ Accessibility support with ARIA labels</p>
            <p>✓ TypeScript with proper type definitions</p>
            <p>✓ Customizable phone numbers and WhatsApp message</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Usage:
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <code className="text-sm text-gray-800">
              {`<FloatingContactButtons 
  phoneNumber="+1234567890"
  whatsappNumber="+1234567890" 
  whatsappMessage="Hello! I'd like to inquire about your services."
/>`}
            </code>
          </div>
        </div>

        {/* Sample content to demonstrate scrolling */}
        <div className="space-y-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                Section {i}
              </h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Contact Buttons */}
      <FloatingContactButtons 
        phoneNumber="+1234567890"
        whatsappNumber="+1234567890" 
        whatsappMessage="Hello! I'd like to get in touch with you."
      />
    </div>
  );
};

export default App;