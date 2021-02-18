import axios from '../axios/index';

const profileUserAPI = {
  changeProfileUser: (id, params) => {
    return axios.put(`/users/${id}`, {
      name: params.name,
      nickname: params.nickname,
      phone: params.phone,
      address: params.address,
      email: params.email,
    });
  },
};

export default profileUserAPI;
