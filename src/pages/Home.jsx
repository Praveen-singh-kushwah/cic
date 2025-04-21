import React, { useState } from "react";
import Navbar from "../components/Navbar/";
import HeroSection from "../components/HeroSection";
import Introduction from "../components/Introduction";
import Features from "../components/Features";
import UserGuide from "../components/UserGuide";
import Footer from "../components/Footer";

function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <div className="overflow-x-hidden">
        <HeroSection />
      </div>
      <div>
        <Introduction />
      </div>
      <div>
        <Features />
      </div>
      <div className="mt-6">
        <UserGuide />
      </div>
      <div>
        <Footer />
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 z-50"
      >
        💬 Chat Here
      </button>

      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[90%] md:w-[600px] h-[80%] relative p-2">
            <button
              onClick={toggleChat}
              className="absolute top-2 right-3 text-gray-600 hover:text-red-600 text-xl"
            >
              ✖
            </button>
            <iframe
              src="http://localhost:8501" // Make sure this matches your Streamlit port
              title="Intent Chatbot"
              width="100%"
              height="100%"
              style={{ border: "none", borderRadius: "8px" }}
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
