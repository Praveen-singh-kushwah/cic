import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import https from "https"; // Import https module for self-signed cert workaround
import Swal from "sweetalert2";
import { setClassificationResults } from "../store/querySlice"; // Adjust path if needed
import "./DatasetUploadPage.css"; // Adjust if you have custom styles

const API_URL = import.meta.env.VITE_API_URL;

// Log API_URL for debugging
console.log("API URL:", import.meta.env.VITE_API_URL);

const DatasetUploadPage = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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

      const response = await axios.post(`${API_URL}/predict-csv`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Bypass self-signed cert
      });

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

  return (
    <div className="dataset-upload-container">
      <h2>Upload Dataset</h2>
      <div className="upload-form">
        <input
          type="file"
          accept=".csv,.json,.txt"
          onChange={handleFileChange}
          disabled={isLoading}
        />
        {error && <p className="error-message">{error}</p>}
        <button
          onClick={handleUpload}
          disabled={isLoading || !file}
          className={isLoading ? "loading" : ""}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default DatasetUploadPage;
