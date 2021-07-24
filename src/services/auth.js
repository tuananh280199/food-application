import axios from '../axios';

const authAPI = {
  login: (params) => {
    return axios.post('/auth/login', {
      username: params.username,
      password: params.password,
    });
  },
  register: (params) => {
    return axios.post('/auth/register', {
      username: params.username,
      password: params.password,
    });
  },
  resetPassword: (id, params) => {
    return axios.put(`/auth/reset-password/${id}`, {
      passwordOld: params.passwordOld,
      passwordNew: params.passwordNew,
    });
  },
  refreshToken: (refresh_token) => {
    return axios.post('/auth/refresh-token', {
      refreshToken: refresh_token,
    });
  },
  checkExistsUser: (username) => {
    return axios.post('auth/check-exists-user', {
      username,
    });
  },
  forgotPassword: (id, passwordNew) => {
    return axios.put(`auth/forgot-password/${id}`, {
      passwordNew,
    });
  },
};

export default authAPI;
