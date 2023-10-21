import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import addTokenToHeaders from '../../components/JwtToken';

const initialState = {
  paidCombos: [],
  status: 'idle',
  error: null,
};

export const fetchPaidCombos = createAsyncThunk('paidCombos/fetchPaidCombos', async () => {
  try {
    const response = await axios.get('https://mr-congrats.fly.dev/paid_combos');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch paid combos');
  }
});

export const createPaidCombo = createAsyncThunk('paidCombos/createPaidCombo', async (paidComboData) => {
  try {
    const response = await axios.post('https://mr-congrats.fly.dev/paid_combos', paidComboData, addTokenToHeaders());
    return response.data;
  } catch (error) {
    throw new Error('Failed to create a paid combo');
  }
});

export const deletePaidCombo = createAsyncThunk('paidCombos/deletePaidCombo', async (paidComboId) => {
  try {
    await axios.delete(`https://mr-congrats.fly.dev/paid_combos/${paidComboId}`, addTokenToHeaders());
    return paidComboId;
  } catch (error) {
    throw new Error('Failed to delete a paid combo');
  }
});

export const updatePaidCombo = createAsyncThunk('paidCombos/updatePaidCombo', async (paidComboData) => {
  try {
    const { id, ...updatedData } = paidComboData;
    const response = await axios.put(`https://mr-congrats.fly.dev/paid_combos/${id}`, updatedData, addTokenToHeaders());
    return response.data;
  } catch (error) {
    throw new Error('Failed to update the paid combo');
  }
});

const paidCombosSlice = createSlice({
  name: 'paidCombos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaidCombos.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchPaidCombos.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        paidCombos: action.payload,
      }))
      .addCase(fetchPaidCombos.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(createPaidCombo.fulfilled, (state, action) => {
        state.paidCombos.push(action.payload);
      })
      .addCase(deletePaidCombo.fulfilled, (state, action) => ({
        ...state,
        paidCombos: state.paidCombos.filter((paidCombo) => paidCombo.id !== action.payload),
      }))
      .addCase(updatePaidCombo.fulfilled, (state, action) => ({
        ...state,
        paidCombos: state.paidCombos.map((paidCombo) => {
          if (paidCombo.id === action.payload.id) {
            return action.payload;
          }
          return paidCombo;
        }),

      }));
  },
});

export default paidCombosSlice.reducer;

export const selectPaidCombos = (state) => state.paidCombos.paidCombos;
export const selectPaidCombosStatus = (state) => state.paidCombos.status;
export const selectPaidCombosError = (state) => state.paidCombos.error;
