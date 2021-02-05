import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CartScreen = () => {
  return (
    <View style={styles.flexContainer}>
      <Text>Cart Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});

export {CartScreen};
