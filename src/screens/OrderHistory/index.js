import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const OrderHistoryScreen = () => {
  return (
    <View style={styles.flexContainer}>
      <Text>Order History Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});

export {OrderHistoryScreen};
