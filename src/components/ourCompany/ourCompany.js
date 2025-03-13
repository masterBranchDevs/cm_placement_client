import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OurCompany = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = useMemo(() => [
        'https://res.cloudinary.com/dyj4csr44/image/upload/v1739382494/Companies/wcl3xh9oo28kn2obdkbt.jpg',
        'https://res.cloudinary.com/dyj4csr44/image/upload/v1739382494/Companies/e9ppj9cks6r2e2yunhfa.jpg',
        'https://res.cloudinary.com/dyj4csr44/image/upload/v1739382494/Companies/ujjjktmlmm8pczls1iqe.jpg',
        'https://res.cloudinary.com/dyj4csr44/image/upload/v1739382493/Companies/zkvfa0ohynxby7bklrws.jpg',
        'https://res.cloudinary.com/dyj4csr44/image/upload/v1739382493/Companies/wvdbg97lpl2vgrattxzj.jpg',
        'https://res.cloudinary.com/dyj4csr44/image/upload/v1739382494/Companies/wcl3xh9oo28kn2obdkbt.jpg',
        'https://res.cloudinary.com/dyj4csr44/image/upload/v1739382494/Companies/e9ppj9cks6r2e2yunhfa.jpg',
        "https://res.cloudinary.com/dyj4csr44/image/upload/v1739382494/Companies/ujjjktmlmm8pczls1iqe.jpg",
        "https://res.cloudinary.com/dyj4csr44/image/upload/v1739382493/Companies/zkvfa0ohynxby7bklrws.jpg",
    ], []);

    // **Fade In & Out Animation**
    const imageVariants = {
        enter: { opacity: 0 }, // Start transparent
        center: { opacity: 1, transition: { duration: 1 } }, // Fade in smoothly
        exit: { opacity: 0, transition: { duration: 1 } }, // Fade out smoothly
    };

    // Update images every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length - 2)); 
        }, 3000);

        return () => clearInterval(interval);
    }, [images]);

    const currentImages = [
        images[currentIndex],
        images[currentIndex + 1],
        images[currentIndex + 2],
    ];

    return (
        <>
            <h3 className="text-white text-center sm:p-1 md:p-1">Major Companies</h3>
            <section className="pt-4 pb-1">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="carousel-inner d-flex">
                                <AnimatePresence>
                                    {currentImages.map((image, index) => (
                                        <motion.div
                                            key={image}
                                            className="col-md-4 mb-1"
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            variants={imageVariants}
                                        >
                                            <img
                                                className="img-fluid rounded-pill shadow h-24 sm:h-24 md:h-60 lg:h-60 xl:h-60"
                                                alt={`carousel-${index}`}
                                                src={image}
                                            />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default OurCompany;
