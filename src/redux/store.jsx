import { configureStore } from '@reduxjs/toolkit';
import predictionsReducer from './slice/predictionsSlice';

const store = configureStore({
  reducer: {
    prediction: predictionsReducer,
  },
});
export default store;
