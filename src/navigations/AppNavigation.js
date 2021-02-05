//import node_modules
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

//import components
import {OnboardingScreen} from '../screens/Onboarding';
import MainNavigation from './MainNavigation';

const AppNavigation = () => {
  const [firstOpenApp] = useState(false);
  return (
    <NavigationContainer>
      {firstOpenApp ? <OnboardingScreen /> : <MainNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigation;
