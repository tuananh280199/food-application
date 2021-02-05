//import node_modules
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

//import screen
import {ProfileUserScreen} from '../../screens/ProfileUser';

//import other
import {PROFILE_USER_SCREEN} from '../../constants/StackNavigation';

const Stack = createStackNavigator();

const ProfileUserTab = () => {
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
      <Stack.Screen name={PROFILE_USER_SCREEN} component={ProfileUserScreen} />
    </Stack.Navigator>
  );
};

export default ProfileUserTab;
