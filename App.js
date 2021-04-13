import React, {useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';
import AppNavigation from './src/navigations/AppNavigation';
import {persistor, store} from './src/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import LottieView from 'lottie-react-native';

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const data = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(data);
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <LottieView
          source={require('./src/assets/31979-fast-food.json')}
          autoPlay
          loop
        />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="light-content" />
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
