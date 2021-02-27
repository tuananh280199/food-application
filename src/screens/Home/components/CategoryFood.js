import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {DriveWidth} from '../../../constants/Dimensions';

type CategoryFoodProps = {
  title?: string,
};

const CategoryFood = (props: CategoryFoodProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.absoluteView} />
      <View>
        <FastImage
          style={styles.image}
          source={{
            uri:
              'https://raw.githubusercontent.com/yuliantosb/Supermart/master/assets/images/p2.png',
            priority: FastImage.priority.normal,
          }}
        />
        <Text style={styles.title}>Fruits And Vegetables</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: DriveWidth / 3 - 30,
    marginHorizontal: 10,
    justifyContent: 'center',
    marginBottom: 10,
  },
  absoluteView: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#d5f5e0',
    borderRadius: 10,
    width: DriveWidth / 3 - 30,
    height: DriveWidth / 3 - 60,
  },
  image: {
    width: DriveWidth / 3 - 30,
    height: DriveWidth / 3 - 30,
  },
  title: {
    textAlign: 'center',
  },
});

export {CategoryFood};
