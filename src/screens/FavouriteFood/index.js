import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const FavouriteFoodScreen = () => {
  return (
    <View style={styles.flexContainer}>
      <Text>Favourite Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});

export {FavouriteFoodScreen};
