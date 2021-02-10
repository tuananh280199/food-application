import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SignUpScreen = () => {
  return (
    <View style={styles.flexContainer}>
      <Text>SignUp Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});

export {SignUpScreen};
