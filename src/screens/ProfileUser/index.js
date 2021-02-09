//import node_module
import React, {useState, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

//import other
import IMAGE_DEFAULT from '../../assets/default-placeholder-image.png';

const ProfileUserScreen = () => {
  const [signIn, setSignIn] = useState(false);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Profile',
      headerRight: () => (
        <TouchableOpacity style={{marginRight: 10}} onPress={() => {}}>
          <FontAwesome5 name={'user-edit'} size={18} />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View style={styles.flexContainer}>
      <View style={styles.profileUser}>
        <View style={{flex: 4, flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Image style={styles.image} source={IMAGE_DEFAULT} />
            <View style={styles.wrapperIcon}>
              <Entypo name={'camera'} size={16} color={'white'} />
            </View>
          </View>
          <View>
            <Text style={styles.text}>Nguyen Duc Tuan Anh</Text>
            <Text style={styles.subText}>@Nickname</Text>
          </View>
        </View>
        <View style={{flex: 6, justifyContent: 'center'}}>
          <View style={styles.commonInfo}>
            <Entypo name={'location'} size={20} />
            <Text
              style={[styles.subText, {marginHorizontal: 15}]}
              numberOfLine={2}>
              Tân Hội - Đan Phượng - Hà Nội
            </Text>
          </View>
          <View style={styles.commonInfo}>
            <FontAwesome name={'phone'} size={20} />
            <Text
              style={[styles.subText, {marginHorizontal: 15}]}
              numberOfLine={2}>
              +84 - 372842282
            </Text>
          </View>
          <View style={styles.commonInfo}>
            <MaterialCommunityIcons name={'email'} size={20} />
            <Text
              style={[styles.subText, {marginHorizontal: 15}]}
              numberOfLine={2}>
              example@gmail.com
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
        <TouchableOpacity style={styles.commonOther}>
          <AntDesign name={'hearto'} size={20} color={'rgb(245, 54, 37)'} />
          <Text
            style={[styles.subTextOther, {marginHorizontal: 15}]}
            numberOfLine={2}>
            Đồ Ăn Yêu Thích
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commonOther}>
          <Entypo name={'list'} size={20} color={'rgb(245, 54, 37)'} />
          <Text
            style={[styles.subTextOther, {marginHorizontal: 15}]}
            numberOfLine={2}>
            Lịch Sử Mua Hàng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commonOther}>
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
        <TouchableOpacity style={styles.commonOther}>
          <AntDesign name={'setting'} size={20} color={'rgb(245, 54, 37)'} />
          <Text
            style={[styles.subTextOther, {marginHorizontal: 15}]}
            numberOfLine={2}>
            Cài Đặt
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.commonOther}>
          <FontAwesome
            name={signIn ? 'sign-in' : 'sign-out'}
            size={20}
            color={'rgb(245, 54, 37)'}
          />
          <Text
            style={[styles.subTextOther, {marginHorizontal: 15}]}
            numberOfLine={2}>
            {signIn ? 'Đăng Nhập' : 'Đăng Xuất'}
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
    marginVertical: 10,
    alignItems: 'center',
  },
  commonOther: {
    flexDirection: 'row',
    marginVertical: 15,
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
    top: 50,
    left: 40,
    width: 25,
    height: 25,
    borderRadius: 25,
    borderWidth: 1,
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
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export {ProfileUserScreen};
