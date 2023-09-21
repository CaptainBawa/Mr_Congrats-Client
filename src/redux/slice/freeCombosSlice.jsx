import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  freeCombos: [],
  status: 'idle',
  error: null,
};

export const fetchFreeCombos = createAsyncThunk('freeCombos/fetchFreeCombos', async () => {
  try {
    const response = await axios.get('http://localhost:3000/free_combos');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch free combos');
  }
});

export const createFreeCombo = createAsyncThunk('freeCombos/createFreeCombo', async (freeComboData) => {
  try {
    const response = await axios.post('http://localhost:3000/free_combos', freeComboData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create a free combo');
  }
});

export const deleteFreeCombo = createAsyncThunk('freeCombos/deleteFreeCombo', async (freeComboId) => {
  try {
    await axios.delete(`http://localhost:3000/free_combos/${freeComboId}`);
    return freeComboId;
  } catch (error) {
    throw new Error('Failed to delete a free combo');
  }
});

export const updateFreeCombo = createAsyncThunk('freeCombos/updateFreeCombo', async (freeComboData) => {
  try {
    const { id, ...updatedData } = freeComboData;
    const response = await axios.put(`http://localhost:3000/free_combos/${id}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update the free combo');
  }
});

const freeCombosSlice = createSlice({
  name: 'freeCombos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFreeCombos.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchFreeCombos.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        freeCombos: action.payload,
      }))
      .addCase(fetchFreeCombos.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(createFreeCombo.fulfilled, (state, action) => {
        state.freeCombos.push(action.payload);
      })
      .addCase(deleteFreeCombo.fulfilled, (state, action) => ({
        ...state,
        freeCombos: state.freeCombos.filter((freeCombo) => freeCombo.id !== action.payload),
      }))
      .addCase(updateFreeCombo.fulfilled, (state, action) => ({
        ...state,
        freeCombos: state.freeCombos.map((freeCombo) => {
          if (freeCombo.id === action.payload.id) {
            return action.payload;
          }
          return freeCombo;
        }),

      }));
  },
});

export default freeCombosSlice.reducer;

export const selectFreeCombos = (state) => state.freeCombos.freeCombos;
export const selectFreeCombosStatus = (state) => state.freeCombos.status;
export const selectFreeCombosError = (state) => state.freeCombos.error;
