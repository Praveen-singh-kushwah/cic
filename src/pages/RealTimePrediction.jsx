import React, { useState, useEffect } from 'react';

function RealTimePrediction() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Toggle modal open/close
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Prevent background scroll when chat is open
  useEffect(() => {
    document.body.style.overflow = isChatOpen ? 'hidden' : 'unset';
  }, [isChatOpen]);

  return (
    <div className="relative min-h-screen p-4 bg-gray-100">
      <h1 className="mb-4 text-2xl font-bold">Real-time Prediction</h1>

      {/* Floating Chat Button */}
      <button
        aria-label="Open Chat"
        role="button"
        onClick={toggleChat}
        className="fixed z-50 p-4 text-white transition duration-300 bg-blue-600 rounded-full shadow-lg bottom-6 right-6 hover:bg-blue-700"
      >
        💬 Chat Here
      </button>

      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-xl w-[90%] md:w-[600px] h-[80%] relative p-2 transition-all duration-300 ease-in-out">
            {/* Close Button */}
            <button
              onClick={toggleChat}
              className="absolute text-2xl text-gray-600 top-2 right-3 hover:text-red-600"
              aria-label="Close Chat"
            >
              ✖
            </button>

            {/* Embedded Streamlit App (Update URL for production use) */}
            <iframe
              src="http://localhost:8501" // Replace with actual deployed URL for production
              title="Intent Chatbot"
              width="100%"
              height="100%"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              style={{
                border: 'none',
                borderRadius: '8px'
              }}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default RealTimePrediction;
