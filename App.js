import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const App = () => {
  return (
    <View style={styles.flexContainer}>
      <Text>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});

export default App;
