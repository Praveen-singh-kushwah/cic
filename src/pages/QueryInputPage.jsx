import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQueryIntent } from "../features/querySlice";

const QueryInputPage = () => {
  const dispatch = useDispatch();
  const { result, loading, error } = useSelector((state) => state.query || {});
  const [userInput, setUserInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false); // State for controlling chat modal visibility

  const handleSubmit = () => {
    if (userInput.trim()) {
      dispatch(fetchQueryIntent(userInput));
    }
  };

  // Function to toggle chat modal visibility
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="h-[85vh] bg-gray-100 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md px-4">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center text-gray-800">
          Customer Intent Classification
        </h1>
        <div className="bg-white rounded-lg shadow-md p-5 w-full">
          <div className="space-y-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter your query..."
              className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleSubmit}
              disabled={loading || !userInput.trim()}
              className={`w-full py-2 px-4 rounded-md text-white font-medium
                ${loading || !userInput.trim()
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? 'Processing...' : 'Submit'}
            </button>
          </div>

          {error && (
            <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
              Error: {error}
            </div>
          )}

          {result && result.labels && (
            <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-md">
              <h2 className="text-sm font-semibold text-gray-800">Predicted Intent:</h2>
              <p className="mt-1 text-blue-700">{result.labels[0]}</p>
            </div>
          )}
        </div>
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
    </div>
  );
};

export default QueryInputPage;
