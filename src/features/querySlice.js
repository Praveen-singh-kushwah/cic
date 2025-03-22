import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";
const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY; // Replace with a valid key


export const fetchQueryIntent = createAsyncThunk(
  "query/fetchQueryIntent",
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        API_URL,
        {
          inputs: userInput,
          parameters: {
            candidate_labels: ["Order Inquiry", "Complaint", "Refund Request", "General Inquiry", "Technical Support"]
          }
        },
        { headers: { Authorization: `Bearer ${API_KEY}` } }
      );


      console.log("API Response:", response.data); // Debugging log


      return response.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "API Error");
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
        state.result = null;  // Reset result on new query
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
