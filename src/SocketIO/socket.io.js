import io from 'socket.io-client';
import Config from 'react-native-config';
import {store} from '../store';
import {SERVER_SEND_STATUS} from './constants';
import {setOrderStatus} from '../notifications/slice/notificationSlice';

const socket = io(Config.SOCKET_GATEWAY);

socket.on(SERVER_SEND_STATUS, (data) => {
  // console.log('SERVER_SEND_STATUS: ', data);
  const token = store.getState().auth.token;
  const orderStatus = store.getState().notification.orderStatus;
  // console.log(token, orderStatus);
  if (orderStatus.order_id === data?.order_id && token !== '') {
    // console.log({
    //   order: {
    //     order_id: data?.order_id,
    //     status: data?.status,
    //   },
    // });
    store.dispatch(
      setOrderStatus({
        order: {
          order_id: data?.order_id,
          status: data?.status,
        },
      }),
    );
  }
});

socket.authEmit = (event, payload) => {
  const token = store.getState().auth.token;
  return socket.emit(event, {...payload, token});
};

export default socket;
