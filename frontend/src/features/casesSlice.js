import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cases: [],
};

export const casesSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {
    setCases: {
      reducer: (state, action) => {
        state.cases = action.payload;
      },
      prepare: data => {
        return {
          payload: data,
        };
      },
    },
  },
});

export const { setCases } = casesSlice.actions;
