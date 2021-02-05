//import node_modules
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

//import screen
import {ContactScreen} from '../../screens/Contact';

//import other
import {CONTACT_SCREEN} from '../../constants/StackNavigation';

const Stack = createStackNavigator();

const ContactTab = () => {
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
      <Stack.Screen name={CONTACT_SCREEN} component={ContactScreen} />
    </Stack.Navigator>
  );
};

export default ContactTab;
