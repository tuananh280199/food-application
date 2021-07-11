import React, {useEffect} from 'react';
import {Platform, NativeModules, AppState} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, {Importance} from 'react-native-push-notification';
import {store} from '../store';
import {useDispatch} from 'react-redux';
import {setDeviceToken} from './slice/notificationSlice';

PushNotification.configure({
  onRegister: function (token) {
    console.log('token:', token);
  },

  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,

  requestPermissions: true,
});

PushNotification.createChannel({
  channelId: 'default_notification_channel_id', // (required)
  channelName: 'My channel', // (required)
  channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
  playSound: false, // (optional) default: true
  soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
  importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
  vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
});

export const useNotifications = () => {
  const dispatch = useDispatch();
  const data = store.getState().notification.order;

  useEffect(() => {
    PushNotification.onNotification(handleNotification);
    if (Platform.OS === 'android') {
      NativeModules.RNPushNotification.getToken(handleRegisterDevice);
    }
    PushNotification.onRegister(handleRegisterDevice);
  }, []);

  const handleNotification = (notification) => {
    return PushNotification.localNotification({
      /* Android Only Properties */
      channelId: 'default_notification_channel_id', // (required) channelId, if the channel doesn't exist, notification will not trigger.
      autoCancel: true, // (optional) default: true
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000

      /* iOS and Android properties */
      title: data.title, // (optional)
      message: data.message, // (required)
      userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
      playSound: true,
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    });
  };

  const handleRegisterDevice = (token) => {
    dispatch(setDeviceToken({token}));
  };

  return null;
};
