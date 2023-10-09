import { createSlice } from '@reduxjs/toolkit';

const storedAuthState = JSON.parse(sessionStorage.getItem('authState'));

const initialState = {
  isAuthenticated: storedAuthState || false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => ({
      ...state,
      isAuthenticated: true,
      user: action.payload,
    }),
    logout: (state) => ({
      ...state,
      isAuthenticated: false,
    }),
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
