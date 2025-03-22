import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setClassificationResults } from "../features/resultSlice";
import Swal from "sweetalert2";


// Hugging Face API details
const API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";
const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;


// Function to classify a single query using the Hugging Face Inference API
const classifyIntent = async (userInput) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        inputs: userInput,
        parameters: {
          candidate_labels: [
            "Order Inquiry",
            "Complaint",
            "Refund Request",
            "General Inquiry",
            "Technical Support"
          ]
        }
      },
      {
        headers: { Authorization: `Bearer ${API_KEY}` }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error classifying input:", error);
    return null;
  }
};


const DatasetUploadPage = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();


  // Handle file selection and validation
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = ["text/csv", "application/json", "text/plain"];
    const maxSize = 5 * 1024 * 1024; // 5 MB


    if (!selectedFile) {
      setError("Please select a file.");
      return;
    }
    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Invalid file type. Please upload a CSV, JSON, or TXT file.");
      return;
    }
    if (selectedFile.size > maxSize) {
      setError("File size exceeds 5 MB. Please upload a smaller file.");
      return;
    }


    setFile(selectedFile);
    setError("");
  };


  // Process the file: read, parse CSV, classify each query, and navigate to results page
  const handleUpload = () => {
    if (!file) {
      setError("No file selected for upload.");
      return;
    }


    setIsLoading(true);
    setError("");


    const reader = new FileReader();
    reader.onload = async (e) => {
      const fileContent = e.target.result;
      // Parse the CSV file (assuming the first row contains headers)
      Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          const rows = results.data; // Array of row objects
          try {
            // For each row, use the value in the "text" column for classification.
            // Use Promise.all to wait for all API calls.
            const classificationPromises = rows.map(async (row) => {
              const text = row.text; // Ensure your CSV has a "text" column with the customer query
              if (!text) return { text: "", classification: null };
              const classification = await classifyIntent(text);
              return { text, classification };
            });


            const classifications = await Promise.all(classificationPromises);


            // Format the classification results.
            // For each row, if the API call succeeded, use the top predicted label.
            const formattedResults = classifications.map((result) => ({
              text: result.text,
              predictedIntent:
                result.classification &&
                result.classification.labels &&
                result.classification.labels.length > 0
                  ? result.classification.labels[0] // Top label
                  : "N/A"
            }));


            // Dispatch the results to the Redux store.
            dispatch(setClassificationResults(formattedResults));
            setIsLoading(false);


            // Show SweetAlert2 success message
            Swal.fire({
              icon: "success",
              title: "Dataset Uploaded Successfully!",
              text: "Your dataset has been processed and classified.",
              confirmButtonText: "OK",
              confirmButtonColor: "#3085d6",
            }).then(() => {
              // Navigate to the results page after the user clicks OK
              navigate("/results");
            });
          } catch (error) {
            console.error("Error during classification:", error);
            setError("An error occurred while processing the file.");
            setIsLoading(false);
            Swal.fire({
              icon: "error",
              title: "Upload Failed",
              text: "An error occurred while processing the file. Please try again.",
              confirmButtonText: "OK",
              confirmButtonColor: "#d33",
            });
          }
        },
        error: (err) => {
          console.error("Error parsing CSV:", err);
          setError("Error parsing the CSV file.");
          setIsLoading(false);
          Swal.fire({
            icon: "error",
            title: "Upload Failed",
            text: "Error parsing the CSV file. Please check the file format.",
            confirmButtonText: "OK",
            confirmButtonColor: "#d33",
          });
        }
      });
    };


    reader.readAsText(file);
  };


  return (
    <div className="bg-gray-100 flex flex-col items-center w-full h-screen">
      <div className="w-full max-w-md mx-auto py-4 px-4 flex flex-col h-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Upload Your Dataset</h1>
       
        <div className="bg-white p-4 rounded-lg shadow-md w-full mb-4">
          {/* File Input Area with Drop Zone Effect */}
          <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:border-blue-500 transition-colors">
            <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
           
            <p className="text-sm mb-2 text-center text-gray-700">
              Drag and drop your file here, or click to browse
            </p>
           
            <input
              type="file"
              onChange={handleFileChange}
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


          {/* Upload & Process Button */}
          <button
            onClick={handleUpload}
            disabled={!file || isLoading}
            className={`mt-4 w-full px-4 py-2 rounded-md font-bold text-white transition-colors ${
              file && !isLoading
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
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


        {/* File Requirements Card */}
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
      </div>
    </div>
  );
};


export default DatasetUploadPage;
