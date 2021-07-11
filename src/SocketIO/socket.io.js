import io from 'socket.io-client';
import Config from 'react-native-config';
import {store} from '../store';

const socket = io(Config.SOCKET_GATEWAY);

socket.authEmit = (event, payload) => {
  const token = store.getState().auth.token;
  return socket.emit(event, {...payload, token});
};

export default socket;
