import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type RatingProps = {
  rating?: any,
  maxRate?: number,
  size?: number,
  styleContainer?: any,
  styleTitle?: any,
  like?: number,
  dislike: number,
};

const Rating = (props: RatingProps) => {
  const {
    rating,
    maxRate,
    size,
    styleContainer,
    styleTitle,
    like,
    dislike,
  } = props;

  const [stars, setStars] = useState([]);

  useEffect(() => {
    const listStar = [];
    const fullStar = Math.floor(rating);
    const noStar = Math.floor(maxRate - rating);
    const halfStar = maxRate - fullStar - noStar;

    //Full Star
    for (let i = 0; i < fullStar; i++) {
      const star = (
        <Ionicons key={`full-${i}`} name={'star'} size={size} color={'gold'} />
      );
      listStar.push(star);
    }

    //Half Star
    for (let i = 0; i < halfStar; i++) {
      const star = (
        <Ionicons
          key={`half-${i}`}
          name={'star-half-outline'}
          size={size}
          color={'gold'}
        />
      );
      listStar.push(star);
    }

    //No Star
    for (let i = 0; i < noStar; i++) {
      const star = (
        <Ionicons
          key={`empty-${i}`}
          name={'star-outline'}
          size={size}
          color={'#d9d9d9'}
        />
      );
      listStar.push(star);
    }

    setStars(listStar);
  }, [size, rating, maxRate]);

  return (
    <View style={[styles.flexContainer, styleContainer]}>
      {stars}
      <Text style={styleTitle}>{`(từ ${like + dislike} votes)`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export {Rating};
