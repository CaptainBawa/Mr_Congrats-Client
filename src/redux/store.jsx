import { configureStore } from '@reduxjs/toolkit';
import predictionsReducer from './slice/predictionsSlice';
import freeCombosReducer from './slice/freeCombosSlice';
import paidCombosReducer from './slice/paidCombosSlice';
import usersReducer from './slice/usersSlice';
import advertsReducer from './slice/advertsSlice';
import detailsReducer from './slice/detailsSlice';
import authReducer from './slice/authSlice';

const store = configureStore({
  reducer: {
    details: detailsReducer,
    adverts: advertsReducer,
    paidCombos: paidCombosReducer,
    freeCombos: freeCombosReducer,
    predictions: predictionsReducer,
    auth: authReducer,
    users: usersReducer,
  },
});
export default store;
