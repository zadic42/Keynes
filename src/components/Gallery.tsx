import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  department: string;
  category: string;
  date: string;
  location?: string;
  likes: number;
  photographer?: string;
}

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());

  // Company gallery data with professional photos
  const images: GalleryImage[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
      alt: "Team meeting",
      title: "Quarterly Planning Session",
      department: "Management",
      category: "meetings",
      date: "March 2024",
      location: "Conference Room A",
      likes: 24,
      photographer: "John Smith"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
      alt: "Office workspace",
      title: "Modern Office Environment",
      department: "Operations",
      category: "office",
      date: "February 2024",
      location: "Main Floor",
      likes: 18,
      photographer: "Sarah Johnson"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      alt: "Team collaboration",
      title: "Product Development Sprint",
      department: "Engineering",
      category: "team",
      date: "March 2024",
      location: "Innovation Lab",
      likes: 31,
      photographer: "Mike Chen"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
      alt: "Company event",
      title: "Annual Company Retreat",
      department: "HR",
      category: "events",
      date: "January 2024",
      location: "Mountain Resort",
      likes: 45,
      photographer: "Emily Davis"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      alt: "Office interior",
      title: "Reception Area",
      department: "Facilities",
      category: "office",
      date: "December 2023",
      location: "Main Entrance",
      likes: 12,
      photographer: "Alex Wilson"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      alt: "Team brainstorming",
      title: "Creative Workshop",
      department: "Marketing",
      category: "meetings",
      date: "February 2024",
      location: "Creative Studio",
      likes: 27,
      photographer: "Lisa Brown"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
      alt: "Award ceremony",
      title: "Employee Recognition Awards",
      department: "HR",
      category: "events",
      date: "December 2023",
      location: "Main Auditorium",
      likes: 52,
      photographer: "David Lee"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop",
      alt: "Training session",
      title: "Professional Development Workshop",
      department: "Learning & Development",
      category: "training",
      date: "March 2024",
      location: "Training Center",
      likes: 19,
      photographer: "Rachel Green"
    }
  ];

  const categories = ['all', 'meetings', 'office', 'team', 'events', 'training'];

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const toggleLike = (imageId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };



  return (
    <div className="min-h-screen bg-blue-200/50 pb-10">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0"></div>
        <div className="relative px-6 py-12 text-center mt-10">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 tracking-tight">
            Company Gallery
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Capturing our journey, achievements, and the people who make it all possible
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-gray-500/10 text-black hover:bg-white/20 backdrop-blur-sm'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                    <p className="text-purple-200 text-sm">{image.photographer}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-purple-300 text-xs uppercase tracking-wide">
                        {image.category}
                      </span>
                      <button
                        onClick={(e) => toggleLike(image.id, e)}
                        className="flex items-center space-x-1 text-white hover:text-red-400 transition-colors"
                      >
                        <Heart
                          size={16}
                          className={likedImages.has(image.id) ? 'fill-red-500 text-red-500' : ''}
                        />
                        <span className="text-xs">{image.likes + (likedImages.has(image.id) ? 1 : 0)}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
};

export default Gallery;