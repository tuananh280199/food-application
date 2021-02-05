import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.flexContainer}>
      <Text>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});

export {HomeScreen};
