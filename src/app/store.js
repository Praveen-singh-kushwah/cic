import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import resultReducer from "../features/resultSlice";
import queryReducer from "../features/querySlice";


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    result: resultReducer,
    query: queryReducer,
  },
});
