import {createSlice} from '@reduxjs/toolkit';
import {union} from 'lodash';

const initState = {
  listKeyWord: [],
};

const historySearchSlice = createSlice({
  name: 'historySearch',
  initialState: initState,
  reducers: {
    setListKeyWordSearch(state, action) {
      const {data} = action.payload;
      state.listKeyWord = union(state.listKeyWord, data);
    },
    deleteHistorySearch: () => initState,
  },
});

export const {
  setListKeyWordSearch,
  deleteHistorySearch,
} = historySearchSlice.actions;

export default historySearchSlice.reducer;
