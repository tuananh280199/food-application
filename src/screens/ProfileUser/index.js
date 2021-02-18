//import node_module
import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

//import other
import IMAGE_DEFAULT from '../../assets/default-placeholder-image.png';
import {
  CHANGE_PASSWORD,
  CHANGE_PROFILE_USER,
  SIGN_IN,
} from '../../constants/StackNavigation';
import {logout} from '../../slices/authSlice';

const ProfileUserScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const uid = useSelector((state) => state.auth.profile?.id);

  const {profile, token} = useSelector((state) => {
    return {
      profile: state.auth.profile,
      token: state.auth.token,
    };
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Profile',
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() =>
            handleOptionClick('Sửa Thông Tin', CHANGE_PROFILE_USER)
          }>
          <FontAwesome5 name={'user-edit'} size={18} />
        </TouchableOpacity>
      ),
    });
  });

  const handleClickSignInOrSignUp = () => {
    if (token === '') {
      navigation.navigate(SIGN_IN);
      return;
    }
    dispatch(logout());
  };

  const handleOptionClick = (txt, screen = CHANGE_PASSWORD) => {
    if (!uid) {
      Alert.alert('Thông báo', `Vui lòng đăng nhập để vào màn hình ${txt}!`, [
        {text: 'OK'},
      ]);
      return;
    }
    navigation.navigate(screen);
  };

  return (
    <View style={styles.flexContainer}>
      <View style={styles.profileUser}>
        <View style={{flex: 4, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              style={styles.image}
              source={profile?.avatar ? {uri: profile.avatar} : IMAGE_DEFAULT}
            />
            <View style={styles.wrapperIcon}>
              <Entypo name={'camera'} size={16} color={'white'} />
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.text}>
              {profile?.name ? profile.name : 'Tên Khách Hàng'}
            </Text>
            <Text style={styles.subText}>
              @{profile?.nickname ? profile.nickname : 'bídanh'}
            </Text>
          </View>
        </View>
        <View style={{flex: 6, justifyContent: 'space-around'}}>
          <View style={styles.commonInfo}>
            <Entypo name={'location'} size={20} />
            <Text
              style={[styles.subText, {marginHorizontal: 15}]}
              numberOfLine={2}>
              {profile?.address ? profile.address : 'Hà Nội'}
            </Text>
          </View>
          <View style={styles.commonInfo}>
            <FontAwesome name={'phone'} size={20} />
            <Text
              style={[styles.subText, {marginHorizontal: 15}]}
              numberOfLine={2}>
              {profile?.phone ? profile.phone : '0123456789'}
            </Text>
          </View>
          <View style={styles.commonInfo}>
            <MaterialCommunityIcons name={'email'} size={20} />
            <Text
              style={[styles.subText, {marginHorizontal: 15}]}
              numberOfLine={2}>
              {profile?.email ? profile.email : 'example@gmail.com'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.walletAndOrder}>
        <View style={styles.leftWalletAndOrder}>
          <Text style={styles.textWalletAndOrder}>$281</Text>
          <Text style={styles.subText}>Wallet</Text>
        </View>
        <View style={styles.rightWalletAndOrder}>
          <Text style={styles.textWalletAndOrder}>12</Text>
          <Text style={styles.subText}>Order</Text>
        </View>
      </View>
      <View style={styles.other}>
        <TouchableOpacity
          style={styles.commonOther}
          onPress={() => handleOptionClick('Đồ Ăn Yêu Thích')}>
          <AntDesign name={'hearto'} size={20} color={'rgb(245, 54, 37)'} />
          <Text
            style={[styles.subTextOther, {marginHorizontal: 15}]}
            numberOfLine={2}>
            Đồ Ăn Yêu Thích
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commonOther}
          onPress={() => handleOptionClick('Lịch Sử Mua Hàng')}>
          <Entypo name={'list'} size={20} color={'rgb(245, 54, 37)'} />
          <Text
            style={[styles.subTextOther, {marginHorizontal: 15}]}
            numberOfLine={2}>
            Lịch Sử Mua Hàng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commonOther}
          onPress={() => handleOptionClick('Đổi Mật Khẩu', CHANGE_PASSWORD)}>
          <FontAwesome name={'key'} size={20} color={'rgb(245, 54, 37)'} />
          <Text
            style={[styles.subTextOther, {marginHorizontal: 15}]}
            numberOfLine={2}>
            Đổi Mật Khẩu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commonOther}
          onPress={() => handleOptionClick('Thanh Toán')}>
          <MaterialIcons
            name={'payment'}
            size={20}
            color={'rgb(245, 54, 37)'}
          />
          <Text
            style={[styles.subTextOther, {marginHorizontal: 15}]}
            numberOfLine={2}>
            Thanh Toán
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commonOther}>
          <MaterialIcons
            name={'contact-support'}
            size={20}
            color={'rgb(245, 54, 37)'}
          />
          <Text
            style={[styles.subTextOther, {marginHorizontal: 15}]}
            numberOfLine={2}>
            Hỗ Trợ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commonOther}
          onPress={handleClickSignInOrSignUp}>
          <FontAwesome
            name={token === '' ? 'sign-in' : 'sign-out'}
            size={20}
            color={'rgb(245, 54, 37)'}
          />
          <Text
            style={[styles.subTextOther, {marginHorizontal: 15}]}
            numberOfLine={2}>
            {token === '' ? 'Đăng Nhập' : 'Đăng Xuất'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  commonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commonOther: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileUser: {
    flex: 3.5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 15,
  },
  wrapperIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#20c997',
    top: 48,
    left: 40,
    width: 28,
    height: 28,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: 'white',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 5,
  },
  subText: {
    fontSize: 16,
    color: 'gray',
  },
  subTextOther: {
    fontSize: 18,
  },
  walletAndOrder: {
    flex: 1.5,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  leftWalletAndOrder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: 'gray',
  },
  rightWalletAndOrder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWalletAndOrder: {
    fontSize: 18,
    fontWeight: '400',
    marginVertical: 5,
  },
  other: {
    flex: 5,
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginVertical: 5,
  },
});

export {ProfileUserScreen};
