//import node_module
import React, {useState, useCallback, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  SafeAreaView,
  Linking,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Snackbar from 'react-native-snackbar';

//import other
import IMAGE_DEFAULT from '../../assets/default-placeholder-image.png';
import {
  CHANGE_PASSWORD,
  CHANGE_PROFILE_USER,
  ORDER_HISTORY,
  SIGN_IN,
  FAVOURITE_FOOD,
  PAYMENT,
} from '../../constants/StackNavigation';
import {logout, updateProfile} from '../../slices/authSlice';
import {getErrorMessage} from '../../utils/HandleError';
import profileUserAPI from '../../services/profileUser';
import {DriveHeight, DriveWidth} from '../../constants/Dimensions';
import orderAPI from '../../services/order';
import Config from 'react-native-config';

const ProfileUserScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {profile, token} = useSelector((state) => {
    return {
      profile: state.auth.profile,
      token: state.auth.token,
    };
  });

  const [avatar, setAvatar] = useState(profile?.avatar);
  const [numberOrder, setNumberOrder] = useState(0);

  useEffect(() => {
    setAvatar(profile?.avatar);
    if (profile.id) {
      getNumberOrder();
    }
  }, [profile]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const getNumberOrder = async () => {
    try {
      const {data} = await orderAPI.getNumberOrder(profile.id);
      setNumberOrder(data.numberOder);
    } catch (e) {
      Snackbar.show({
        text: getErrorMessage(e),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'rgba(245, 101, 101, 1)',
      });
    }
  };

  const chooseFile = (type) => {
    let option = {
      mediaType: type,
      quality: 1,
    };
    launchImageLibrary(option, (response) => {
      if (response.didCancel) {
        return;
      }
      Alert.alert(
        'Thông báo',
        'Bạn có chắc chắn muốn thay đổi Avatar ?',
        [
          {
            text: 'Huỷ',
            style: 'cancel',
          },
          {text: 'OK', onPress: () => handleSubmitAvatar(response)},
        ],
        {cancelable: false},
      );
    });
  };

  const handleSubmitAvatar = useCallback(
    async (fileBlob) => {
      try {
        const data = new FormData();
        data.append('file', {
          name: fileBlob.fileName,
          type: fileBlob.type,
          uri:
            Platform.OS === 'android'
              ? fileBlob.uri
              : fileBlob.uri.replace('file://', ''),
        });
        const filePath = await profileUserAPI.uploadAvatar(profile.id, data);
        await dispatch(updateProfile({profile: filePath.data}));
      } catch (e) {
        Snackbar.show({
          text: getErrorMessage(e),
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'rgba(245, 101, 101, 1)',
        });
      }
    },
    [avatar],
  );

  const checkPermission = async (devicePermission, type) => {
    try {
      if (!profile.id) {
        Alert.alert('Thông báo', 'Vui lòng đăng nhập để thay Avatar !', [
          {text: 'OK'},
        ]);
        return;
      }
      const permission = await check(devicePermission);
      if (permission === RESULTS.DENIED) {
        const isAllowOpenCamera = await request(devicePermission);
        if (isAllowOpenCamera === RESULTS.GRANTED) {
          chooseFile(type);
        }
      } else if (
        permission === RESULTS.GRANTED ||
        permission === RESULTS.LIMITED
      ) {
        chooseFile(type);
      } else {
        Alert.alert(
          'Vui lòng cho phép quyền sử dụng thư mục ảnh',
          'Di chuyển đến màn hình cài đặt quyền truy cập thư mục ảnh。',
          [
            {
              text: 'Huỷ',
              onPress: () => {},
            },
            {
              text: 'OK',
              onPress: () => {
                Linking.openSettings();
              },
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error) {
      Snackbar.show({
        text: getErrorMessage(error),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'rgba(245, 101, 101, 1)',
      });
    }
  };

  const handleUploadFile = () => {
    Platform.OS === 'ios'
      ? checkPermission(PERMISSIONS.IOS.PHOTO_LIBRARY, 'photo')
      : checkPermission(PERMISSIONS.ANDROID.CAMERA, 'photo');
  };

  const handleClickSignInOrSignUp = () => {
    if (token === '') {
      navigation.navigate(SIGN_IN);
      return;
    }
    setNumberOrder(0);
    dispatch(logout());
  };

  const handleOptionClick = (txt, screen) => {
    if (!profile.id) {
      Alert.alert('Thông báo', `Vui lòng đăng nhập để vào màn hình ${txt}!`, [
        {text: 'OK'},
      ]);
      return;
    }
    navigation.navigate(screen);
  };

  return (
    <View style={styles.flexContainer}>
      <SafeAreaView style={[styles.header]}>
        <View />
        <Text style={styles.titleHeader}>THÔNG TIN CÁ NHÂN</Text>
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() =>
            handleOptionClick('Sửa Thông Tin', CHANGE_PROFILE_USER)
          }>
          <FontAwesome5 name={'user-edit'} size={20} color={'#fff'} />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.profileUser}>
        <View style={{flex: 4, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={handleUploadFile}>
            <Image
              style={styles.image}
              source={avatar ? {uri: `${Config.HOST + avatar}`} : IMAGE_DEFAULT}
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
              {profile?.address ? profile.address : 'Địa Chỉ'}
            </Text>
          </View>
          <View style={styles.commonInfo}>
            <FontAwesome name={'phone'} size={20} />
            <Text
              style={[styles.subText, {marginHorizontal: 15}]}
              numberOfLine={2}>
              {profile?.phone ? profile.phone : 'Số Điện Thoại'}
            </Text>
          </View>
          <View style={styles.commonInfo}>
            <MaterialCommunityIcons name={'email'} size={20} />
            <Text
              style={[styles.subText, {marginHorizontal: 15}]}
              numberOfLine={2}>
              {profile?.email ? profile.email : 'Email'}
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
          <Text style={styles.textWalletAndOrder}>{numberOrder}</Text>
          <Text style={styles.subText}>Order</Text>
        </View>
      </View>
      <View style={styles.other}>
        <TouchableOpacity
          style={styles.commonOther}
          onPress={() => handleOptionClick('Đồ Ăn Yêu Thích', FAVOURITE_FOOD)}>
          <AntDesign name={'hearto'} size={20} color={'rgb(245, 54, 37)'} />
          <Text
            style={[styles.subTextOther, {marginHorizontal: 15}]}
            numberOfLine={2}>
            Đồ Ăn Yêu Thích
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commonOther}
          onPress={() => handleOptionClick('Lịch Sử Mua Hàng', ORDER_HISTORY)}>
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
          onPress={() => handleOptionClick('Thanh Toán', PAYMENT)}>
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
    marginLeft: 35,
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
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
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 15,
    backgroundColor: 'silver',
  },
  wrapperIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#43bb6c',
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
