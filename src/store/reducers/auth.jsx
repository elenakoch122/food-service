import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: JSON.parse(localStorage.getItem('users')) || [],
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || {
    login: '',
    password: '',
    isAgree: false,
  },
  isAuthorized: JSON.parse(localStorage.getItem('isAuthorized')) || false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { name, value } = action.payload;
      state.currentUser[name] = value;      
    },

    setAuth: (state, action) => {
      state.isAuthorized = action.payload;
      localStorage.setItem('isAuthorized', action.payload);
    },

    removeCurrentUser: (state) => {
      state.currentUser.login = '';
      state.currentUser.password = '';
      state.currentUser.isAgree = false;
      localStorage.removeItem('currentUser');
    },
  }
});

export const { setUser, setAuth, removeCurrentUser } = authSlice.actions;

export default authSlice.reducer;