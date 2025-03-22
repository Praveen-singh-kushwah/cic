import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  classificationResults: [] // This will hold an array of objects, e.g.:
  // [ { text: "Customer query", predictedIntent: "Refund Request" }, ... ]
};


const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setClassificationResults: (state, action) => {
      state.classificationResults = action.payload;
    },
    clearClassificationResults: (state) => {
      state.classificationResults = [];
    }
  },
});


export const { setClassificationResults, clearClassificationResults } = resultSlice.actions;
export default resultSlice.reducer;


