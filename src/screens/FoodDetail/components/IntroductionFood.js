import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const IntroductionFood = () => {
  return (
    <View style={styles.flexContainer}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.dadText}>Xuất xứ : </Text>
        <Text style={styles.subText}>Hà Nội Food</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.dadText}>Đơn vị tính : </Text>
        <Text style={styles.subText}>Suất</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.dadText}>Định lượng : </Text>
        <Text style={styles.subText}>50 g/Suất</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.dadText}>Thành phần : </Text>
        <Text
          style={[styles.subText, {paddingRight: 100}]}
          numberOfLines={2}
          ellipsizeMode={'tail'}>
          Thịt bò, bánh phở, xà lách, rau húng, mắm chua cay mặn ngọt
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.dadText}>Ghi chú : </Text>
        <Text style={styles.subText}>
          Giao hàng miễn phí với đơn hàng từ 100k trở lên
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    paddingTop: 10,
  },
  dadText: {
    fontSize: 14,
    fontWeight: '500',
  },
  subText: {
    fontSize: 14,
  },
});

export {IntroductionFood};
