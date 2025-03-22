// UserGuide.jsx
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";


function UserGuide() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });


  const steps = [
    {
      title: "Sign Up & Login",
      description: "Create an account or log in with your existing credentials to access the platform."
    },
    {
      title: "Choose Your Analysis Method",
      description: "Select between dataset upload or single comment analysis based on your needs."
    },
    {
      title: "Upload Dataset or Enter Comment",
      description: "Upload your CSV file or type in a single comment for analysis."
    },
    {
      title: "Review Results",
      description: "View the classified intents and related insights from your analysis."
    }
  ];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };


  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };


  return (
    <div className="w-full py-10 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#032d60]">How to Use Our Platform</h2>
          <p className="mt-4 text-lg text-gray-600">Follow these simple steps to get started with our Intent Classification tool</p>
        </motion.div>


        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4 mx-auto">
                <span className="text-xl font-bold">{index + 1}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-gray-800">{step.title}</h3>
              <p className="text-gray-600 text-center">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>


        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}


export default UserGuide;
