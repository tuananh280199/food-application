import {combineReducers} from 'redux';

import authSlice from '../slices/authSlice';
import listFoodByCategoryReducer from '../screens/ListFood/slice/listFoodSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  listFoodByCategory: listFoodByCategoryReducer,
});

export default rootReducer;
