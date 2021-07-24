//import modules
import React, {useLayoutEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-easy-toast';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';

//Others
import {DriveHeight, DriveWidth} from '../../constants/Dimensions';
import {Spinner} from '../../components/Spinner';
import {
  CART_NAVIGATION,
  PROFILE_USER_NAVIGATION,
  TRACK_ORDER,
} from '../../constants/StackNavigation';
import orderAPI from '../../services/order';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {resetOrder} from '../../notifications/slice/notificationSlice';
import {OrderStatus} from '../../utils/OrderStatus';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ConfirmOrder = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toastRef = useRef();

  const [loadingCancel, setLoadingCancel] = useState(false);
  const orderStatus = useSelector((state) => state.notification.orderStatus);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      if (
        orderStatus.status === OrderStatus.done ||
        orderStatus.status === OrderStatus.cancel
      ) {
        navigation.reset({
          index: 0,
          routes: [{name: CART_NAVIGATION}, {name: PROFILE_USER_NAVIGATION}],
        });
        dispatch(resetOrder());
      }
    }, [orderStatus.status]),
  );

  const handleCancelOrder = async () => {
    try {
      setLoadingCancel(true);
      await orderAPI.updateOrderStatus(orderStatus.order_id);
      setLoadingCancel(false);
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
            Huỷ đơn hàng thành công
          </Text>
        </View>,
        700,
        () => {
          dispatch(resetOrder());
          navigation.popToTop();
        },
      );
    } catch (e) {
      console.log(e);
      setLoadingCancel(false);
      Alert.alert('Huỷ đơn thất bại');
    }
  };

  const handleGoBack = () => {
    navigation.reset({
      index: 0,
      routes: [{name: CART_NAVIGATION}, {name: PROFILE_USER_NAVIGATION}],
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={[styles.header]}>
        <TouchableOpacity onPress={handleGoBack} style={{marginLeft: 20}}>
          <Ionicons name="arrow-back" color={'white'} size={25} />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Đặt Hàng</Text>
        <View style={{width: DriveWidth * 0.1}} />
      </SafeAreaView>
      <View
        style={{
          height: DriveHeight * 0.37,
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <Image
          source={require('../../assets/logo-khoaikhau.png')}
          style={{
            width: DriveHeight * 0.19,
            height: DriveHeight * 0.19,
            resizeMode: 'contain',
          }}
        />
        <Text style={[styles.titleContent, {color: '#43bb6c', fontSize: 22}]}>
          Thank you !
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', marginHorizontal: 10}}>
        <Text style={styles.titleContent}>
          {'Chúng tôi đã nhận \n được đơn hàng của bạn'}
        </Text>
        <Text style={[styles.subTitleContent, {marginTop: 15}]}>
          {'Vui lòng chờ để chúng tôi xác nhận \n đơn hàng của bạn'}
        </Text>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => navigation.navigate(TRACK_ORDER)}>
            <LinearGradient
              colors={['#43bb6c', '#20c969']}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    marginLeft: 9,
                    color: '#fff',
                  },
                ]}>
                Theo Dõi Đơn Hàng
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          {orderStatus.status === OrderStatus.pending && (
            <TouchableOpacity
              onPress={() => handleCancelOrder()}
              disabled={loadingCancel}
              style={[
                styles.signIn,
                {
                  borderColor: '#43bb6c',
                  borderWidth: 1,
                  marginTop: 7,
                },
              ]}>
              {loadingCancel && <Spinner color={'#43bb6c'} />}
              <Text
                style={[
                  styles.textSign,
                  {
                    marginLeft: 9,
                    color: '#43bb6c',
                  },
                ]}>
                Huỷ Đơn Hàng
              </Text>
            </TouchableOpacity>
          )}
        </View>
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
  container: {
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
  titleContent: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 25,
    color: '#404040',
  },
  subTitleContent: {
    color: '#808080',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 25,
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
  },
  signIn: {
    flexDirection: 'row',
    width: DriveWidth * 0.8,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
