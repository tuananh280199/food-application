//import node_modules
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

//import screen
import {CartScreen} from '../../screens/Cart';

//import other
import {CART_SCREEN} from '../../constants/StackNavigation';

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
    </Stack.Navigator>
  );
};

export default CartTab;
