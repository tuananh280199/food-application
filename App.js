import React from 'react';
import {StatusBar} from 'react-native';
import AppNavigation from './src/navigations/AppNavigation';
import {persistor, store} from './src/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
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
