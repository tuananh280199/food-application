import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StatusBar} from 'react-native';
import AppNavigation from './src/navigations/AppNavigation';

const App = () => {
  return (
    <View style={styles.flexContainer}>
      <StatusBar barStyle="dark-content" />
      <AppNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});

export default App;
