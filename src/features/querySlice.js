import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import https from "https"; // Import https module

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const fetchQueryIntent = createAsyncThunk(
  "query/fetchQueryIntent",
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/predict`, {
        params: { question: userInput },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Bypass self-signed cert
      });
      return {
        labels: [response.data.prediction],
        input_text: response.data.input_text,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch intent");
    }
  }
);

// ... rest of the code ...
