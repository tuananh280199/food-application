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
  sendOrder: async (uid, shipping, payment_id, products) => {
    const data = await axios.post('/order/send-order', {
      data: {
        user_id: uid,
        shipping,
        payment_id,
        products,
      },
    });
    return data;
  },
  getVoucher: async () => {
    const data = await axios.get('/order/get-voucher');
    return data;
  },
};

export default orderAPI;
