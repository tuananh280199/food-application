import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {DriveWidth} from '../../../constants/Dimensions';

type CategoryFoodProps = {
  name?: string,
  image?: string,
};

const CategoryFood = (props: CategoryFoodProps) => {
  const {name, image} = props;
  return (
    <View style={styles.container}>
      <View style={styles.absoluteView} />
      <View>
        <FastImage
          style={styles.image}
          source={{
            uri: image,
            priority: FastImage.priority.normal,
          }}
        />
        <Text style={styles.title}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: DriveWidth / 3 - 30,
    marginHorizontal: 10,
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
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 1,
  },
  title: {
    textAlign: 'center',
  },
});

export {CategoryFood};
