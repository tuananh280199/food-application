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
  SafeAreaView
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

//import other
import {SIGN_IN} from '../../constants/StackNavigation';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const [data, setData] = React.useState({
    passwordOld: '',
    passwordNew: '',
    confirmPassword: '',
    secureTextEntryNew: true,
    confirmSecureTextEntry: true,
    isValidPasswordNew: true,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const handlePasswordOldChange = (value) => {
    setData({
      ...data,
      passwordOld: value,
    });
  };

  const handlePasswordNewChange = (value) => {
    if (value.trim().length >= 8) {
      setData({
        ...data,
        passwordNew: value,
        isValidPasswordNew: true,
      });
    } else {
      setData({
        ...data,
        passwordNew: value,
        isValidPasswordNew: false,
      });
    }
  };

  const handleConfirmPasswordChange = (value) => {
    setData({
      ...data,
      confirmPassword: value,
    });
  };

  const changeSecureTextEntryNew = () => {
    setData({
      ...data,
      secureTextEntryNew: !data.secureTextEntryNew,
    });
  };

  const changeConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirmSecureTextEntry: !data.confirmSecureTextEntry,
    });
  };

  const handleChangePasswordSubmit = () => {
    if (
      data.passwordOld.length === 0 ||
      data.passwordNew.length === 0 ||
      data.confirmPassword.length === 0
    ) {
      Alert.alert('Thông báo', 'Các trường nhập không được để trống !', [
        {text: 'OK'},
      ]);
    } else if (!data.isValidPasswordNew) {
      Alert.alert('Thông báo', 'Mật khẩu mới không hợp lệ !', [{text: 'OK'}]);
    } else if (data.confirmPassword !== data.passwordNew) {
      Alert.alert(
        'Thông báo',
        'Mật khẩu và xác nhận mật khẩu khác nhau. Vui lòng kiểm tra lại !',
        [{text: 'OK'}],
      );
    } else {
      //todo
      Alert.alert('Thông báo', 'Đổi mật khẩu thành công !', [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.flexContainer}>
        <StatusBar backgroundColor="#20c997" barStyle="light-content" />
        <SafeAreaView style={styles.header}>
          <Text style={styles.textHeader}>Quên Mật Khẩu</Text>
        </SafeAreaView>
        <Animatable.View style={styles.footer} animation="fadeInUpBig">
          <Text style={[styles.textFooter, {marginTop: 0}]}>Mật Khẩu Cũ</Text>
          <View style={styles.action}>
            <Feather name="lock" color={'#05375a'} size={20} />
            <TextInput
              placeholder="Mật khẩu cũ"
              placeholderTextColor="#666666"
              secureTextEntry={false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(value) => handlePasswordOldChange(value)}
            />
          </View>
          <Text style={styles.textFooter}>Mật Khẩu Mới</Text>
          <View style={styles.action}>
            <Feather name="lock" color={'#05375a'} size={20} />
            <TextInput
              placeholder="Mật khẩu mới"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntryNew ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(value) => handlePasswordNewChange(value)}
            />
            <TouchableOpacity onPress={changeSecureTextEntryNew}>
              {data.secureTextEntryNew ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {data.isValidPasswordNew ? null : (
            <Animatable.View
              animation="fadeInLeft"
              duration={500}
              style={{marginTop: 5}}>
              <Text style={styles.errorMsg}>Mật khẩu chứa ít nhất 8 kí tự</Text>
            </Animatable.View>
          )}
          <Text style={styles.textFooter}>
            Xác Nhận Mật Khẩu
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={'#05375a'} size={20} />
            <TextInput
              placeholder="Xác nhận mật khẩu"
              placeholderTextColor="#666666"
              secureTextEntry={data.confirmSecureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(value) => handleConfirmPasswordChange(value)}
            />
            <TouchableOpacity onPress={changeConfirmSecureTextEntry}>
              {data.confirmSecureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
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
                  Đổi Mật Khẩu
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(SIGN_IN)}
              style={[
                styles.signIn,
                {
                  borderColor: '#43bb6c',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#43bb6c',
                  },
                ]}>
                Đăng Nhập
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
    backgroundColor: '#43bb6c',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textHeader: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  textFooter: {
    color: '#05375a',
    fontSize: 18,
    marginTop: Platform.OS === 'ios' ? 30 : 15,
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

export {ForgotPasswordScreen};
