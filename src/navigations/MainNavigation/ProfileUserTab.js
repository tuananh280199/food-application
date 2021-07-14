//import node_modules
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

//import screen
import {ProfileUserScreen} from '../../screens/ProfileUser';

//import other
import {
  PROFILE_USER_SCREEN,
  FAVOURITE_FOOD,
  ORDER_HISTORY,
  PAYMENT,
  FOOD_DETAIL_FAVOURITE,
} from '../../constants/StackNavigation';
import {FavouriteFoodScreen} from '../../screens/FavouriteFood';
import {OrderHistoryScreen} from '../../screens/OrderHistory';
import {PaymentScreen} from '../../screens/Payment';
import {FoodDetail} from '../../screens/FoodDetail';

const Stack = createStackNavigator();

const ProfileUserTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={PROFILE_USER_SCREEN} component={ProfileUserScreen} />
      <Stack.Screen name={FAVOURITE_FOOD} component={FavouriteFoodScreen} />
      <Stack.Screen name={ORDER_HISTORY} component={OrderHistoryScreen} />
      <Stack.Screen name={PAYMENT} component={PaymentScreen} />
      <Stack.Screen name={FOOD_DETAIL_FAVOURITE} component={FoodDetail} />
    </Stack.Navigator>
  );
};

export default ProfileUserTab;
