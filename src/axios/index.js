import axios from 'axios';
import queryString from 'query-string';
import Config from 'react-native-config';
import {store} from '../store';

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
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  },
);

export default axiosClient;
