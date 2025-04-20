import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API_URL; // FastAPI backend URL

export const fetchQueryIntent = createAsyncThunk(
  "query/fetchQueryIntent",
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/predict`, {
        params: { question: userInput },
      });

      console.log("API Response:", response.data); // Debugging log

      // FastAPI returns { input_text: string, prediction: string }
      // Transform to match the expected format in QueryInputPage
      return {
        labels: [response.data.prediction], // Wrap prediction in labels array
        input_text: response.data.input_text,
      };
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.detail || "API Error");
    }
  }
);

const querySlice = createSlice({
  name: "query",
  initialState: { result: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueryIntent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.result = null; // Reset result on new query
      })
      .addCase(fetchQueryIntent.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(fetchQueryIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch intent";
      });
  },
});

export default querySlice.reducer;
