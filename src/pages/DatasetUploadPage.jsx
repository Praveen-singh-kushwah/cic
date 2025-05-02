import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import https from "https";
import Swal from "sweetalert2";
import { setClassificationResults } from "../features/classificationSlice";

const API_URL = import.meta.env.VITE_API_URL;

// Log API_URL for debugging
console.log("API URL:", import.meta.env.VITE_API_URL);

const DatasetUploadPage = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("No file selected for upload.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log("Sending request to:", `${API_URL}/predict-csv`, "with file:", file.name);

      const response = await axios.post(`${API_URL}/predict-csv`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        timeout: 30000,
      });

      console.log("Response received:", response.data);

      const formattedResults = response.data.results.map((result) => ({
        text: result.input_text,
        predictedIntent: result.prediction,
      }));

      dispatch(setClassificationResults(formattedResults));
      setIsLoading(false);

      Swal.fire({
        icon: "success",
        title: "Dataset Uploaded Successfully!",
        text: "Your dataset has been processed and classified.",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/results");
      });
    } catch (error) {
      console.error("Upload error details:", {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        config: error.config,
      });
      setError(error.response?.data?.detail || "An error occurred while processing the file.");
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: error.response?.data?.detail || "An error occurred while processing the file.",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
      });
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center w-full h-screen">
      <div className="w-full max-w-md mx-auto py-4 px-4 flex flex-col h-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Upload Your Dataset</h1>
        <div className="bg-white p-4 rounded-lg shadow-md w-full mb-4">
          <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:border-blue-500 transition-colors">
            <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p className="text-sm mb-2 text-center text-gray-700">
              Drag and drop your file here, or click to browse
            </p>
            <input
              type="file"
              accept=".csv,.json,.txt"
              onChange={handleFileChange}
              disabled={isLoading}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
            {file && (
              <p className="mt-2 text-sm text-gray-600 truncate w-full text-center">
                Selected: {file.name}
              </p>
            )}
          </div>

          {error && (
            <div className="w-full mt-3 p-2 bg-red-50 text-red-600 text-sm rounded-md">
              {error}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || isLoading}
            className={`mt-4 w-full px-4 py-2 rounded-md font-bold text-white transition-colors ${file && !isLoading ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Upload & Process"
            )}
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md w-full">
          <h2 className="text-lg font-bold mb-2 text-gray-800">File Requirements:</h2>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start">
              <svg className="h-4 w-4 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Accepted formats: CSV, JSON, TXT
            </li>
            <li className="flex items-start">
              <svg className="h-4 w-4 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Maximum file size: 5 MB
            </li>
            <li className="flex items-start">
              <svg className="h-4 w-4 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              For CSV files, include a <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">text</code> column with customer queries.
            </li>
          </ul>
        </div>

        {/* Chat Button */}
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
                src="http://localhost:8501" // TODO: Update to production Streamlit URL (e.g., Streamlit Cloud or hosted server)
                title="Intent Chatbot"
                width="100%"
                height="100%"
                style={{ border: "none", borderRadius: "8px" }}
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatasetUploadPage;
