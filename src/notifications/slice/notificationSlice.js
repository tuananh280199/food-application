import {createSlice} from '@reduxjs/toolkit';
import socket from '../../SocketIO/socket.io';
import {ADD_DEVICE} from '../../SocketIO/constants';

const initState = {
  deviceToken: '',
  order: {},
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initState,
  reducers: {
    setDeviceToken(state, action) {
      const {token} = action.payload;
      return {
        ...state,
        deviceToken: token,
      };
    },
    updateOrderStatus(state, action) {
      const {data} = action.payload;
      state.order = {...data};
    },
  },
});

export const sendDeviceToken = (deviceToken) => async (dispatch, getState) => {
  const state = getState();
  socket.authEmit(ADD_DEVICE, {
    device_token: deviceToken.token,
    user_id: Number(state.auth.profile.id),
    type: deviceToken.os,
  });
};

export const {updateOrderStatus, setDeviceToken} = notificationSlice.actions;

export default notificationSlice.reducer;
