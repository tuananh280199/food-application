import {combineReducers} from 'redux';

import authSlice from '../slices/authSlice';
import listFoodByCategoryReducer from '../../src/screens/ListFood/slice/listFoodByCategorySlice';

const rootReducer = combineReducers({
  auth: authSlice,
  listFoodByCategory: listFoodByCategoryReducer,
});

export default rootReducer;
