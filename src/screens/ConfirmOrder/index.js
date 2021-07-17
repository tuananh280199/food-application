//import modules
import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Others
import {DriveHeight, DriveWidth} from '../../constants/Dimensions';
import LinearGradient from 'react-native-linear-gradient';
import {Spinner} from '../../components/Spinner';
import { SIGN_UP, TRACK_ORDER } from "../../constants/StackNavigation";
import * as Animatable from 'react-native-animatable';

export const ConfirmOrder = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

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
          <TouchableOpacity style={styles.signIn} onPress={() => navigation.navigate(TRACK_ORDER)}>
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
            onPress={() => navigation.navigate(SIGN_UP)}
            style={[
              styles.signIn,
              {
                borderColor: '#43bb6c',
                borderWidth: 1,
                marginTop: 7,
              },
            ]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#43bb6c',
                },
              ]}>
              Huỷ Đơn Hàng
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
