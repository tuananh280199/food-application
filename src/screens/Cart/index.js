import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import {DriveHeight, DriveWidth} from '../../constants/Dimensions';
import {CartItem} from './components/CartItem';
import {
  decrementQuantity,
  deleteItemToCart,
  incrementQuantity,
} from './slice/cartSlice';
import {CHECKOUT} from '../../constants/StackNavigation';
import {Image} from 'react-native-animatable';

const CartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const listFoodInCart = useSelector((state) => state.cart.cartFood);
  const profile = useSelector((state) => state.auth.profile);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleOrder = () => {
    if (!listFoodInCart.length) {
      Alert.alert('Chưa có sản phẩm trong giỏ để đặt hàng !');
      return;
    }
    if (!profile.id) {
      Alert.alert('Bạn cần đăng nhập để đặt hàng !');
      return;
    }
    navigation.navigate(CHECKOUT);
  };

  const handleRemove = (id) => {
    dispatch(deleteItemToCart({product_id: id}));
  };

  const handlePlusQuantity = (id) => {
    const newList = listFoodInCart.map((item) => {
      if (item.product.id !== id) {
        return item;
      }
      return {product: item.product, quantity: item.quantity + 1};
    });
    dispatch(incrementQuantity({list: newList}));
  };

  const handleMinusQuantity = (id) => {
    const newItem = listFoodInCart.find((item) => item.product.id === id);
    if (newItem.quantity === 1) {
      return;
    }
    const newList = listFoodInCart.map((item) => {
      if (item.product.id !== id) {
        return item;
      }
      return {product: item.product, quantity: item.quantity - 1};
    });
    dispatch(decrementQuantity({list: newList}));
  };

  const arrayTotalPriceItem = listFoodInCart.map((item) => {
    if (item.product.priceSale) {
      return item.product.priceSale * item.quantity;
    } else {
      return item.product.price * item.quantity;
    }
  });
  const totalPrice = arrayTotalPriceItem.reduce((a, b) => a + b, 0);

  const renderItem = ({item, index}) => {
    return (
      <CartItem
        name={item.product.name}
        image={item.product.image}
        price={
          item.product.priceSale ? item.product.priceSale : item.product.price
        }
        unit={item.product.unit}
        quantity={item.quantity}
        like={item.product.like}
        dislike={item.product.dislike}
        handleRemove={() => handleRemove(item.product.id)}
        handlePlusQuantity={() => handlePlusQuantity(item.product.id)}
        handleMinusQuantity={() => handleMinusQuantity(item.product.id)}
      />
    );
  };

  return (
    <View style={styles.flexContainer}>
      <SafeAreaView style={[styles.header]}>
        <Text style={styles.titleHeader}>Giỏ Hàng</Text>
      </SafeAreaView>
      {listFoodInCart.length === 0 ? (
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
            Chưa Có Sản Phẩm Trong Giỏ
          </Text>
        </View>
      ) : (
        <FlatList
          style={{paddingTop: 9}}
          maxToRenderPerBatch={50}
          initialNumToRender={30}
          showsVerticalScrollIndicator={false}
          data={listFoodInCart}
          keyExtractor={(item) => item.product.id.toString()}
          numColumns={1}
          renderItem={renderItem}
        />
      )}
      <View style={styles.footer}>
        <View style={styles.headerFooter}>
          <Text style={styles.textFooter}>Tổng Tiền : </Text>
          <Text style={[styles.textFooter, {fontSize: 28}]}>
            {totalPrice?.toLocaleString('vi', {
              style: 'currency',
              currency: 'VND',
            })}
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={styles.order} onPress={() => handleOrder()}>
            <LinearGradient
              colors={['#43bb6c', '#20c969']}
              style={styles.order}>
              <Text
                style={[
                  styles.textOrder,
                  {
                    color: '#fff',
                  },
                ]}>
                ĐẶT HÀNG
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
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
    justifyContent: 'center',
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
  footer: {
    backgroundColor: '#fff',
    height: DriveHeight * 0.15,
    justifyContent: 'space-around',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 5,
    shadowColor: '#43bb6c',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 1.5,
    elevation: 1,
  },
  headerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textFooter: {
    fontSize: 22,
    fontWeight: '500',
  },
  order: {
    width: '100%',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: 'silver',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 1.5,
    elevation: 1,
  },
  textOrder: {
    fontSize: 20,
    fontWeight: '500',
  },
});

export {CartScreen};
