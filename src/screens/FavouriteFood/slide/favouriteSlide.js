import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import productAPI from '../../../services/product';

const initState = {
  favouriteFood: {
    list: [],
    page: 1,
    hasNext: false,
  },
};

export const fetchFavouriteFood = createAsyncThunk(
  'favourite/fetchFavourite',
  async (params) => {
    const {page, uid, isLoadMore = false} = params;
    try {
      const result = await productAPI.getFavouriteProduct(uid, page);
      return {
        result,
        isLoadMore,
      };
    } catch (e) {
      throw e;
    }
  },
);

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState: initState,
  reducers: {
    addFavouriteFood(state, action) {
      const {data} = action.payload;
      state.favouriteFood.list = state.favouriteFood.list.push(data);
    },
    deleteFavouriteFood(state, action) {
      const {product_id} = action.payload;
      state.favouriteFood.list = state.favouriteFood.list.filter(
        (o) => o.id !== product_id,
      );
    },
  },
  extraReducers: {
    [fetchFavouriteFood.fulfilled]: (state, action) => {
      const {result, isLoadMore} = action.payload;
      const currentList = isLoadMore
        ? state.favouriteFood.list.concat(result.data)
        : result.data;
      const hasNext = result.hasNext;
      const page = result.page;
      state.favouriteFood = {
        list: currentList,
        hasNext,
        page,
      };
    },
  },
});

export const {addFavouriteFood, deleteFavouriteFood} = favouriteSlice.actions;

export default favouriteSlice.reducer;
