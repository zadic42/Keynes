import React from 'react';

interface Client {
    id: number;
    name: string;
    logo: string;
}

const ClientPage: React.FC = () => {
    // Updated client data with working placeholder images
    const clients: Client[] = [
        {
            id: 1,
            name: 'WestZone',
            logo: '/logos/WZ-Logo.avif'
        },
        {
            id: 2,
            name: 'UAE Exchange',
            logo: '/logos/UaeExchange.jpg'
        },
        {
            id: 3,
            name: 'KFC',
            logo: '/logos/KFC.png'
        },
        {
            id: 4,
            name: 'LM Exchange',
            logo: '/logos/LMEX.svg'
        },
        {
            id: 5,
            name: 'All day',
            logo: '/logos/allday_community_centre.png'
        },
        {
            id: 6,
            name: 'Quick Registration',
            logo: '/logos/Quick-registration.jpg'
        },
        {
            id: 7,
            name: 'Ramada',
            logo: '/logos/Ramada.png'
        },
        {
            id: 8,
            name: 'Calicut Notebook',
            logo: '/logos/Calicut-notebook.jpg'
        },
        {
            id: 9,
            name: 'Bin Sina',
            logo: '/logos/BinSina.jpg'
        },
        {
            id: 10,
            name: 'Jaleel Holdings',
            logo: '/logos/jaleel-holdings.png'
        },
        {
            id: 11,
            name: 'JW Marriott',
            logo: '/logos/JW-Marriott.png'
        },
        {
            id: 11,
            name: 'London Fish & Chips',
            logo: '/logos/London-fish-and-chips.jpg'
        },
    ];

    return (
        <div className="min-h-screen font-poppins bg-white">
            {/* Header */}
            <div className="pt-20 pb-16 text-center">
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                    Our <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500'>Clients</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto px-6">
                    Trusted by industry leaders worldwide. We're proud to work with these amazing companies
                    that push the boundaries of innovation.
                </p>
            </div>

            {/* Logo Carousel */}
            <div className="relative overflow-hidden py-10">
                <div className="flex animate-scroll space-x-16 w-max">
                    {[...clients, ...clients, ...clients, ...clients].map((client, index) => (
                        <div
                            key={`${client.id}-${index}`}
                            className="flex-shrink-0 group cursor-pointer"
                        >
                            <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-lg hover:border-blue-300 transition-all duration-300 group-hover:scale-105">
                                <img
                                    src={client.logo}
                                    alt={`${client.name} logo`}
                                    className="w-full h-full object-contain rounded-lg transition-opacity duration-300"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const fallback = target.parentElement?.querySelector('.fallback-text') as HTMLElement;
                                        if (fallback) {
                                            fallback.classList.remove('hidden');
                                        }
                                    }}
                                />
                                <div className="fallback-text hidden w-full h-full flex items-center justify-center text-gray-600 font-bold text-lg">
                                    {client.name}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes scroll {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-50%);
                        }
                    }
                    .animate-scroll {
                        animation: scroll 30s linear infinite;
                    }
                    .animate-scroll:hover {
                        animation-play-state: paused;
                    }
                `
            }} />
        </div>
    );
};

export default ClientPage;