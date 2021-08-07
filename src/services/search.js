import axios from '../axios';

const searchAPI = {
  searchProductByName: async (keyWord, page) => {
    const data = await axios.get(
      `/product/search-by-name?product_name=${keyWord}&page=${page}`,
    );
    return data;
  },
  searchProductByType: async (type, page) => {
    const data = await axios.get(
      `/product/search-product-${type}?page=${page}`,
    );
    return data;
  },
  searchProductByPrice: async (range, page) => {
    const data = await axios.get(
      `/product/search-by-price?max_price=${range}&page=${page}`,
    );
    return data;
  },
};

export default searchAPI;
