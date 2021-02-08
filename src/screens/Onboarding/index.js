//import node_modules
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

//import other
import {HOME_SCREEN} from '../../constants/StackNavigation';

const OnboardingScreen = ({navigation}) => {
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

  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace(HOME_SCREEN)}
      onDone={() => navigation.navigate(HOME_SCREEN)}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          image: (
            <Image
              source={require('../../../src/assets/onboarding-img1.png')}
            />
          ),
          title: 'Mua Sắm Dễ Dàng - Tiện Lợi',
          subtitle: 'Mua đồ ăn ở bất cứ đâu, bất cứ nơi nào bạn muốn !',
        },
        {
          backgroundColor: '#fdeb93',
          image: (
            <Image
              source={require('../../../src/assets/onboarding-img2.png')}
            />
          ),
          title: 'Đồ Ăn Đa Dạng',
          subtitle: 'Nhiều loại đồ ăn phù hợp cho nhiều lứa tuổi <3',
        },
        {
          backgroundColor: '#e9bcbe',
          image: (
            <Image
              source={require('../../../src/assets/onboarding-img3.png')}
            />
          ),
          title: 'Phù Hợp Với Túi Tiền',
          subtitle: 'Ăn uống thoải mải mà không cần phải lo về giá ^.^',
        },
      ]}
    />
  );
};

export {OnboardingScreen};
