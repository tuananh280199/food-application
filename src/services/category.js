import axios from '../axios';

const categoryAPI = {
  getCategoryHomeScreen: () => {
    return axios.get('/category');
  },
};

export default categoryAPI;
