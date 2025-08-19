import React from "react";
import { Phone } from "lucide-react";

type ContactButtonProps = {
    phone: string;
};

const ContactButton: React.FC<ContactButtonProps> = ({ phone }) => {
    const handleClick = () => {
        window.location.href = `tel:${phone}`;
    };

    return (
        <button
            onClick={handleClick}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>
                Call Now: +971 50 123 4567
            </span>
        </button>
    );
};

export default ContactButton;