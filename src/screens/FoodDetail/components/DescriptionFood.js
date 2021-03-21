import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const DescriptionFood = (props) => {
  const {product} = props;
  return (
    <View style={styles.flexContainer}>
      <Text
        style={{
          fontSize: 14,
        }}>
        {product.description}
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
