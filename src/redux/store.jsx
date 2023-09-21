import { configureStore } from '@reduxjs/toolkit';
import predictionsReducer from './slice/predictionsSlice';
import freeCombosReducer from './slice/freeCombosSlice';

const store = configureStore({
  reducer: {
    freeCombos: freeCombosReducer,
    predictions: predictionsReducer,
  },
});
export default store;
