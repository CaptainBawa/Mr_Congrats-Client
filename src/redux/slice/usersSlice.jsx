import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: [],
  status: 'idle',
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get('http://localhost:3000/current_user');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
});

export const createUser = createAsyncThunk('users/createUser', async (userData) => {
  try {
    const response = await axios.post('http://localhost:3000/current_user', userData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create a user');
  }
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  try {
    await axios.delete(`http://localhost:3000/current_user/${userId}`);
    return userId;
  } catch (error) {
    throw new Error('Failed to delete a user');
  }
});

export const updateUser = createAsyncThunk('users/updateUser', async (userData) => {
  try {
    const { id, ...updatedData } = userData;
    const response = await axios.put(`http://localhost:3000/current_user/${id}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update the user');
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchUsers.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        users: action.payload,
      }))
      .addCase(fetchUsers.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => ({
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      }))
      .addCase(updateUser.fulfilled, (state, action) => ({
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload.id) {
            return {
              ...user,
              ...action.payload,
            };
          }
          return user;
        }),
      }));
  },
});

export default usersSlice.reducer;

export const selectUsers = (state) => state.users.users;
export const selectUsersStatus = (state) => state.users.status;
export const selectUsersError = (state) => state.users.error;
