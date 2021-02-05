//import node_modules
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

//import screen
import {HomeScreen} from '../../screens/Home';

//import other
import {HOME_SCREEN} from '../../constants/StackNavigation';

const Stack = createStackNavigator();

const HomeTab = () => {
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
      <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeTab;
