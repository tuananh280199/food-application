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
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Config from 'react-native-config';
import Snackbar from 'react-native-snackbar';

//import other
import {OTP_VERIFY, SIGN_IN} from '../../constants/StackNavigation';
import {validatePhone} from '../../utils/ValidatePhone';
import {getErrorMessage} from '../../utils/HandleError';
import authAPI from '../../services/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const [data, setData] = React.useState({
    username: '',
    phone: '',
    checkUsernameChange: false,
    checkPhoneChange: false,
    isValidUser: true,
    isValidPhone: true,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const handleUsernameChange = (value) => {
    if (value.trim().length >= 4) {
      setData({
        ...data,
        username: value,
        checkUsernameChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: value,
        checkUsernameChange: false,
        isValidUser: false,
      });
    }
  };

  const handleValidUser = (value) => {
    if (value.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
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

  const checkUser = async () => {
    try {
      const response = await authAPI.checkExistsUser(data.username);
      if (response) {
        const phoneVerify = Config.PHONE_AREA_CODE + data.phone.slice(1);
        navigation.navigate(OTP_VERIFY, {
          phone: phoneVerify,
          uid: response.data.id,
        });
      }
    } catch (e) {
      Snackbar.show({
        text: getErrorMessage(e),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'rgba(245, 101, 101, 1)',
      });
    }
  };

  const handleChangePasswordSubmit = () => {
    if (data.username.length === 0 || data.phone.length === 0) {
      Alert.alert('Thông báo', 'Các trường nhập không được để trống !', [
        {text: 'OK'},
      ]);
    } else if (!data.isValidUser) {
      Alert.alert('Thông báo', 'Tài khoản không hợp lệ !', [{text: 'OK'}]);
    } else if (!data.isValidPhone) {
      Alert.alert(
        'Thông báo',
        'Số điện thoại không hợp lệ. Vui lòng kiểm tra lại !',
        [{text: 'OK'}],
      );
    } else {
      return checkUser();
    }
  };

  const handleCancel = () => {
    setData({
      username: '',
      phone: '',
      checkUsernameChange: false,
      checkPhoneChange: false,
      isValidUser: true,
      isValidPhone: true,
    });
  };

  const handleGoBack = () => {
    navigation.navigate(SIGN_IN);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.flexContainer}>
          <StatusBar backgroundColor="#20c997" barStyle="light-content" />
          <SafeAreaView style={styles.header}>
            <Text style={styles.textHeader}>Quên Mật Khẩu</Text>
          </SafeAreaView>
          <TouchableOpacity style={styles.iconBack} onPress={handleGoBack}>
            <Ionicons name="arrow-back" color={'white'} size={30} />
          </TouchableOpacity>
          <Animatable.View style={styles.footer} animation="fadeInUpBig">
            <Text style={[styles.textFooter, {marginTop: 0}]}>Tài Khoản</Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color={'#05375a'} size={20} />
              <TextInput
                placeholder="Tài khoản"
                placeholderTextColor="#666666"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(value) => handleUsernameChange(value)}
                onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
              />
              {data.checkUsernameChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>
            {data.isValidUser ? null : (
              <Animatable.View
                animation="fadeInLeft"
                duration={500}
                style={{marginTop: 5}}>
                <Text style={styles.errorMsg}>
                  Tài khoản chứa ít nhất 4 ký tự
                </Text>
              </Animatable.View>
            )}
            <Text style={[styles.textFooter, {marginTop: 15}]}>
              Số Điện Thoại
            </Text>
            <View style={styles.action}>
              <FontAwesome name="phone" color={'#05375a'} size={20} />
              <TextInput
                placeholder="Số điện thoại"
                placeholderTextColor="#666666"
                keyboardType={'numeric'}
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
                <Text style={styles.errorMsg}>
                  Số điện thoại phải đúng 10 số
                </Text>
              </Animatable.View>
            )}
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={handleChangePasswordSubmit}>
                <LinearGradient
                  colors={['#43bb6c', '#20c969']}
                  style={styles.signIn}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#fff',
                      },
                    ]}>
                    Lấy Lại Mật Khẩu
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCancel}
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
                  Huỷ
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: '#43bb6c',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBack: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 44 : 20,
    left: 20,
  },
  footer: {
    flex: 4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  textHeader: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  textFooter: {
    color: '#05375a',
    fontSize: 18,
    marginTop: 15,
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

export {ForgotPasswordScreen};
