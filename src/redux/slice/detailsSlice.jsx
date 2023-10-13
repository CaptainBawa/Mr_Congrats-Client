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

export const createDetail = createAsyncThunk('details/createDetail', async (detailData) => {
  try {
    const response = await axios.post('http://localhost:3000/details', detailData, addTokenToHeaders());
    return response.data;
  } catch (error) {
    throw new Error('Failed to create a detail');
  }
});

export const deleteDetail = createAsyncThunk('details/deleteDetail', async (detailId) => {
  try {
    await axios.delete(`http://localhost:3000/details/${detailId}`, addTokenToHeaders());
    return detailId;
  } catch (error) {
    throw new Error('Failed to delete a detail');
  }
});

export const updateDetail = createAsyncThunk('details/updateDetail', async (detailData) => {
  try {
    const { id, ...updatedData } = detailData;
    const response = await axios.put(`http://localhost:3000/details/${id}`, updatedData, addTokenToHeaders());
    return response.data;
  } catch (error) {
    throw new Error('Failed to update the detail');
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
      })
      .addCase(deleteDetail.fulfilled, (state, action) => ({
        ...state,
        details: state.details.filter((detail) => detail.id !== action.payload),
      }))
      .addCase(updateDetail.fulfilled, (state, action) => ({
        ...state,
        details: state.details.map((detail) => {
          if (detail.id === action.payload.id) {
            return {
              ...detail,
              ...action.payload,
            };
          }
          return detail;
        }),
      }));
  },
});

export default detailsSlice.reducer;

export const selectDetails = (state) => state.details.details;
export const selectDetailsStatus = (state) => state.details.status;
export const selectDetailsError = (state) => state.details.error;
