//import node_modules
import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Snackbar from 'react-native-snackbar';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

//import other
import {PROFILE_USER_SCREEN} from '../../constants/StackNavigation';
import {validatePhone} from '../../utils/ValidatePhone';
import {validateEmail} from '../../utils/ValidateEmail';
import profileUserAPI from '../../services/profileUser';
import {getErrorMessage} from '../../utils/HandleError';
import {updateProfile} from '../../slices/authSlice';

const ChangeProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    uid,
    nameUser,
    nicknameUser,
    phoneUser,
    addressUser,
    emailUser,
  } = useSelector((state) => {
    return {
      uid: state.auth.profile?.id,
      nameUser: state.auth.profile?.name,
      nicknameUser: state.auth.profile?.nickname,
      phoneUser: state.auth.profile?.phone,
      addressUser: state.auth.profile?.address,
      emailUser: state.auth.profile?.email,
    };
  }, shallowEqual);

  const [data, setData] = React.useState({
    name: nameUser || '',
    nickname: nicknameUser || '',
    phone: phoneUser || '',
    address: addressUser || '',
    email: emailUser || '',
    checkNameChange: false,
    checkNickNameChange: false,
    checkPhoneChange: false,
    checkAddressChange: false,
    checkEmailChange: false,
    isValidPhone: true,
    isValidEmail: true,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const handleNameChange = (value) => {
    if (value.trim().length >= 1) {
      setData({
        ...data,
        name: value,
        checkNameChange: true,
      });
    } else {
      setData({
        ...data,
        name: value,
        checkNameChange: false,
      });
    }
  };

  const handleNickNameChange = (value) => {
    if (value.trim().length >= 1) {
      setData({
        ...data,
        nickname: value,
        checkNickNameChange: true,
      });
    } else {
      setData({
        ...data,
        nickname: value,
        checkNickNameChange: false,
      });
    }
  };

  const handlePhoneChange = (value) => {
    if (value.trim().length === 10 && validatePhone(value)) {
      setData({
        ...data,
        phone: value,
        checkPhoneChange: true,
        isValidPhone: true,
      });
    } else {
      setData({
        ...data,
        phone: value,
        checkPhoneChange: false,
        isValidPhone: false,
      });
    }
  };

  const handleAddressChange = (value) => {
    if (value.trim().length >= 1) {
      setData({
        ...data,
        address: value,
        checkAddressChange: true,
      });
    } else {
      setData({
        ...data,
        address: value,
        checkAddressChange: false,
      });
    }
  };

  const handleEmailChange = (value) => {
    if (validateEmail(value)) {
      setData({
        ...data,
        email: value,
        checkEmailChange: true,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        email: value,
        checkEmailChange: false,
        isValidEmail: false,
      });
    }
  };

  const handleChangePasswordSubmit = async () => {
    if (!data.isValidPhone) {
      Alert.alert(
        'Thông báo',
        'Số điện thoại không hợp lệ. Vui lòng kiểm tra lại !',
        [{text: 'OK'}],
      );
    } else if (!data.isValidEmail) {
      Alert.alert('Thông báo', 'Email không hợp lệ. Vui lòng kiểm tra lại !', [
        {text: 'OK'},
      ]);
    } else {
      try {
        const params = {
          name: data.name,
          nickname: data.nickname,
          phone: data.phone,
          address: data.address,
          email: data.email,
        };
        const response = await profileUserAPI.changeProfileUser(uid, params);
        await dispatch(updateProfile({profile: response.data}));
        navigation.navigate(PROFILE_USER_SCREEN);
      } catch (e) {
        Snackbar.show({
          text: getErrorMessage(e),
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'rgba(245, 101, 101, 1)',
        });
      }
    }
  };

  const handleCancel = () => {
    setData({
      name: '',
      nickname: '',
      phone: '',
      address: '',
      email: '',
      checkNameChange: false,
      checkNickNameChange: false,
      checkPhoneChange: false,
      checkAddressChange: false,
      checkEmailChange: false,
      isValidPhone: true,
      isValidEmail: true,
    });
  };

  const handleGoBack = () => {
    navigation.navigate(PROFILE_USER_SCREEN);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.flexContainer}>
        <StatusBar backgroundColor="#20c997" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.textHeader}>Sửa Thông Tin</Text>
        </View>
        <TouchableOpacity style={styles.iconBack} onPress={handleGoBack}>
          <Ionicons name="arrow-back" color={'white'} size={30} />
        </TouchableOpacity>
        <Animatable.View style={styles.footer} animation="fadeInUpBig">
          <Text style={[styles.textFooter]}>Tên Khách Hàng</Text>
          <View style={styles.action}>
            <FontAwesome name="user" color={'#05375a'} size={20} />
            <TextInput
              placeholder="Tên khách hàng"
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(value) => handleNameChange(value)}
              value={data.name}
            />
            {data.checkNameChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text style={[styles.textFooter, {marginTop: 15}]}>Bí Danh</Text>
          <View style={styles.action}>
            <FontAwesome name="user-secret" color={'#05375a'} size={20} />
            <TextInput
              placeholder="Bí danh"
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(value) => handleNickNameChange(value)}
              value={data.nickname}
            />
            {data.checkNickNameChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text style={[styles.textFooter, {marginTop: 15}]}>
            Số Điện Thoại
          </Text>
          <View style={styles.action}>
            <FontAwesome name="phone" color={'#05375a'} size={20} />
            <TextInput
              placeholder="Số điện thoại"
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(value) => handlePhoneChange(value)}
              value={data.phone}
            />
            {data.checkPhoneChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidPhone ? null : (
            <Animatable.View
              animation="fadeInLeft"
              duration={500}
              style={{marginTop: 5}}>
              <Text style={styles.errorMsg}>Số điện thoại phải đúng 10 số</Text>
            </Animatable.View>
          )}
          <Text style={[styles.textFooter, {marginTop: 15}]}>Địa Chỉ</Text>
          <View style={styles.action}>
            <Entypo name="address" color={'#05375a'} size={20} />
            <TextInput
              placeholder="Địa chỉ"
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(value) => handleAddressChange(value)}
              value={data.address}
            />
            {data.checkAddressChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text style={[styles.textFooter, {marginTop: 15}]}>Email</Text>
          <View style={styles.action}>
            <Entypo name="email" color={'#05375a'} size={20} />
            <TextInput
              placeholder="example@gmail.com"
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(value) => handleEmailChange(value)}
              value={data.email}
            />
            {data.checkEmailChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidEmail ? null : (
            <Animatable.View
              animation="fadeInLeft"
              duration={500}
              style={{marginTop: 5}}>
              <Text style={styles.errorMsg}>Email chưa đúng định dạng</Text>
            </Animatable.View>
          )}
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={handleChangePasswordSubmit}>
              <LinearGradient
                colors={['#08d4c4', '#20c997']}
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  Đổi Thông Tin
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancel}
              style={[
                styles.signIn,
                {
                  borderColor: '#20c997',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#20c997',
                  },
                ]}>
                Huỷ
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: '#20c997',
  },
  iconBack: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 44 : 20,
    left: 20,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 3.5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  textHeader: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  textFooter: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export {ChangeProfileScreen};
