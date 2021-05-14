import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Snackbar from 'react-native-snackbar';

import {DriveHeight, DriveWidth} from '../../constants/Dimensions';
import {VoucherItem} from './components/VoucherItem';
import {getErrorMessage} from '../../utils/HandleError';
import orderAPI from '../../services/order';
import {Spinner} from '../../components/Spinner';
import {useDispatch, useSelector} from 'react-redux';
import {addVoucher} from './slices/voucherSlice';

const VoucherScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartFood);
  const [listVoucher, setListVoucher] = useState([]);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    getListVoucher();
  }, []);

  const getListVoucher = async () => {
    try {
      setLoading(true);
      const {data} = await orderAPI.getVoucher();
      setListVoucher(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      Snackbar.show({
        text: getErrorMessage(e),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'rgba(245, 101, 101, 1)',
      });
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const arrayTotalPriceItem = cart.map((item) => {
    if (item.product.priceSale) {
      return item.product.priceSale * item.quantity;
    } else {
      return item.product.price * item.quantity;
    }
  });
  const totalPrice = arrayTotalPriceItem.reduce((a, b) => a + b, 0);

  const handleVoucherClick = (item) => {
    if (totalPrice >= item.min_price_to_use) {
      dispatch(addVoucher({item}));
      navigation.goBack();
    } else {
      alert(`Áp dụng với đơn hàng từ ${item.min_price_to_use} trở lên`);
    }
  };

  const renderVoucher = ({item, index}) => {
    return (
      <VoucherItem
        name={item.name}
        discount_price={item.discount_price}
        discount_percent={item.discount_percent}
        min_price_to_use={item.min_price_to_use}
        expired_in={item.expired_in}
        handleUseVoucher={() => handleVoucherClick(item)}
      />
    );
  };

  return (
    <View style={styles.flexContainer}>
      <SafeAreaView style={[styles.header]}>
        <TouchableOpacity onPress={handleGoBack} style={{marginLeft: 20}}>
          <Ionicons name="arrow-back" color={'white'} size={25} />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Voucher</Text>
        <View style={{width: DriveWidth * 0.1}} />
      </SafeAreaView>
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Spinner color={'#43bb6c'} />
        </View>
      ) : listVoucher.length === 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../../assets/logo-khoaikhau.png')}
            style={{
              width: DriveHeight * 0.065,
              height: DriveHeight * 0.065,
              marginBottom: 10,
            }}
          />
          <Text style={{color: '#43bb6c', fontSize: 20, fontWeight: '500'}}>
            Hiện Tại Không Có Voucher Nào !
          </Text>
        </View>
      ) : (
        <View style={styles.content}>
          <FlatList
            contentContainerStyle={{
              flexDirection: 'column',
            }}
            numColumns={1}
            data={listVoucher}
            renderItem={renderVoucher}
            keyExtractor={(item) => `${item.id}`}
          />
        </View>
      )}
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
  },
});

export {VoucherScreen};
