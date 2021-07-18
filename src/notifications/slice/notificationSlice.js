import {createSlice} from '@reduxjs/toolkit';
import socket from '../../SocketIO/socket.io';
import {ADD_DEVICE} from '../../SocketIO/constants';

const initState = {
  deviceToken: '',
  orderStatus: '',
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
    setOrderStatus(state, action) {
      const {status} = action.payload;
      state.orderStatus = status;
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

export const {setOrderStatus, setDeviceToken} = notificationSlice.actions;

export default notificationSlice.reducer;
