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
  getHintProductHomeScreen: () => {
    return axios.get('/product/get-hint-product');
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
  getFavouriteProduct: async (uid, page) => {
    const data = await axios.get(
      `/product/favorite-product/${uid}?page=${page}`,
    );
    return data;
  },
  addFavouriteProduct: async (uid, product_id) => {
    const data = await axios.post('/product/favorite-product', {
      user_id: uid,
      product_id: product_id,
    });
    return data;
  },
  deleteFavouriteProduct: (uid, product_id) => {
    return axios.delete(`/product/favorite-product/${uid}/${product_id}`);
  },
  getNumberFavouriteProduct: async (uid) => {
    const data = await axios.get(`/product/count-favorite-product/${uid}`);
    return data;
  },
};

export default productAPI;
