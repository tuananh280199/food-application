//import node_modules
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {useDispatch} from 'react-redux';

//import other
import {HOME_SCREEN} from '../../constants/StackNavigation';
import {firstIsLaunch} from '../../slices/authSlice';
import {DriveHeight, DriveWidth} from '../../constants/Dimensions';

const Dots = ({selected}) => {
  let backgroundColor;

  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        borderRadius: 6,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontSize: 16}}>Bỏ Qua</Text>
  </TouchableOpacity>
);

const Next = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontSize: 16}}>Tiếp Theo</Text>
  </TouchableOpacity>
);

const Done = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontSize: 16}}>Đến Trang Chủ</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => {
        dispatch(firstIsLaunch(false));
        navigation.replace(HOME_SCREEN);
      }}
      onDone={() => {
        dispatch(firstIsLaunch(false));
        navigation.replace(HOME_SCREEN);
      }}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          image: (
            <Image
              source={require('../../../src/assets/onboarding-img1.png')}
              style={styles.images}
            />
          ),
          title: 'Mua Sắm Dễ Dàng',
          subtitle: 'Mua đồ ăn ở bất cứ đâu, bất cứ nơi nào bạn muốn !',
          titleStyles: {
            marginTop: 120,
          },
        },
        {
          backgroundColor: '#fdeb93',
          image: (
            <Image
              source={require('../../../src/assets/onboarding-img2.png')}
              style={styles.images}
            />
          ),
          title: 'Đồ Ăn Đa Dạng',
          subtitle: 'Nhiều loại đồ ăn phù hợp cho nhiều lứa tuổi <3',
          titleStyles: {
            marginTop: 120,
          },
        },
        {
          backgroundColor: '#e9bcbe',
          image: (
            <Image
              source={require('../../../src/assets/onboarding-img3.png')}
              style={styles.images}
            />
          ),
          title: 'Phù Hợp Với Túi Tiền',
          subtitle: 'Ăn uống thoải mải mà không cần phải lo về giá ^.^',
          titleStyles: {
            marginTop: 120,
          },
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  images: {
    position: 'absolute',
    bottom: -80,
  },
});

export {OnboardingScreen};
