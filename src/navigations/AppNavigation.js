//import node_modules
import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//import navigation
import MainNavigation from './MainNavigation';

//import screens
import {OnboardingScreen} from '../screens/Onboarding';
import {SignInScreen} from '../screens/SignIn';
import {SignUpScreen} from '../screens/SignUp';

//import other
import {
  HOME_SCREEN,
  ONBOARDING_SCREEN,
  SIGN_IN,
  SIGN_UP,
} from '../constants/StackNavigation';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const firstIsLaunch = useSelector((state) => state.auth.firstIsLaunch);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {firstIsLaunch ? (
          <Stack.Screen
            name={ONBOARDING_SCREEN}
            component={OnboardingScreen}
            options={{
              headerShown: false,
            }}
          />
        ) : null}
        <Stack.Screen
          options={{
            headerShown: false,
            headerBackTitleVisible: false,
            headerLeft: null,
          }}
          name={HOME_SCREEN}
          component={MainNavigation}
        />
        <Stack.Screen name={SIGN_IN} component={SignInScreen} />
        <Stack.Screen name={SIGN_UP} component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
