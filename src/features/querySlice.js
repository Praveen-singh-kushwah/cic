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

      return {
        labels: [response.data.prediction], // FastAPI returns { input_text, prediction }
        input_text: response.data.input_text,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || "Failed to fetch intent");
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
        state.result = null;
      })
      .addCase(fetchQueryIntent.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(fetchQueryIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default querySlice.reducer;
