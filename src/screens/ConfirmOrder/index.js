//import modules
import React, {useLayoutEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-easy-toast';
import LinearGradient from 'react-native-linear-gradient';

//Others
import {DriveHeight, DriveWidth} from '../../constants/Dimensions';
import {Spinner} from '../../components/Spinner';
import {TRACK_ORDER} from '../../constants/StackNavigation';
import orderAPI from '../../services/order';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const ConfirmOrder = () => {
  const navigation = useNavigation();
  const toastRef = useRef();
  const route = useRoute();
  const order_id = route?.params?.order_id;

  const [loadingCancel, setLoadingCancel] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleCancelOrder = async () => {
    try {
      setLoadingCancel(true);
      await orderAPI.updateOrderStatus(order_id);
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
            Đặt Hàng Thành Công
          </Text>
        </View>,
        700,
        () => {
          navigation.popToTop();
        },
      );
    } catch (e) {
      setLoadingCancel(false);
      Alert.alert('Huỷ đơn thất bại');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={[styles.header]}>
        <Text style={styles.titleHeader}>Đặt Hàng</Text>
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
