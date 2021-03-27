import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import productAPI from '../../../services/product';

const initState = {
  listFood: {
    list: [],
    page: 1,
    hasNext: false,
  },
};

export const fetchListFoodByCategory = createAsyncThunk(
  'list_food/fetchListFoodByCategory',
  async (params) => {
    const {page, category_id, filter, isLoadMore = false} = params;
    try {
      const result = await productAPI.getListFoodByCategory(
        category_id,
        page,
        filter,
      );
      return {
        result,
        isLoadMore,
      };
    } catch (e) {
      throw e;
    }
  },
);

export const fetchListHotFood = createAsyncThunk(
  'list_food/fetchListHotFood',
  async (params) => {
    const {page, filter, isLoadMore = false} = params;
    try {
      const result = await productAPI.getMoreHotProduct(page, filter);
      return {
        result,
        isLoadMore,
      };
    } catch (e) {
      throw e;
    }
  },
);

const listFoodSlice = createSlice({
  name: 'list_food',
  initialState: initState,
  reducers: {},
  extraReducers: {
    [fetchListFoodByCategory.fulfilled]: (state, action) => {
      const {result, isLoadMore} = action.payload;
      const currentList = isLoadMore
        ? state.listFood.list.concat(result.data)
        : result.data;
      const hasNext = result.hasNext;
      const page = result.page;
      state.listFood = {
        list: currentList,
        hasNext,
        page,
      };
    },
    [fetchListHotFood.fulfilled]: (state, action) => {
      const {result, isLoadMore} = action.payload;
      const currentList = isLoadMore
        ? state.listFood.list.concat(result.data)
        : result.data;
      const hasNext = result.hasNext;
      const page = result.page;
      state.listFood = {
        list: currentList,
        hasNext,
        page,
      };
    },
  },
});

export default listFoodSlice.reducer;
