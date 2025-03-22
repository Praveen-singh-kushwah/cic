// Introduction.jsx
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";


function Introduction() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });


  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 md:px-12 lg:px-16 py-10 sm:py-16 md:py-20 flex flex-col justify-center items-center">
        <motion.h1
          className="font-serif text-[#032d60] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mb-6 sm:mb-8 md:mb-10 tracking-tight"
          ref={ref}
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7 }}
        >
          NLP Model for Customer Intent Classification
        </motion.h1>


        <div>
          <motion.p
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Welcome to our Customer Intent Classification platform! This tool is designed to revolutionize the way you understand and respond to your customers. By leveraging advanced Natural Language Processing (NLP) technology, our platform identifies the intent behind customer queries and feedback with remarkable precision and speed. Whether you are managing large datasets or analyzing single customer comments in real time, this tool makes the process seamless and efficient. Our platform transforms the often daunting task of analyzing customer data into a straightforward, actionable process. It is built for businesses of all sizes, empowering you to improve customer service, develop better products, and strengthen customer relationships. Say goodbye to tedious manual analysis and embrace the future of automated intent detection.
          </motion.p>


          <motion.p
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Designed with user-friendliness in mind, our platform ensures an intuitive experience for everyone, from data analysts to customer service representatives. Begin your journey into smarter, faster, and more accurate customer interaction today. This tool leverages cutting-edge Natural Language Processing (NLP) technology to analyze and interpret customer feedback, queries, and comments. It offers unparalleled precision and speed in identifying the underlying intent of customer interactions. Whether you're looking to process individual comments for real-time insights or analyze large datasets for comprehensive trend analysis, this tool is tailored to meet your needs efficiently.
          </motion.p>


          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            In the modern business world, understanding customer intent has become a cornerstone of success. Effective communication starts with knowing what your customers need and expect. Our tool acts as a bridge, transforming raw customer data into actionable insights that drive better decision-making. Businesses can use these insights to enhance their customer service, improve product offerings, and build stronger, more meaningful relationships with their clientele. Gone are the days of manual data analysis, which is both time-consuming and prone to errors. Our platform introduces automation into your workflow, ensuring that your data is processed with accuracy and consistency. Additionally, the user-friendly design ensures that both technical experts and novices can navigate the tool with ease. By adopting our NLP-powered solution, you can streamline your operations, save valuable time, and focus on what truly matters—delivering exceptional customer experiences.
          </motion.p>
        </div>
      </div>
    </div>
  );
}


export default Introduction;
