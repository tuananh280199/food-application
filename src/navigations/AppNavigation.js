//import node_modules
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Snackbar from 'react-native-snackbar';
import PushNotification, {Importance} from 'react-native-push-notification';

//import navigation
import MainNavigation from './MainNavigation';

//import screens
import {OnboardingScreen} from '../screens/Onboarding';

//import other
import {
  CHANGE_PASSWORD,
  CHANGE_PROFILE_USER,
  FORGOT_PASSWORD,
  HOME_SCREEN,
  NEW_PASSWORD,
  ONBOARDING_SCREEN,
  OTP_VERIFY,
  SIGN_IN,
  SIGN_UP,
} from '../constants/StackNavigation';
import authAPI from '../services/auth';
import {getErrorMessage} from '../utils/HandleError';
import {setNewToken} from '../slices/authSlice';
import {setDeviceToken} from '../notifications/slice/notificationSlice';
import {SignInScreen} from '../screens/SignIn';
import {SignUpScreen} from '../screens/SignUp';
import {ChangePasswordScreen} from '../screens/ChangePassword';
import {ForgotPasswordScreen} from '../screens/ForgotPassword';
import {ChangeProfileScreen} from '../screens/ChangeProfileUser';
import {OTPVerify} from '../screens/OTPVerify';
import {NewPassword} from '../screens/ForgotPassword/NewPassword';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const dispatch = useDispatch();

  const firstIsLaunch = useSelector((state) => state.auth.firstIsLaunch);
  const refresh_token = useSelector(
    (state) => state.auth.profile?.refresh_token,
  );
  const token = useSelector((state) => state.auth.token);

  PushNotification.createChannel({
    channelId: 'default_notification_channel_id', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    playSound: true, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  });

  PushNotification.configure({
    onRegister: function (token) {
      // console.log('device token:', token);
      dispatch(setDeviceToken({token}));
    },

    onNotification: function (notification) {
      // console.log('NOTIFICATION:', notification);
      if (token !== '') {
        PushNotification.localNotification({
          /* Android Only Properties */
          channelId: 'default_notification_channel_id', // (required) channelId, if the channel doesn't exist, notification will not trigger.
          autoCancel: true, // (optional) default: true
          vibrate: true, // (optional) default: true
          vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000

          /* iOS and Android properties */
          title: notification.data.title, // (optional)
          message: notification.data.message, // (required)
          userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
          playSound: true,
          soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        });
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      }
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,

    requestPermissions: true,
  });

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
        <Stack.Screen name={SIGN_IN} component={SignInScreen} />
        <Stack.Screen name={SIGN_UP} component={SignUpScreen} />
        <Stack.Screen name={CHANGE_PASSWORD} component={ChangePasswordScreen} />
        <Stack.Screen name={FORGOT_PASSWORD} component={ForgotPasswordScreen} />
        <Stack.Screen
          name={CHANGE_PROFILE_USER}
          component={ChangeProfileScreen}
        />
        <Stack.Screen name={OTP_VERIFY} component={OTPVerify} />
        <Stack.Screen name={NEW_PASSWORD} component={NewPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
