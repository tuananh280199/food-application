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
  updateOrderStatus: async (id) => {
    return await axios.put(`/order/update-status/${id}`, {
      status: 'Huỷ Đơn Hàng',
      user_id: -1,
    });
  },
  getLastOrderStatusByUserId: async (uid) => {
    return await axios.get(`/order/get-last-order-status-by-user/${uid}`);
  },
};

export default orderAPI;
