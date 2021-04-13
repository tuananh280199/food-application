//import node_modules
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';

//others
import {DriveWidth} from '../../../constants/Dimensions';
import {Rating} from '../../../components/Rating';
import {roundHalfRate} from '../../../utils/RoundHalfRate';
import {convertDate} from '../../../utils/convertDate';

type OrderHistoryItemProps = {
  date?: number,
  totalPrice?: number,
  paymentMethod?: string,
  status?: string,
  shipAddress?: string,
};

const OrderHistoryItem = (props: OrderHistoryItemProps) => {
  const {date, totalPrice, paymentMethod, status, shipAddress} = props;

  return (
    <View style={styles.flexContainer}>
      <View style={styles.innerItems}>
        <Text style={styles.title}>Thời Gian</Text>
        <Text style={styles.detail}>{convertDate(date)}</Text>
      </View>
      <View style={styles.innerItems}>
        <Text style={styles.title}>Địa Chỉ</Text>
        <Text style={styles.detail}>{shipAddress}</Text>
      </View>
      <View style={styles.innerItems}>
        <Text style={styles.title}>Thanh Toán</Text>
        <Text style={styles.detail}>{paymentMethod}</Text>
      </View>
      <View style={styles.innerItems}>
        <Text style={styles.title}>Tổng Tiền</Text>
        <Text style={styles.detail}>
          {totalPrice?.toLocaleString('vi', {
            style: 'currency',
            currency: 'VND',
          })}
        </Text>
      </View>
      <View style={styles.innerItems}>
        <Text style={styles.title}>Trạng Thái</Text>
        <Text style={styles.detail}>{status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 1,
    borderRadius: 10,
    padding: 7,
    marginHorizontal: 5,
    marginTop: 10,
  },
  innerItems: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    width: DriveWidth * 0.25,
  },
  detail: {
    fontSize: 15,
    width: DriveWidth * 0.69,
    textAlign: 'right',
  },
});

export {OrderHistoryItem};
