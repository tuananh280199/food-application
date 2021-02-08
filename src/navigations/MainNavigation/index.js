//import node_modules
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

//import navigator
import HomeTab from './HomeTab';
import CartTab from './CartTab';
import ContactTab from './ContactTab';
import ProfileUserTab from './ProfileUserTab';

//import other
import {
  HOME_NAVIGATION,
  CART_NAVIGATION,
  CONTACT_NAVIGATION,
  PROFILE_USER_NAVIGATION,
} from '../../constants/StackNavigation';
import {TabActiveLine} from '../../constants/TabActiveLine';

const BottomTabBar = createBottomTabNavigator();

const IconTabHome = ({color, focused, size}) => (
  <>
    <Ionicons
      color={color}
      size={size}
      name={focused ? 'home' : 'home-outline'}
    />
    <TabActiveLine focused={focused} color={color} />
  </>
);

const IconTabCart = ({color, focused, size}) => (
  <>
    <MaterialCommunityIcons
      color={color}
      size={size}
      name={focused ? 'cart' : 'cart-outline'}
    />
    <TabActiveLine focused={focused} color={color} />
  </>
);

const IconTabContact = ({color, focused, size}) => (
  <>
    <Entypo
      color={color}
      size={size}
      name={focused ? 'old-phone' : 'old-phone'}
    />
    <TabActiveLine focused={focused} color={color} />
  </>
);

const IconTabProfileUser = ({color, focused, size}) => (
  <>
    <FontAwesome
      color={color}
      size={size}
      name={focused ? 'user-circle-o' : 'user-circle'}
    />
    <TabActiveLine focused={focused} color={color} />
  </>
);

const MainNavigation = () => {
  return (
    <BottomTabBar.Navigator>
      <BottomTabBar.Screen
        name={HOME_NAVIGATION}
        component={HomeTab}
        options={{
          tabBarIcon: IconTabHome,
        }}
      />
      <BottomTabBar.Screen
        name={CART_NAVIGATION}
        component={CartTab}
        options={{
          tabBarIcon: IconTabCart,
        }}
      />
      <BottomTabBar.Screen
        name={CONTACT_NAVIGATION}
        component={ContactTab}
        options={{
          tabBarIcon: IconTabContact,
        }}
      />
      <BottomTabBar.Screen
        name={PROFILE_USER_NAVIGATION}
        component={ProfileUserTab}
        options={{
          tabBarIcon: IconTabProfileUser,
        }}
      />
    </BottomTabBar.Navigator>
  );
};


export default MainNavigation;
