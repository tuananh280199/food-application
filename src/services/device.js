import axios from '../axios';

const deviceAPI = {
  deleteDevice: (uid, device_token) => {
    return axios.delete(
      `/device/delete-device/user/${uid}/device/${device_token}`,
    );
  },
};

export default deviceAPI;
