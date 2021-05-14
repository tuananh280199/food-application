import React, {useLayoutEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-easy-toast';
import {isEmpty} from 'lodash';

import {DriveHeight, DriveWidth} from '../../constants/Dimensions';
import {Divider} from '../../components/Divider';
import {RadioButton} from './components/RadioButton';
import {validatePhone} from '../../utils/ValidatePhone';
import orderAPI from '../../services/order';
import {clearCart} from '../Cart/slice/cartSlice';
import {Spinner} from '../../components/Spinner';
import {VOUCHER} from '../../constants/StackNavigation';

const moneyShip = 15000;

export const Checkout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toastRef = useRef();
  const profile = useSelector((state) => state.auth.profile);
  const cart = useSelector((state) => state.cart.cartFood);
  const {voucher} = useSelector((state) => state.voucher);
  const [name, setName] = useState(profile.name || '');
  const [address, setAddress] = useState(profile.address || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [note, setNote] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [loading, setLoading] = useState(false);

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

  const totalPrice = moneyShip + arrayTotalPriceItem.reduce((a, b) => a + b, 0);

  const priceWhenUseVoucher = (price) => {
    if (isEmpty(voucher)) {
      return price;
    }
    if (price - moneyShip < voucher.min_price_to_use) {
      return price;
    }
    if (!voucher.discount_percent && !voucher.discount_price) {
      return price - moneyShip;
    }
    if (voucher.discount_price) {
      return price - voucher.discount_price;
    }
    if (voucher.discount_percent) {
      return (
        price -
        Math.round((price * (voucher.discount_percent / 100)) / 1000) * 1000
      );
    }
  };

  const handleOrder = async () => {
    let paymentMethod = 1;
    if (!name.length) {
      Alert.alert('Vui lòng nhập tên của bạn !');
      return;
    }
    if (phone.trim().length !== 10 || !validatePhone(phone)) {
      Alert.alert('Số điện thoại không hợp lệ. Vui lòng kiểm tra lại !');
      return;
    }
    if (!address.length) {
      Alert.alert('Vui lòng nhập địa chỉ giao hàng !');
      return;
    }
    try {
      if (selectedPayment !== 0) {
        paymentMethod = 2;
      }
      const shipping = {name, address, phone, note};
      setLoading(true);
      const response = await orderAPI.sendOrder(
        profile.id,
        shipping,
        paymentMethod,
        cart,
      );
      if (response.status === 201) {
        setLoading(false);
        dispatch(clearCart());
        toastRef.current.show(
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 130,
              height: 80,
            }}>
            <AntDesign name={'check'} size={40} color={'white'} />
            <Text style={{color: 'white', marginTop: 5, textAlign: 'center'}}>
              Đặt Hàng Thành Công
            </Text>
          </View>,
          700,
          () => {
            navigation.goBack();
          },
        );
      }
    } catch (e) {
      setLoading(false);
      Alert.alert('Thanh toán thất bại. Vui lòng thử lại sau !');
    }
  };

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
              Đ/C Giao Hàng <Text style={{color: 'red'}}>*</Text>
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
        <TouchableOpacity
          style={styles.voucher}
          onPress={() => navigation.navigate(VOUCHER)}>
          <Text style={{color: 'tomato', fontSize: 16}}>
            Thêm voucher giảm giá{' '}
          </Text>
          <AntDesign name={'forward'} size={15} color={'tomato'} />
        </TouchableOpacity>
        <View style={styles.cart}>
          <Text style={styles.title}>Thông Tin Đơn Hàng</Text>
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
          {
            <View style={styles.wrapItemCart}>
              <Text
                style={[
                  styles.titleItem,
                  {
                    width: DriveWidth * 0.65,
                    textAlign: 'left',
                    fontSize: 15,
                  },
                ]}>
                Phí Giao Hàng :{' '}
              </Text>
              <Text
                style={[
                  styles.titleItem,
                  {width: DriveWidth * 0.25, textAlign: 'right'},
                ]}>
                {' '}
                {moneyShip.toLocaleString('vi', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </Text>
            </View>
          }
          {voucher && priceWhenUseVoucher(totalPrice) - totalPrice !== 0 && (
            <View style={styles.wrapItemCart}>
              <Text
                style={[
                  styles.titleItem,
                  {
                    width: DriveWidth * 0.65,
                    textAlign: 'left',
                    fontSize: 15,
                  },
                ]}>
                Voucher :{' '}
              </Text>
              <Text
                style={[
                  styles.titleItem,
                  {
                    width: DriveWidth * 0.25,
                    textAlign: 'right',
                    color: 'tomato',
                  },
                ]}>
                {' '}
                {(priceWhenUseVoucher(totalPrice) - totalPrice).toLocaleString(
                  'vi',
                  {
                    style: 'currency',
                    currency: 'VND',
                  },
                )}
              </Text>
            </View>
          )}
          <Divider style={{borderWidth: 1, margin: 10}} />
          <View style={styles.wrapItemCart}>
            <Text
              style={[
                styles.titleItem,
                {
                  width: DriveWidth * 0.3,
                  textAlign: 'right',
                  fontSize: 16,
                },
              ]}>
              Thành Tiền :
            </Text>
            <Text
              style={[
                styles.titleItem,
                {
                  width: DriveWidth * 0.25,
                  textAlign: 'right',
                  fontSize: 16,
                  color: 'tomato',
                },
              ]}>
              {priceWhenUseVoucher(totalPrice).toLocaleString('vi', {
                style: 'currency',
                currency: 'VND',
              })}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.title}>Phương Thức Thanh Toán</Text>
          <View style={styles.wrapRbtn}>
            <RadioButton
              styleContainer={{
                height: DriveHeight * 0.09,
                width: DriveWidth * 0.9,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: 'silver',
                marginVertical: 5,
              }}
              styleItem={{marginHorizontal: 10}}
              styleText={{color: '#000', fontSize: 16}}
              styleOutlineCircle={{borderColor: '#43bb6c'}}
              styleInnerCircle={{backgroundColor: '#20c969'}}
              options={['Tiền Mặt', 'Chuyển Khoản']}
              selected={selectedPayment}
              horizontal
              onChangeSelect={(opt, index) => {
                setSelectedPayment(index);
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnOrder}>
        <TouchableOpacity
          style={styles.order}
          onPress={handleOrder}
          disabled={loading}>
          <LinearGradient colors={['#43bb6c', '#20c969']} style={styles.order}>
            {loading && <Spinner color={'#fff'} />}
            <Text
              style={[
                styles.textOrder,
                {
                  marginLeft: 9,
                  color: '#fff',
                },
              ]}>
              ĐẶT HÀNG
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Toast
        ref={toastRef}
        style={{backgroundColor: '#000'}}
        position="top"
        fadeInDuration={200}
        fadeOutDuration={700}
        positionValue={320}
        opacity={0.8}
      />
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
    color: '#43bb6c',
  },
  text: {
    width: DriveWidth * 0.35,
  },
  input: {
    borderColor: 'gray',
    width: DriveWidth * 0.55,
    padding: 1,
  },
  titleItem: {
    fontSize: 14,
  },
  voucher: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  wrapRbtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnOrder: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: 'silver',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 1.5,
    elevation: 1,
  },
  order: {
    flexDirection: 'row',
    width: '95%',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textOrder: {
    fontSize: 20,
    fontWeight: '500',
  },
});
