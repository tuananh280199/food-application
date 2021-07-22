//import modules
import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

//Others
import {DriveHeight, DriveWidth} from '../../constants/Dimensions';
import {OrderStatus} from '../../utils/OrderStatus';
import {resetOrder} from '../../notifications/slice/notificationSlice';

const labels = [
  'Chờ Xác Nhận',
  'Xác Nhận Đơn Hàng',
  'Đang Giao Hàng',
  'Đã Giao',
];
const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2.5,
  currentStepStrokeWidth: 2.5,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 2.5,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#999999',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#999999',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013',
};

const getStepIndicatorIconConfig = (
  {
    position,
    stepStatus,
  }: {
    position: number,
    stepStatus: string,
  },
  currentPosition,
) => {
  const iconConfig = {
    name: 'feed',
    color:
      stepStatus === 'finished'
        ? '#ffffff'
        : position == currentPosition
        ? '#fe7013'
        : 'gray',
    size: 17,
  };
  switch (position) {
    case 0: {
      iconConfig.name = 'pending';
      break;
    }
    case 1: {
      iconConfig.name = 'check';
      break;
    }
    case 2: {
      iconConfig.name = 'delivery-dining';
      break;
    }
    case 3: {
      iconConfig.name = 'done-all';
      break;
    }
    default: {
      break;
    }
  }
  return iconConfig;
};

const iconForLabel = (position, currentPosition) => {
  if (position === 0) {
    if (position <= currentPosition) {
      return require('../../assets/pending-choose.png');
    } else {
      return require('../../assets/pending.jpeg');
    }
  } else if (position === 1) {
    if (position <= currentPosition) {
      return require('../../assets/confirm-choose.png');
    } else {
      return require('../../assets/confirm.png');
    }
  } else if (position === 2) {
    if (position <= currentPosition) {
      return require('../../assets/shipping-choose.png');
    } else {
      return require('../../assets/shipping.png');
    }
  } else {
    if (position <= currentPosition) {
      return require('../../assets/done-order-choose.png');
    } else {
      return require('../../assets/done-order.png');
    }
  }
};

const subLabel = (position) => {
  let title = '';
  switch (position) {
    case 0: {
      title = 'Vui lòng chờ xác nhận đơn hàng';
      break;
    }
    case 1: {
      title = 'Đơn hàng của bạn được xác nhận';
      break;
    }
    case 2: {
      title = 'Tài xế đang giao hàng cho bạn';
      break;
    }
    case 3: {
      title = 'Đơn hàng của bạn đã được giao';
      break;
    }
    default: {
      break;
    }
  }
  return title;
};

const renderLabel = ({
  position,
  label,
  currentPosition,
}: {
  position: number,
  stepStatus: string,
  label: string,
  currentPosition: number,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <View
        style={{
          height: 50,
          justifyContent: 'space-evenly',
          width: DriveWidth - 135,
        }}>
        <Text
          style={
            position <= currentPosition
              ? styles.stepLabelSelected
              : styles.stepLabel
          }>
          {label}
        </Text>
        <Text
          style={
            position <= currentPosition
              ? [styles.stepLabelSelected, {fontSize: 14}]
              : [styles.stepLabel, {fontSize: 14, color: '#808080'}]
          }>
          {subLabel(position)}
        </Text>
      </View>
      <Image
        source={iconForLabel(position, currentPosition)}
        style={[styles.iconStatus]}
      />
    </View>
  );
};

export const TrackOrder = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const orderStatus = useSelector(
    (state) => state.notification.orderStatus.status,
  );

  // console.log('orderStatus: ', orderStatus);

  const [currentPosition, setCurrentPosition] = useState(-1);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    getOrderStatus();
  }, [orderStatus]);

  useEffect(() => {
    if (currentPosition === 3) {
      let timeout = setTimeout(() => {
        setCurrentPosition(-1);
        dispatch(resetOrder());
      }, 5000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [currentPosition]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getOrderStatus = () => {
    switch (orderStatus) {
      case OrderStatus.pending:
        setCurrentPosition(0);
        break;
      case OrderStatus.confirm:
        setCurrentPosition(1);
        break;
      case OrderStatus.delivery:
        setCurrentPosition(2);
        break;
      case OrderStatus.done:
        setCurrentPosition(3);
        break;
      case OrderStatus.cancel:
        dispatch(resetOrder());
        Alert.alert(
          'Đơn hàng của bạn đã bị huỷ. Vui lòng đặt hàng vào thời gian khác !',
        );
        break;
      default:
        setCurrentPosition(-1);
        break;
    }
  };

  const renderStepIndicator = (params: any) => (
    <MaterialIcons {...getStepIndicatorIconConfig(params, currentPosition)} />
  );

  if (currentPosition === -1) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={[styles.header]}>
          <TouchableOpacity onPress={handleGoBack} style={{marginLeft: 20}}>
            <Ionicons name="arrow-back" color={'white'} size={25} />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Theo Dõi Đơn Hàng</Text>
          <View style={{width: DriveWidth * 0.1}} />
        </SafeAreaView>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../../assets/logo-khoaikhau.png')}
            style={{
              width: DriveHeight * 0.065,
              height: DriveHeight * 0.065,
              marginBottom: 10,
            }}
          />
          <Text style={{color: '#43bb6c', fontSize: 20, fontWeight: '500'}}>
            Không Có Tiến Trình Đơn Hàng
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={[styles.header]}>
        <TouchableOpacity onPress={handleGoBack} style={{marginLeft: 20}}>
          <Ionicons name="arrow-back" color={'white'} size={25} />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Theo Dõi Đơn Hàng</Text>
        <View style={{width: DriveWidth * 0.1}} />
      </SafeAreaView>
      <View style={styles.title}>
        <Image
          source={require('../../assets/logo-khoaikhau.png')}
          style={{
            width: 30,
            height: 30,
            resizeMode: 'contain',
          }}
        />
        <Text style={styles.txtTitle}> Tiến Trình Đơn Hàng </Text>
        <Image
          source={require('../../assets/logo-khoaikhau.png')}
          style={{
            width: 30,
            height: 30,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={styles.wrapContent}>
        <StepIndicator
          stepCount={4}
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
          direction={'vertical'}
          renderStepIndicator={renderStepIndicator}
          renderLabel={renderLabel}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
  },
  title: {
    flexDirection: 'row',
    marginTop: 10,
    height: DriveHeight * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  txtTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#43bb6c',
    marginHorizontal: 5,
  },
  wrapContent: {
    flex: 1,
    marginHorizontal: 20,
  },
  stepLabelSelected: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    color: '#fe7013',
  },
  stepLabel: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  iconStatus: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
  },
});
