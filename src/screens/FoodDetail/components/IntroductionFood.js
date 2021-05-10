import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {DriveWidth} from '../../../constants/Dimensions';

const IntroductionFood = (props) => {
  const {product} = props;
  return (
    <ScrollView
      style={styles.flexContainer}
      showsVerticalScrollIndicator={false}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.dadText}>Xuất xứ : </Text>
        <Text style={styles.subText}>{product?.origin}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.dadText}>Đơn vị tính : </Text>
        <Text style={styles.subText}>{product?.unit}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.dadText}>Định lượng : </Text>
        <Text style={styles.subText}>{product?.quantitative}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.dadText}>Thành phần : </Text>
        <Text
          style={[styles.subText, {paddingRight: 50}]}
          numberOfLines={2}
          ellipsizeMode={'tail'}>
          {product?.ingredient}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.dadText}>Ghi chú : </Text>
        <Text
          style={[styles.subText, {paddingRight: 50}]}
          numberOfLines={2}
          ellipsizeMode={'tail'}>
          {product?.note}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    paddingTop: 10,
  },
  dadText: {
    width: DriveWidth * 0.25,
    fontSize: 14,
    fontWeight: '500',
  },
  subText: {
    width: DriveWidth * 0.75,
    fontSize: 14,
  },
});

export {IntroductionFood};
