import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import addTokenToHeaders from '../../components/JwtToken';

const initialState = {
  adverts: [],
  status: 'idle',
  error: null,
};

export const fetchAdverts = createAsyncThunk('adverts/fetchAdverts', async () => {
  try {
    const response = await axios.get('https://mr-congrats.fly.dev/adverts');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch adverts');
  }
});

export const createAdvert = createAsyncThunk('adverts/createAdvert', async (advertData) => {
  try {
    const response = await axios.post('https://mr-congrats.fly.dev/adverts', advertData, addTokenToHeaders());
    return response.data;
  } catch (error) {
    throw new Error('Failed to create an advert');
  }
});

export const deleteAdvert = createAsyncThunk('adverts/deleteAdvert', async (advertId) => {
  try {
    await axios.delete(`https://mr-congrats.fly.dev/adverts/${advertId}`, addTokenToHeaders());
    return advertId;
  } catch (error) {
    throw new Error('Failed to delete an advert');
  }
});

const advertsSlice = createSlice({
  name: 'adverts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdverts.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchAdverts.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        adverts: action.payload,
      }))
      .addCase(fetchAdverts.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(createAdvert.fulfilled, (state, action) => {
        state.adverts.push(action.payload);
      })
      .addCase(deleteAdvert.fulfilled, (state, action) => ({
        ...state,
        adverts: state.adverts.filter((advert) => advert.id !== action.payload),
      }));
  },
});

export default advertsSlice.reducer;

export const selectAdverts = (state) => state.adverts.adverts;
export const selectAdvertStatus = (state) => state.adverts.status;
export const selectAdvertError = (state) => state.adverts.error;
