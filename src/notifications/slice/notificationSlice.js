import {createSlice} from '@reduxjs/toolkit';
import socket from '../../SocketIO/socket.io';
import {ADD_DEVICE} from '../../SocketIO/constants';

const initState = {
  deviceToken: '',
  orderStatus: {
    order_id: 0,
    status: '',
  },
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
      const {order} = action.payload;
      state.orderStatus = {
        order_id: order.order_id,
        status: order.status,
      };
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
