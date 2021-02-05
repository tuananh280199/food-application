import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ContactScreen = () => {
  return (
    <View style={styles.flexContainer}>
      <Text>Contact Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});

export {ContactScreen};
