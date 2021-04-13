//import node_modules
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Snackbar from 'react-native-snackbar';

//import navigation
import MainNavigation from './MainNavigation';

//import screens
import {OnboardingScreen} from '../screens/Onboarding';

//import other
import {HOME_SCREEN, ONBOARDING_SCREEN} from '../constants/StackNavigation';
import authAPI from '../services/auth';
import {getErrorMessage} from '../utils/HandleError';
import {setNewToken} from '../slices/authSlice';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const dispatch = useDispatch();

  const firstIsLaunch = useSelector((state) => state.auth.firstIsLaunch);
  const refresh_token = useSelector(
    (state) => state.auth.profile?.refresh_token,
  );

  useEffect(() => {
    const refresh = setTimeout(() => {
      refreshToken();
    }, 600000); //10 phut
    return () => clearTimeout(refresh);
  });

  const refreshToken = async () => {
    try {
      if (refresh_token) {
        const newToken = await authAPI.refreshToken(refresh_token);
        dispatch(setNewToken({newToken: newToken.token}));
      }
    } catch (e) {
      Snackbar.show({
        text: getErrorMessage(e),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'rgba(245, 101, 101, 1)',
      });
    }
  };

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
