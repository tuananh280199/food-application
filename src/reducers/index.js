import {combineReducers} from 'redux';

import authSlice from '../slices/authSlice';
import listFoodByCategoryReducer from '../screens/ListFood/slice/listFoodSlice';
import searchReducer from '../screens/Search/slice/searchSlide';
import historySearchReducer from '../screens/Search/slice/historySearchSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  listFoodByCategory: listFoodByCategoryReducer,
  search: searchReducer,
  historySearch: historySearchReducer,
});

export default rootReducer;
