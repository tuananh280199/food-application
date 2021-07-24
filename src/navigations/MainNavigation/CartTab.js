//import node_modules
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

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
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.navigate(CART_SCREEN);
    });

    return unsubscribe;
  }, [navigation]);

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
    </Stack.Navigator>
  );
};

export default CartTab;
