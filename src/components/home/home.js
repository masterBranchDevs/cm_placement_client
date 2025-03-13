import React, { useState, useEffect, useCallback } from "react";

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, [images.length]);

    const handlePreviousSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [handleNextSlide]);

    return (
        <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[92vh] overflow-hidden">
            {images.map((image, index) => (
                <div key={index} className={`absolute inset-0 transition-opacity duration-700 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}>
                    <img
                        src={image}
                        onError={(e) => e.target.src = 'path/to/default-image.jpg'} // Fallback image
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>
            ))}

            <button onClick={handlePreviousSlide} className="absolute top-1/2 left-5 -translate-y-1/2 z-10 cursor-pointer text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75">❮</button>
            <button onClick={handleNextSlide} className="absolute top-1/2 right-5 -translate-y-1/2 z-10 cursor-pointer text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75">❯</button>

            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-orange-500" : "bg-gray-300"}`}></button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
