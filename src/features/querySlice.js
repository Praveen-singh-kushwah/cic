import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import https from "https"; // Import https module for self-signed cert workaround

const API_URL = import.meta.env.VITE_API_URL;

// Log API_URL for debugging
console.log("API URL:", import.meta.env.VITE_API_URL);

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

const querySlice = createSlice({
  name: "query",
  initialState: {
    results: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueryIntent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQueryIntent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(fetchQueryIntent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default querySlice.reducer;
