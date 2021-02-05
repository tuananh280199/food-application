import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const OnboardingScreen = () => {
  return (
    <View style={styles.flexContainer}>
      <Text>Onboarding</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});

export {OnboardingScreen};
