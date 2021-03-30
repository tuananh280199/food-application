import {combineReducers} from 'redux';

import authSlice from '../slices/authSlice';
import listFoodByCategoryReducer from '../screens/ListFood/slice/listFoodSlice';
import searchReducer from '../screens/Search/slice/searchSlide';
import historySearchReducer from '../screens/Search/slice/historySearchSlice';
import favouriteReducer from '../screens/FavouriteFood/slide/favouriteSlide';
import cartReducer from '../screens/Cart/slice/cartSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  listFoodByCategory: listFoodByCategoryReducer,
  search: searchReducer,
  historySearch: historySearchReducer,
  favourite: favouriteReducer,
  cart: cartReducer,
});

export default rootReducer;
