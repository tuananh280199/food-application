import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const PaymentScreen = () => {
  return (
    <View style={styles.flexContainer}>
      <Text>Payment Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});

export {PaymentScreen};
