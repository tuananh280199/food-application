import axios from '../axios/index';

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
};

export default authAPI;
