import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';

const DescriptionFood = (props) => {
  const {product} = props;
  return (
    <ScrollView
      style={styles.flexContainer}
      showsVerticalScrollIndicator={false}>
      <Text
        style={{
          fontSize: 14,
        }}>
        {product.description}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    paddingTop: 10,
  },
});

export {DescriptionFood};
