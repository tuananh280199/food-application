//import node_modules
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

//import screen
import {HomeScreen} from '../../screens/Home';
import {FoodDetail} from '../../screens/FoodDetail';
import {ListFood} from '../../screens/ListFood';

//import other
import {
  FOOD_DETAIL,
  HOME_SCREEN,
  LIST_FOOD,
} from '../../constants/StackNavigation';

const Stack = createStackNavigator();

const HomeTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#43bb6c',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        // headerShown: false,
      }}>
      <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen name={FOOD_DETAIL} component={FoodDetail} />
      <Stack.Screen name={LIST_FOOD} component={ListFood} />
    </Stack.Navigator>
  );
};

export default HomeTab;
