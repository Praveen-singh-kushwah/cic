// HeroSection.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";


// Import images from the assets folder
import img1 from "../assets/Features/charts.png";
import img2 from "../assets/Features/commets.png";
import img3 from "../assets/Features/nlp.png";
import img4 from "../assets/Features/ui.png";


const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [img1, img2, img3, img4]; // Use imported images


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Change image every 3 seconds


    return () => clearInterval(interval);
  }, [images.length]);


  return (
    <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16 items-center justify-between min-h-screen w-full px-4 sm:px-8 lg:px-16 py-12 bg-gray-100 overflow-hidden font-sans">
      {/* Images section - now first in the flex column order for mobile */}
      <motion.div
        className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-96 flex items-center justify-center order-first lg:order-last"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Feature ${index + 1}`}
            className={`absolute max-w-full h-auto object-contain transition-all duration-1000 ${
              index === currentImage ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          />
        ))}
      </motion.div>


      {/* Content section - now second in the flex column order for mobile */}
      <motion.div
        className="text-center lg:text-left w-full lg:w-1/2 max-w-2xl mx-auto lg:mx-0 order-last lg:order-first mt-8 lg:mt-0"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight leading-tight text-gray-900">
          Transform Customer Insights with Advanced NLP
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
          Discover a powerful tool designed to classify customer intent with
          precision. Analyze datasets, interpret single comments, and gain
          actionable insights to improve customer satisfaction and business
          outcomes.
        </p>
        <motion.button
          className="px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try it now
        </motion.button>
      </motion.div>
    </div>
  );
};


export default HeroSection;
