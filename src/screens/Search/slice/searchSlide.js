import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import searchAPI from '../../../services/search';

const initState = {
  food: {
    list: [],
    page: 1,
    hasNext: false,
  },
};

export const fetchDataSearchByName = createAsyncThunk(
  'search/searchByName',
  async (params) => {
    const {page, keyWord, isLoadMore = false} = params;
    try {
      const result = await searchAPI.searchProductByName(keyWord, page);
      return {
        result,
        isLoadMore,
      };
    } catch (e) {
      throw e;
    }
  },
);

export const fetchDataSearchByType = createAsyncThunk(
  'search/searchByType',
  async (params) => {
    const {page, type, isLoadMore = false} = params;
    try {
      const result = await searchAPI.searchProductByType(type, page);
      return {
        result,
        isLoadMore,
      };
    } catch (e) {
      throw e;
    }
  },
);

export const fetchDataSearchByPrice = createAsyncThunk(
  'search/searchByPrice',
  async (params) => {
    const {page, range, isLoadMore = false} = params;
    try {
      const result = await searchAPI.searchProductByPrice(range, page);
      return {
        result,
        isLoadMore,
      };
    } catch (e) {
      throw e;
    }
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState: initState,
  reducers: {},
  extraReducers: {
    [fetchDataSearchByName.fulfilled]: (state, action) => {
      const {result, isLoadMore} = action.payload;
      const currentList = isLoadMore
        ? state.food.list.concat(result.data)
        : result.data;
      const hasNext = result.hasNext;
      const page = result.page;
      state.food = {
        list: currentList,
        hasNext,
        page,
      };
    },
    [fetchDataSearchByType.fulfilled]: (state, action) => {
      const {result, isLoadMore} = action.payload;
      const currentList = isLoadMore
        ? state.food.list.concat(result.data)
        : result.data;
      const hasNext = result.hasNext;
      const page = result.page;
      state.food = {
        list: currentList,
        hasNext,
        page,
      };
    },
    [fetchDataSearchByPrice.fulfilled]: (state, action) => {
      const {result, isLoadMore} = action.payload;
      const currentList = isLoadMore
        ? state.food.list.concat(result.data)
        : result.data;
      const hasNext = result.hasNext;
      const page = result.page;
      state.food = {
        list: currentList,
        hasNext,
        page,
      };
    },
  },
});

export default searchSlice.reducer;
