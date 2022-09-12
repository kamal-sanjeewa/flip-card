import {createSlice} from '@reduxjs/toolkit';

export type InitialStepCountState = {
  count: number;
};

const initialState: InitialStepCountState = {
  count: 0,
};

const stepCounterSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    increment: (state) => {
      console.log('increment');
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
  },
  extraReducers: {},
});

export const {increment, decrement, reset} = stepCounterSlice.actions;

export default stepCounterSlice.reducer;
