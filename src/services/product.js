import axios from '../axios';

const productAPI = {
  getHotProductHomeScreen: () => {
    return axios.get('/product/get-hot-product');
  },
  getMoreHotProduct: async (page, filter) => {
    const data = await axios.get(
      `/product/get-more-hot-product/${filter}?page=${page}`,
    );
    return data;
  },
  getListFoodByCategory: async (category_id, page, filter) => {
    const data = await axios.get(
      `/product/get-product-by-category/${category_id}/${filter}?page=${page}`,
    );
    return data;
  },
  getDetailProduct: async (product_id) => {
    const data = await axios.get(`/product/get-detail-product/${product_id}`);
    return data;
  },
};

export default productAPI;
