import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const DescriptionFood = () => {
  return (
    <View style={styles.flexContainer}>
      <Text
        style={{
          fontSize: 14,
        }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id leo
        suscipit, laoreet diam et, posuere leo. Phasellus at metus ac magna
        tristique condimentum. Aliquam semper eleifend diam at posuere. Nunc
        bibendum vestibulum ligula, id mollis metus.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    paddingTop: 10,
  },
});

export {DescriptionFood};
