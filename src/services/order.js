import axios from '../axios';

const orderAPI = {
  getOrderHistory: async (uid, page) => {
    const data = await axios.get(`/order/${uid}?page=${page}`);
    return data;
  },
  getNumberOrder: async (uid) => {
    const data = await axios.get(`/order/count-order/${uid}`);
    return data;
  },
};

export default orderAPI;
