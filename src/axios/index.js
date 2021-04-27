import axios from 'axios';
import queryString from 'query-string';
import Config from 'react-native-config';
import {store} from '../store';
import {logout} from '../slices/authSlice';

const axiosClient = axios.create({
  baseURL: Config.API_SERVER,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
  timeout: 60000,
});

axiosClient.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    config.headers.authorization =
      `Bearer ${store.getState().auth.token}` || '';
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return {
        ...response.data,
        status: response.status,
      };
    }
    return response;
  },
  (error) => {
    // Handle errors
    if (error.response?.status === 500) {
      return Promise.reject(error);
    }
    if (
      error.response?.status === 403 &&
      error.response?.data?.name === 'TokenExpiredError'
    ) {
      store.dispatch(logout());
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
