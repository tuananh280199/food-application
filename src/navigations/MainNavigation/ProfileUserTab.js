//import node_modules
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

//import screen
import {ProfileUserScreen} from '../../screens/ProfileUser';

//import other
import {
  CHANGE_PASSWORD,
  CHANGE_PROFILE_USER,
  FORGOT_PASSWORD,
  PROFILE_USER_SCREEN,
  SIGN_IN,
  SIGN_UP,
} from '../../constants/StackNavigation';
import {SignInScreen} from '../../screens/SignIn';
import {SignUpScreen} from '../../screens/SignUp';
import {ChangePasswordScreen} from '../../screens/ChangePassword';
import {ForgotPasswordScreen} from '../../screens/ForgotPassword';
import {ChangeProfileScreen} from '../../screens/ChangeProfileUser';

const Stack = createStackNavigator();

const ProfileUserTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={PROFILE_USER_SCREEN} component={ProfileUserScreen} />
      <Stack.Screen name={SIGN_IN} component={SignInScreen} />
      <Stack.Screen name={SIGN_UP} component={SignUpScreen} />
      <Stack.Screen name={CHANGE_PASSWORD} component={ChangePasswordScreen} />
      <Stack.Screen name={FORGOT_PASSWORD} component={ForgotPasswordScreen} />
      <Stack.Screen
        name={CHANGE_PROFILE_USER}
        component={ChangeProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileUserTab;
