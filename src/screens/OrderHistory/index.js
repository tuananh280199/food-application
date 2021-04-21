//node_modules
import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import Snackbar from 'react-native-snackbar';

//others
import {DriveHeight, DriveWidth} from '../../constants/Dimensions';
import {OrderHistoryItem} from './components/OrderHistoryItem';
import orderAPI from '../../services/order';
import {getErrorMessage} from '../../utils/HandleError';
import {fetchFavouriteFood} from '../FavouriteFood/slide/favouriteSlide';
import {Spinner} from '../../components/Spinner';
import {Image} from 'react-native-animatable';

const OrderHistoryScreen = () => {
  const navigation = useNavigation();

  const uid = useSelector((state) => state.auth.profile.id);

  const [listOrder, setListOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    getOrderHistory();
  }, []);

  const getOrderHistory = async () => {
    try {
      const response = await orderAPI.getOrderHistory(uid, page);
      setListOrder(response.data);
      setPage(response.page);
      setHasNext(response.hasNext);
      setLoading(false);
    } catch (e) {
      Snackbar.show({
        text: getErrorMessage(e),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'rgba(245, 101, 101, 1)',
      });
    }
  };

  const handleLoadMore = async () => {
    try {
      if (!hasNext) {
        return;
      }
      const response = await orderAPI.getOrderHistory(uid, page + 1);
      setListOrder(listOrder.concat(response.data));
      setPage(response.page);
      setHasNext(response.hasNext);
    } catch (e) {
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

  const renderItem = ({item}) => {
    return (
      <OrderHistoryItem
        date={item.order_date}
        totalPrice={item.total}
        paymentMethod={item.payment_method}
        status={item.status}
        shipAddress={item.shipping_address}
      />
    );
  };

  return (
    <View style={styles.flexContainer}>
      <SafeAreaView style={[styles.header]}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" color={'white'} size={25} />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Lịch Sử Mua Hàng</Text>
        <View style={{width: 25}} />
      </SafeAreaView>
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Spinner color={'#43bb6c'} />
        </View>
      ) : listOrder.length === 0 ? (
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
            Chưa Có Lịch Sử Mua Hàng
          </Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={listOrder}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            onEndReachedThreshold={0.5}
            onEndReached={handleLoadMore}
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
    justifyContent: 'space-around',
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
});

export {OrderHistoryScreen};
