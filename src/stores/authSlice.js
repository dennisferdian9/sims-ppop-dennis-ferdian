import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.email = '';
      state.token = '';
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
