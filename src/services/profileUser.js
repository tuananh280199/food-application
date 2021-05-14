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
  // uploadAvatar: (id, file) => {
  //   return axios({
  //     method: 'put',
  //     url: `files/public/${id}`,
  //     data: file,
  //     headers: {'Content-Type': 'multipart/form-data'},
  //   });
  // },
  uploadAvatar: (id, url) => {
    return axios.put(`/files/public/${id}`, {url});
  },
};

export default profileUserAPI;
