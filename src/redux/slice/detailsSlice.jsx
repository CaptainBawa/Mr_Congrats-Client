import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import addTokenToHeaders from '../../components/JwtToken';

const initialState = {
  details: [],
  status: 'idle',
  error: null,
};

export const fetchDetails = createAsyncThunk('details/fetchDetails', async (predictionId) => {
  try {
    const response = await axios.get(`http://localhost:3000/predictions/${predictionId}/details`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch details');
  }
});

export const createDetail = createAsyncThunk('details/createDetail', async (detailData, predictionId) => {
  try {
    const response = await axios.post(`http://localhost:3000/predictions/${predictionId}/details/`, detailData, addTokenToHeaders());
    return response.data;
  } catch (error) {
    throw new Error('Failed to create a detail');
  }
});

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetails.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchDetails.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        details: action.payload,
      }))
      .addCase(fetchDetails.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(createDetail.fulfilled, (state, action) => {
        state.details.push(action.payload);
      });
  },
});

export default detailsSlice.reducer;

export const selectDetails = (state) => state.details.details;
export const selectDetailsStatus = (state) => state.details.status;
export const selectDetailsError = (state) => state.details.error;
