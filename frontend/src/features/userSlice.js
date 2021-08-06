import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  refreshToken: null,
  accessToken: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: {
      reducer: (state, action) => {
        state.userData = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      },
      prepare: data => {
        return { payload: data };
      },
    },
    setUserData: {
      reducer: (state, action) => {
        state.userData = action.payload;
      },
      prepare: data => {
        return {
          payload: data,
        };
      },
    },
    resetUser: state => {
      state.userData = initialState.userData;
      state.accessToken = initialState.accessToken;
      state.refreshToken = initialState.refreshToken;
    },
  },
});

export const { setUser, resetUser, setUserData } = userSlice.actions;
