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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import Snackbar from 'react-native-snackbar';

//import other
import {
  SIGN_UP,
  FORGOT_PASSWORD,
  PROFILE_USER_SCREEN,
} from '../../constants/StackNavigation';
import authAPI from '../../services/auth';
import {login} from '../../slices/authSlice';
import {getErrorMessage} from '../../utils/HandleError';

const SignInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [data, setData] = React.useState({
    username: '',
    password: '',
    checkUsernameChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

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

  const handlePasswordChange = (value) => {
    if (value.trim().length >= 8) {
      setData({
        ...data,
        password: value,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: value,
        isValidPassword: false,
      });
    }
  };

  const changeSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
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

  const handleLoginSubmit = async () => {
    if (data.username.length === 0 || data.password.length === 0) {
      Alert.alert('Thông báo', 'Tài khoản và mật khẩu không được để trống !', [
        {text: 'OK'},
      ]);
    } else if (!data.isValidUser || !data.isValidPassword) {
      Alert.alert('Thông báo', 'Tài khoản hoặc mật khẩu không hợp lệ !', [
        {text: 'OK'},
      ]);
    } else {
      try {
        const params = {
          username: data.username,
          password: data.password,
        };
        const response = await authAPI.login(params);
        await dispatch(
          login({
            token: response.profile.access_token,
            profile: response.profile,
          }),
        );
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

  const handleGoBack = () => {
    navigation.navigate(PROFILE_USER_SCREEN);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.flexContainer}>
        <StatusBar backgroundColor="#20c997" barStyle="light-content" />
        <SafeAreaView style={styles.header}>
          <Text style={styles.textHeader}>Đăng Nhập</Text>
          <TouchableOpacity style={styles.iconBack} onPress={handleGoBack}>
            <Ionicons name="arrow-back" color={'white'} size={30} />
          </TouchableOpacity>
        </SafeAreaView>
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
          <Text style={styles.textFooter}>Mật Khẩu</Text>
          <View style={styles.action}>
            <Feather name="lock" color={'#05375a'} size={20} />
            <TextInput
              placeholder="Mật khẩu"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(value) => handlePasswordChange(value)}
            />
            <TouchableOpacity onPress={changeSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {data.isValidPassword ? null : (
            <Animatable.View
              animation="fadeInLeft"
              duration={500}
              style={{marginTop: 5}}>
              <Text style={styles.errorMsg}>Mật khẩu chứa ít nhất 8 kí tự</Text>
            </Animatable.View>
          )}
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate(FORGOT_PASSWORD)}>
              <Text style={{color: '#43bb6c', marginTop: 30}}>
                Quên mật khẩu ?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={handleLoginSubmit}>
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
                  Đăng Nhập
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
                Đăng Ký
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

export {SignInScreen};
