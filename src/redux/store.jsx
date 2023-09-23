import { configureStore } from '@reduxjs/toolkit';
import predictionsReducer from './slice/predictionsSlice';
import freeCombosReducer from './slice/freeCombosSlice';
import paidCombosReducer from './slice/paidCombosSlice';
import usersReducer from './slice/usersSlice';

const store = configureStore({
  reducer: {
    paidCombos: paidCombosReducer,
    freeCombos: freeCombosReducer,
    predictions: predictionsReducer,
    users: usersReducer,
  },
});
export default store;
