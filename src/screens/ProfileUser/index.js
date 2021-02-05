import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProfileUserScreen = () => {
  return (
    <View style={styles.flexContainer}>
      <Text>ProfileUser Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});

export {ProfileUserScreen};
