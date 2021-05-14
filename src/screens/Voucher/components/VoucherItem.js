import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';

type VoucherItemProps = {
  name?: string,
  discount_price?: number,
  discount_percent?: number,
  min_price_to_use?: number,
  expired_in: number,
  handleUseVoucher?: Function,
};

export const VoucherItem = (props: VoucherItemProps) => {
  const {
    name,
    discount_price,
    discount_percent,
    min_price_to_use,
    expired_in,
    handleUseVoucher,
  } = props;

  const renderReducePrice = () => {
    if (discount_price) {
      return (
        <Text style={[styles.txt, {color: '#ff5b45'}]}>
          {' '}
          {discount_price.toLocaleString('vi', {
            style: 'currency',
            currency: 'VND',
          })}
        </Text>
      );
    }
    return (
      <Text style={[styles.txt, {color: '#ff5b45'}]}> {discount_percent}%</Text>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {marginVertical: 10}]}>{name}</Text>
      {(discount_percent || discount_price) && (
        <View style={styles.wrapItem}>
          <Text>Giảm Giá :</Text>
          {renderReducePrice()}
        </View>
      )}
      <View style={styles.wrapItem}>
        <Text>
          Áp Dụng Với Đơn Hàng Từ{' '}
          <Text style={[styles.txt, {color: '#ff5b45'}]}>
            {min_price_to_use.toLocaleString('vi', {
              style: 'currency',
              currency: 'VND',
            })}
          </Text>{' '}
          Trở Lên
        </Text>
      </View>
      <View style={[styles.wrapItem, {marginBottom: 10}]}>
        <Text>Hết Hạn Vào :</Text>
        <Text style={[styles.txt, {color: '#ff5b45'}]}>
          {' '}
          {moment.unix(expired_in).format('DD-MM-YYYY')}
        </Text>
      </View>
      <TouchableOpacity onPress={handleUseVoucher} style={styles.btnUse}>
        <Text style={[styles.txt, {color: '#43bb6c', fontWeight: '500'}]}>
          SỬ DỤNG
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 20,
    borderWidth: 0.9,
    borderColor: '#32a852',
    paddingTop: 5,
    paddingBottom: 10,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 8,
  },
  wrapItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    marginLeft: 5,
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 19,
    textAlign: 'center',
    color: '#32a852',
    fontWeight: '500',
  },
  btnUse: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 5,
    borderTopWidth: 0.9,
    borderColor: '#32a852',
  },
  txt: {
    fontSize: 16,
  },
});
