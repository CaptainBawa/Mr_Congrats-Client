import { configureStore } from '@reduxjs/toolkit';
import predictionsReducer from './slice/predictionsSlice';
import freeCombosReducer from './slice/freeCombosSlice';
import paidCombosReducer from './slice/paidCombosSlice';

const store = configureStore({
  reducer: {
    paidCombos: paidCombosReducer,
    freeCombos: freeCombosReducer,
    predictions: predictionsReducer,
  },
});
export default store;
