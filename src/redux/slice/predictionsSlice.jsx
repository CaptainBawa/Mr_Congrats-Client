import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  predictions: [],
  status: 'idle',
  error: null,
};

export const fetchPredictions = createAsyncThunk('predictions/fetchPredictions', async () => {
  try {
    const response = await axios.get('http://localhost:3000/predictions');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch predictions');
  }
});

export const createPrediction = createAsyncThunk('predictions/createPrediction', async (predictionData) => {
  try {
    const response = await axios.post('http://localhost:3000/predictions', predictionData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create a prediction');
  }
});

export const deletePrediction = createAsyncThunk('predictions/deletePrediction', async (predictionId) => {
  try {
    await axios.delete(`http://localhost:3000/predictions/${predictionId}`);
    return predictionId;
  } catch (error) {
    throw new Error('Failed to delete a prediction');
  }
});

const predictionsSlice = createSlice({
  name: 'predictions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPredictions.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchPredictions.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        predictions: action.payload,
      }))
      .addCase(fetchPredictions.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(createPrediction.fulfilled, (state, action) => {
        state.predictions.push(action.payload);
      })
      .addCase(deletePrediction.fulfilled, (state, action) => ({
        ...state,
        predictions: state.predictions.filter((prediction) => prediction.id !== action.payload),
      }));
  },
});

export default predictionsSlice.reducer;

export const selectPredictions = (state) => state.predictions.predictions;
export const selectPredictionsStatus = (state) => state.predictions.status;
export const selectPredictionsError = (state) => state.predictions.error;
