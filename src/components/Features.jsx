// Features.jsx
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";


import img1 from "../assets/Features/uploadDataset.png";
import img2 from "../assets/Features/commets.png";
import img3 from "../assets/Features/nlp.png";
import img4 from "../assets/Features/ui.png";


function Features() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });


  return (
    <div className="w-full py-8 sm:py-12 md:py-16 flex justify-center items-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 md:px-8 flex flex-col gap-6 sm:gap-9 justify-center items-center">
        <div>
          <motion.h1
            className="font-serif text-[#032d60] font-bold text-3xl sm:text-4xl md:text-5xl text-center mb-4 tracking-tight"
            ref={headerRef}
            initial={{ opacity: 0, y: -20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
          >
            Features
          </motion.h1>
        </div>


        <div className="w-full lg:w-[90%] xl:w-[85%] flex flex-col gap-12 sm:gap-16 md:gap-20 justify-between items-center">
          {/* Feature 1 */}
          <motion.div
            className="w-full flex flex-col md:flex-row gap-8 md:gap-12 justify-between items-center"
            ref={ref1}
            initial={{ opacity: 0, y: 50 }}
            animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-full md:w-[300px] h-[200px] sm:h-[250px] md:h-[300px] flex justify-center">
              <motion.img
                src={img1}
                alt="Upload Datasets"
                className="w-auto h-full object-contain"
                initial={{ scale: 0.8 }}
                animate={inView1 ? { scale: 1 } : { scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </div>
            <div className="w-full md:flex-1">
              <motion.h2
                className="font-serif text-[#032d60] font-bold text-xl sm:text-2xl md:text-3xl text-center md:text-start pb-3 sm:pb-5"
                initial={{ opacity: 0 }}
                animate={inView1 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Upload Datasets for Analysis:
              </motion.h2>
              <motion.ul
                className="list-disc pl-5 text-base sm:text-lg md:text-xl space-y-2 sm:space-y-4"
                initial={{ opacity: 0 }}
                animate={inView1 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <li>
                  Upload a dataset containing customer comments to classify intents in bulk.
                </li>
                <li>
                  Gain insights from large datasets with just a few clicks.
                </li>
                <li>
                  Supports popular file formats like CSV to ensure seamless integration.
                </li>
              </motion.ul>
            </div>
          </motion.div>


          {/* Feature 2 */}
          <motion.div
            className="w-full flex flex-col-reverse md:flex-row gap-8 md:gap-12 justify-between items-center"
            ref={ref2}
            initial={{ opacity: 0, y: 50 }}
            animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-full md:flex-1">
              <motion.h2
                className="font-serif text-[#032d60] font-bold text-xl sm:text-2xl md:text-3xl text-center md:text-start pb-3 sm:pb-5"
                initial={{ opacity: 0 }}
                animate={inView2 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Input Single Comments for Instant Intent Detection:
              </motion.h2>
              <motion.ul
                className="list-disc pl-5 text-base sm:text-lg md:text-xl space-y-2 sm:space-y-4"
                initial={{ opacity: 0 }}
                animate={inView2 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <li>
                  Enter a single comment or query to immediately identify its intent.
                </li>
                <li>
                  Ideal for quick and real-time decision-making.
                </li>
                <li>
                  Get instant results, allowing you to respond to customer needs on the spot.
                </li>
              </motion.ul>
            </div>
            <div className="w-full md:w-[300px] h-[200px] sm:h-[250px] md:h-[300px] flex justify-center">
              <motion.img
                src={img2}
                alt="Single Comments"
                className="w-auto h-full object-contain"
                initial={{ scale: 0.8 }}
                animate={inView2 ? { scale: 1 } : { scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </div>
          </motion.div>


          {/* Feature 3 */}
          <motion.div
            className="w-full flex flex-col md:flex-row gap-8 md:gap-12 justify-between items-center"
            ref={ref3}
            initial={{ opacity: 0, y: 50 }}
            animate={inView3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-full md:w-[300px] h-[200px] sm:h-[250px] md:h-[300px] flex justify-center">
              <motion.img
                src={img3}
                alt="NLP Model"
                className="w-auto h-full object-contain"
                initial={{ scale: 0.8 }}
                animate={inView3 ? { scale: 1 } : { scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </div>
            <div className="w-full md:flex-1">
              <motion.h2
                className="font-serif text-[#032d60] font-bold text-xl sm:text-2xl md:text-3xl text-center md:text-start pb-3 sm:pb-5"
                initial={{ opacity: 0 }}
                animate={inView3 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Advanced Fine-Tuned NLP Model:
              </motion.h2>
              <motion.ul
                className="list-disc pl-5 text-base sm:text-lg md:text-xl space-y-2 sm:space-y-4"
                initial={{ opacity: 0 }}
                animate={inView3 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <li>
                  Built on state-of-the-art NLP techniques, our model ensures high accuracy and reliability in intent classification.
                </li>
                <li>
                  Designed to handle a variety of customer intents such as complaints, purchases, or support inquiries.
                </li>
                <li>
                  Fine-tuned on diverse datasets to deliver consistent results across industries.
                </li>
              </motion.ul>
            </div>
          </motion.div>


          {/* Feature 4 */}
          <motion.div
            className="w-full flex flex-col-reverse md:flex-row gap-8 md:gap-12 justify-between items-center"
            ref={ref4}
            initial={{ opacity: 0, y: 50 }}
            animate={inView4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-full md:flex-1">
              <motion.h2
                className="font-serif text-[#032d60] font-bold text-xl sm:text-2xl md:text-3xl text-center md:text-start pb-3 sm:pb-5"
                initial={{ opacity: 0 }}
                animate={inView4 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                User-Centric Design:
              </motion.h2>
              <motion.ul
                className="list-disc pl-5 text-base sm:text-lg md:text-xl space-y-2 sm:space-y-4"
                initial={{ opacity: 0 }}
                animate={inView4 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <li>
                  Intuitive interface tailored for both technical and non-technical users.
                </li>
                <li>
                  Lightweight and responsive design for seamless access across devices.
                </li>
                <li>
                  Real-time processing to enhance productivity and efficiency.
                </li>
              </motion.ul>
            </div>
            <div className="w-full md:w-[300px] h-[200px] sm:h-[250px] md:h-[300px] flex justify-center">
              <motion.img
                src={img4}
                alt="User-Centric Design"
                className="w-auto h-full object-contain"
                initial={{ scale: 0.8 }}
                animate={inView4 ? { scale: 1 } : { scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


export default Features;