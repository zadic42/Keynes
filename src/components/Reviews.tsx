import { useState } from "react";
import { Star } from "lucide-react";

interface Review {
    id: number;
    name: string;
    avatar: string;
    rating: number;
    content: string;
}

const reviews: Review[] = [
    {
        id: 1,
        name: "Sarah Johnson",
        avatar:
            "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        rating: 5,
        content:
            "Amazing experience! The service exceeded all my expectations and the support team was incredibly helpful throughout the process.",
    },
    {
        id: 2,
        name: "Michael Chen",
        avatar:
            "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        rating: 5,
        content:
            "Really solid product with excellent features. Great value for money and the interface is very intuitive to use.",
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        avatar:
            "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        rating: 5,
        content:
            "This has been a game-changer for my business. Highly recommend to anyone looking for a reliable solution.",
    },
    {
        id: 4,
        name: "David Thompson",
        avatar:
            "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        rating: 5,
        content:
            "Setup was straightforward and customer service was very responsive. Definitely worth trying out.",
    },
    {
        id: 5,
        name: "Jessica Park",
        avatar:
            "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        rating: 5,
        content:
            "Perfect solution for our team. It streamlined our workflow and improved collaboration significantly.",
    },
    {
        id: 6,
        name: "Ryan Kumar",
        avatar:
            "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
        rating: 5,
        content:
            "Good product overall. Does what it promises and the team behind it is clearly passionate about their work.",
    },
];

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-4 h-4 ${star <= rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-200"
                        }`}
                />
            ))}
        </div>
    );
};

const ReviewCard = ({ review }: { review: Review }) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col justify-between h-full">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-50"
                    />
                    <div>
                        <h3 className="font-semibold text-gray-900">{review.name}</h3>
                        <StarRating rating={review.rating} />
                    </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{review.content}</p>
            </div>
        </div>
    );
};

function ReviewPage() {
    const [visibleCount, setVisibleCount] = useState(3);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 3);
    };

    return (
        <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-14">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                        Testimonials
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        What Our Customers Say
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Real stories from our valued customers across different industries.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {reviews.slice(0, visibleCount).map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>

                {visibleCount < reviews.length && (
                    <div className="flex justify-center mt-10">
                        <button
                            onClick={handleLoadMore}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative overflow-hidden"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ReviewPage;
