import React, {useLayoutEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {DriveHeight, DriveWidth} from '../../constants/Dimensions';
import {Divider} from '../../components/Divider';
import {useSelector} from 'react-redux';

export const Checkout = () => {
  const navigation = useNavigation();
  const profile = useSelector((state) => state.auth.profile);
  const cart = useSelector((state) => state.cart.cartFood);
  const [name, setName] = useState(profile.name || '');
  const [address, setAddress] = useState(profile.address || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [note, setNote] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleChangeName = (text) => {
    setName(text);
  };

  const handleChangePhone = (text) => {
    setPhone(text);
  };

  const handleChangeAddress = (text) => {
    setAddress(text);
  };

  const handleChangeNote = (text) => {
    setNote(text);
  };

  const arrayTotalPriceItem = cart.map((item) => {
    if (item.product.priceSale) {
      return item.product.priceSale * item.quantity;
    } else {
      return item.product.price * item.quantity;
    }
  });
  const totalPrice = arrayTotalPriceItem.reduce((a, b) => a + b, 0);

  return (
    <View style={styles.flexContainer}>
      <SafeAreaView style={[styles.header]}>
        <TouchableOpacity onPress={handleGoBack} style={{marginLeft: 20}}>
          <Ionicons name="arrow-back" color={'white'} size={25} />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Thủ Tục Thanh Toán</Text>
        <View style={{width: DriveWidth * 0.1}} />
      </SafeAreaView>
      <ScrollView style={styles.content}>
        <View style={styles.shipping}>
          <Text style={styles.title}>Thông Tin Giao Hàng</Text>
          <View style={styles.wrapItem}>
            <Text style={styles.text}>
              Tên Khách Hàng <Text style={{color: 'red'}}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, {borderBottomWidth: 1}]}
              placeholder={'Họ Tên'}
              value={name}
              onChangeText={(text) => handleChangeName(text)}
            />
          </View>
          <View style={styles.wrapItem}>
            <Text style={styles.text}>
              Số Điện Thoại <Text style={{color: 'red'}}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, {borderBottomWidth: 1}]}
              placeholder={'Số điện thoại'}
              value={phone}
              onChangeText={(text) => handleChangePhone(text)}
            />
          </View>
          <View style={styles.wrapItem}>
            <Text style={styles.text}>
              Địa Chỉ <Text style={{color: 'red'}}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, {borderBottomWidth: 1}]}
              placeholder={'Địa chỉ'}
              value={address}
              onChangeText={(text) => handleChangeAddress(text)}
            />
          </View>
          <View style={[styles.wrapItem]}>
            <Text style={styles.text}>Ghi Chú</Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: 99,
                  backgroundColor: '#fff',
                  textAlignVertical: 'top',
                  borderWidth: 1,
                  padding: 10,
                },
              ]}
              multiline
              maxLength={200}
              value={note}
              onChangeText={(text) => handleChangeNote(text)}
            />
          </View>
          <View
            style={[
              styles.wrapItem,
              {justifyContent: 'flex-end', marginTop: 0},
            ]}>
            <Text style={{marginRight: 10, color: 'gray'}}>
              {200 - note.length} kí tự
            </Text>
          </View>
        </View>
        <View style={styles.cart}>
          <Text style={styles.title}>Đơn Hàng</Text>
          <View style={styles.wrapItemCart}>
            <Text
              style={[
                styles.titleItem,
                {width: DriveWidth * 0.45, textAlign: 'left', fontSize: 16},
              ]}>
              Sản Phẩm
            </Text>
            <Text
              style={[
                styles.titleItem,
                {width: DriveWidth * 0.2, textAlign: 'center', fontSize: 16},
              ]}>
              Số lượng
            </Text>
            <Text
              style={[
                styles.titleItem,
                {width: DriveWidth * 0.25, textAlign: 'right', fontSize: 16},
              ]}>
              Giá
            </Text>
          </View>
          {cart.map((item, index) => (
            <View style={styles.wrapItemCart} key={index}>
              <Text
                style={[
                  styles.titleItem,
                  {width: DriveWidth * 0.45, textAlign: 'left'},
                ]}>
                {item.product.name}
              </Text>
              <Text
                style={[
                  styles.titleItem,
                  {width: DriveWidth * 0.2, textAlign: 'center'},
                ]}>
                {item.quantity}
              </Text>
              <Text
                style={[
                  styles.titleItem,
                  {width: DriveWidth * 0.25, textAlign: 'right'},
                ]}>
                {item.product.priceSale
                  ? (item.product.priceSale * item.quantity).toLocaleString(
                      'vi',
                      {
                        style: 'currency',
                        currency: 'VND',
                      },
                    )
                  : (item.product.price * item.quantity).toLocaleString('vi', {
                      style: 'currency',
                      currency: 'VND',
                    })}
              </Text>
            </View>
          ))}
          <Divider style={{borderWidth: 1, margin: 10}} />
          <View style={styles.wrapItemCart}>
            <Text
              style={[
                styles.titleItem,
                {
                  width: DriveWidth * 0.3,
                  textAlign: 'right',
                  fontSize: 16,
                  color: 'red',
                },
              ]}>
              Thành Tiền :
            </Text>
            <Text
              style={[
                styles.titleItem,
                {
                  width: DriveWidth * 0.2,
                  textAlign: 'right',
                  fontSize: 16,
                  color: 'red',
                },
              ]}>
              {totalPrice.toLocaleString('vi', {
                style: 'currency',
                currency: 'VND',
              })}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: '#f8fffa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: DriveWidth,
    height: DriveHeight * 0.12,
    backgroundColor: '#43bb6c',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: -5,
  },
  titleHeader: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  wrapItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 7,
  },
  wrapItemCart: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 7,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 7,
    color: '#20c969',
  },
  text: {
    width: DriveWidth * 0.3,
  },
  input: {
    borderColor: 'gray',
    width: DriveWidth * 0.6,
    padding: 1,
  },
  titleItem: {
    fontSize: 14,
  },
});
