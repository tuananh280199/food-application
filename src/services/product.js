import axios from '../axios';

const productAPI = {
  getHotProductHomeScreen: () => {
    return axios.get('/product/get-hot-product');
  },
  getListFoodByCategory: async (category_id, page) => {
    const data = await axios.get(
      `/product/get-product-by-category/${category_id}?page=${page}`,
    );
    return data;
  },
};

export default productAPI;
