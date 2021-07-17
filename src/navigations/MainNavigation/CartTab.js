//import node_modules
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

//import screen
import {CartScreen} from '../../screens/Cart';
import {Checkout} from '../../screens/Checkout';
import {VoucherScreen} from '../../screens/Voucher';
import {TrackOrder} from '../../screens/TrackOrder';
import {ConfirmOrder} from '../../screens/ConfirmOrder';

//import other
import {
  CART_SCREEN,
  CHECKOUT,
  CONFIRM_ORDER,
  TRACK_ORDER,
  VOUCHER,
} from '../../constants/StackNavigation';

const Stack = createStackNavigator();

const CartTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        // headerShown: false,
      }}>
      <Stack.Screen name={CART_SCREEN} component={CartScreen} />
      <Stack.Screen name={CHECKOUT} component={Checkout} />
      <Stack.Screen name={VOUCHER} component={VoucherScreen} />
      <Stack.Screen name={CONFIRM_ORDER} component={ConfirmOrder} />
      <Stack.Screen name={TRACK_ORDER} component={TrackOrder} />
    </Stack.Navigator>
  );
};

export default CartTab;
