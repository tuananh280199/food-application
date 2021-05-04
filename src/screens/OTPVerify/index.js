//node_modules
import React, {useLayoutEffect, useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

//others
import {DriveHeight, DriveWidth} from '../../constants/Dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NEW_PASSWORD} from '../../constants/StackNavigation';

const defaultCountdown = 60;
const lengthInput = 6;
let clockCall = null;

export const OTPVerify = () => {
  const navigation = useNavigation();
  const route = useRoute();
  let textInput = useRef(null);
  const [value, setValue] = useState('');
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [enableChangeNumber, setEnableChangeNumber] = useState(false);
  const [enableResend, setEnableResend] = useState(false);
  const [confirmCodeOTP, setConfirmCodeOTP] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    verifyCodeOTP();
    return () => {
      clearInterval(clockCall);
    };
  }, []);

  const verifyCodeOTP = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        route.params?.phone,
      );
      setConfirmCodeOTP(confirmation);
      clockCall = setInterval(() => {
        decrementTime();
      }, 1000);
    } catch (e) {
      Alert.alert('Có lỗi xảy ra. Vui lòng thử lại sau !');
    }
  };

  const confirmCode = async (val) => {
    try {
      const response = await confirmCodeOTP.confirm(val.toString());
      if (response) {
        navigation.navigate(NEW_PASSWORD, {uid: route.params?.uid});
      }
    } catch (e) {
      setValue('');
      setConfirmCodeOTP(null);
      Alert.alert('Có lỗi xảy ra. Vui lòng thử lại sau !');
    }
  };

  // useEffect(() => {
  //   clockCall = setInterval(() => {
  //     decrementTime();
  //   }, 1000);
  //
  //   return () => {
  //     clearInterval(clockCall);
  //   };
  // });

  const decrementTime = () => {
    if (countdown === 0) {
      setEnableResend(true);
      setCountdown(0);
      clearInterval(clockCall);
    } else {
      setCountdown(countdown - 1);
    }
  };

  useEffect(() => {
    textInput.focus();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const onChangeText = (val) => {
    setValue(val);
    if (val.length === 0) {
      setEnableChangeNumber(false);
    } else {
      setEnableChangeNumber(true);
    }
    if (val.length === lengthInput) {
      return confirmCode(val);
    }
  };

  const onChangeNumber = () => {
    setValue('');
  };

  const onResendOTP = async () => {
    if (enableResend) {
      await verifyCodeOTP();
      setCountdown(defaultCountdown);
      setEnableResend(false);
      clearInterval(clockCall);
      clockCall = setInterval(() => {
        decrementTime();
      }, 1000);
    }
  };

  return (
    <View style={styles.flexContainer}>
      <SafeAreaView style={[styles.header]}>
        <TouchableOpacity onPress={handleGoBack}>
          <AntDesign name={'arrowleft'} size={24} color={'#fff'} />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Xác Thực OTP</Text>
        <View style={{width: 24}} />
      </SafeAreaView>
      <KeyboardAvoidingView
        keyboardVerticalOffset={10}
        behavior={Platform.OS === 'ios' && 'padding'}
        style={styles.containerAvoidingView}>
        <Text style={styles.textTitle}>
          Nhập Mã OTP Của Bạn Được Gửi Qua SMS
        </Text>
        <View>
          <TextInput
            ref={(input) => (textInput = input)}
            style={{width: 0, height: 0}}
            maxLength={lengthInput}
            value={value}
            onChangeText={onChangeText}
            returnKeyType="done"
            keyboardType="numeric"
          />
          <View style={styles.containerInput}>
            {Array(lengthInput)
              .fill()
              .map((data, index) => (
                <TouchableOpacity
                  style={[
                    styles.cellView,
                    {
                      borderBottomColor:
                        index === value.length ? '#FB6C6A' : '#234DB7',
                    },
                  ]}
                  key={index}
                  onPress={() => textInput.focus()}>
                  <Text style={styles.cellText}>
                    {value && value.length > 0 ? value[index] : ''}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>

        <View style={styles.bottomView}>
          <TouchableOpacity onPress={onChangeNumber}>
            <View style={styles.btnChangeNumber}>
              <Text
                style={[
                  styles.textChange,
                  {
                    color: enableChangeNumber ? '#234DB7' : 'gray',
                  },
                ]}>
                Nhập Lại OTP
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onResendOTP}>
            <View style={styles.btnResend}>
              <Text
                style={[
                  styles.textResend,
                  {
                    color: enableResend ? '#234DB7' : 'gray',
                  },
                ]}>
                Gửi Lại OTP {!enableResend && `(${countdown}s)`}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    justifyContent: 'space-around',
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
  containerAvoidingView: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  textTitle: {
    marginVertical: 50,
    fontSize: 16,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellView: {
    paddingVertical: 11,
    width: 40,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1.5,
  },
  cellText: {
    textAlign: 'center',
    fontSize: 16,
  },
  bottomView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  btnChangeNumber: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textChange: {
    color: '#234DB7',
    alignItems: 'center',
    fontSize: 15,
  },
  btnResend: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textResend: {
    alignItems: 'center',
    fontSize: 15,
  },
});
