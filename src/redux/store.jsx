import { configureStore } from '@reduxjs/toolkit';
import predictionsReducer from './slice/predictionsSlice';

const store = configureStore({
  reducer: {
    predictions: predictionsReducer,
  },
});
export default store;
