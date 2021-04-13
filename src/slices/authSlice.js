import {createSlice} from '@reduxjs/toolkit';

const initState = {
  firstIsLaunch: true,
  token: '',
  profile: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    firstIsLaunch(state, action) {
      state.firstIsLaunch = action.payload;
    },
    login(state, action) {
      const {token, profile} = action.payload;
      state.token = token;
      state.profile = profile;
    },
    logout(state, action) {
      state.token = '';
      state.profile = {};
    },
    updateProfile(state, action) {
      const {profile} = action.payload;
      state.profile = profile;
    },
    setNewToken(state, action) {
      const {newToken} = action.payload;
      state.token = newToken;
    },
    // logout: () => initState,
  },
});

export const {
  firstIsLaunch,
  login,
  logout,
  updateProfile,
  setNewToken,
} = authSlice.actions;

export default authSlice.reducer;
