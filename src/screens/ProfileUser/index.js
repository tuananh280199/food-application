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
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Snackbar from 'react-native-snackbar';
import ImageResizer from 'react-native-image-resizer';

//import other
import IMAGE_DEFAULT from '../../assets/default-placeholder-image.png';
import {
  CHANGE_PASSWORD,
  CHANGE_PROFILE_USER,
  ORDER_HISTORY,
  SIGN_IN,
  FAVOURITE_FOOD,
} from '../../constants/StackNavigation';
import {logout, updateProfile} from '../../slices/authSlice';
import {getErrorMessage} from '../../utils/HandleError';
import profileUserAPI from '../../services/profileUser';
import {DriveHeight, DriveWidth} from '../../constants/Dimensions';
import orderAPI from '../../services/order';
import {Spinner} from '../../components/Spinner';
import productAPI from '../../services/product';

const ProfileUserScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {profile, token} = useSelector((state) => {
    return {
      profile: state.auth.profile,
      token: state.auth.token,
    };
  });

  const [loadingChangeAvatar, setLoadingChangeAvatar] = useState(false);
  const [avatar, setAvatar] = useState(profile?.avatar);
  const [numberOrder, setNumberOrder] = useState(0);
  const [numberFavourite, setNumberFavourite] = useState(0);

  useEffect(() => {
    setAvatar(profile?.avatar);
  }, [profile]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (profile?.id) {
        getNumberOrder();
        getNumberFavouriteProduct();
      }
    });

    return unsubscribe;
  }, [navigation, profile]);

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

  const getNumberFavouriteProduct = async () => {
    try {
      const {data} = await productAPI.getNumberFavouriteProduct(profile.id);
      setNumberFavourite(data.numberFavorite);
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
        const resizedImage = await ImageResizer.createResizedImage(
          fileBlob.uri,
          100,
          100,
          'JPEG',
          100,
          0,
          undefined,
          false,
          {mode: 'contain', onlyScaleDown: false},
        );

        data.append('file', {
          name: resizedImage.name,
          uri:
            Platform.OS === 'android'
              ? resizedImage.uri
              : resizedImage.uri.replace('file://', ''),
        });

        data.append('upload_preset', 'food-app');
        data.append('cloud_name', 'dh4nrrwvy');

        fetch('https://api.cloudinary.com/v1_1/dh4nrrwvy/image/upload', {
          method: 'post',
          body: data,
        })
          .then((res) => res.json())
          .then(async (data) => {
            setLoadingChangeAvatar(true);
            const filePath = await profileUserAPI.uploadAvatar(
              profile.id,
              data?.secure_url,
            );
            await dispatch(updateProfile({profile: filePath.data}));
            setLoadingChangeAvatar(false);
          })
          .catch((e) => alert('Xảy ra lỗi. Vui lòng thử lại sau !'));

        // data.append('file', {
        //   name: fileBlob.name,
        //   type: fileBlob.type,
        //   uri: Platform.OS === 'android'
        //       ? fileBlob.uri
        //       : fileBlob.uri.replace('file://', ''),
        // });
      } catch (e) {
        setLoadingChangeAvatar(false);
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
      {loadingChangeAvatar && (
        <View
          style={{
            position: 'absolute',
            top: DriveHeight * 0.12 - 5,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#d9d9d9',
            opacity: 0.5,
          }}>
          <Spinner color={'#43bb6c'} />
        </View>
      )}
      <View style={styles.profileUser}>
        <View style={{flex: 4, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={handleUploadFile}>
            <FastImage
              style={styles.image}
              source={
                avatar
                  ? {uri: avatar, priority: FastImage.priority.normal}
                  : IMAGE_DEFAULT
              }
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
          <Text style={styles.textWalletAndOrder}>{numberFavourite}</Text>
          <Text style={styles.subText}>Đồ Ăn Yêu Thích</Text>
        </View>
        <View style={styles.rightWalletAndOrder}>
          <Text style={styles.textWalletAndOrder}>{numberOrder}</Text>
          <Text style={styles.subText}>Đơn Hàng</Text>
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
        {/*<TouchableOpacity*/}
        {/*  style={styles.commonOther}*/}
        {/*  onPress={() => handleOptionClick('Thanh Toán', PAYMENT)}>*/}
        {/*  <MaterialIcons*/}
        {/*    name={'payment'}*/}
        {/*    size={20}*/}
        {/*    color={'rgb(245, 54, 37)'}*/}
        {/*  />*/}
        {/*  <Text*/}
        {/*    style={[styles.subTextOther, {marginHorizontal: 15}]}*/}
        {/*    numberOfLine={2}>*/}
        {/*    Thanh Toán*/}
        {/*  </Text>*/}
        {/*</TouchableOpacity>*/}
        {/*<TouchableOpacity style={styles.commonOther}>*/}
        {/*  <MaterialIcons*/}
        {/*    name={'contact-support'}*/}
        {/*    size={20}*/}
        {/*    color={'rgb(245, 54, 37)'}*/}
        {/*  />*/}
        {/*  <Text*/}
        {/*    style={[styles.subTextOther, {marginHorizontal: 15}]}*/}
        {/*    numberOfLine={2}>*/}
        {/*    Hỗ Trợ*/}
        {/*  </Text>*/}
        {/*</TouchableOpacity>*/}
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
    flex: 4,
    paddingVertical: 10,
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
    marginTop: 5,
    marginBottom: 10,
  },
  other: {
    flex: 4.5,
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
    marginVertical: 5,
  },
});

export {ProfileUserScreen};
