import {createSlice} from '@reduxjs/toolkit';

const initState = {
  firstIsLaunch: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    firstIsLaunch(state, action) {
      state.firstIsLaunch = action.payload;
    },
  },
});

export const {firstIsLaunch} = authSlice.actions;

export default authSlice.reducer;
