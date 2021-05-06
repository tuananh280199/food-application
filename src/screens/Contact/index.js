//node_modules
import React, {useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import MapView, {Marker} from 'react-native-maps';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';

//others
import {DriveHeight, DriveWidth} from '../../constants/Dimensions';
import {Divider} from '../../components/Divider';

const markerList = [
  {
    title: 'Cơ Sở 1',
    description: 'Tân Hội - Đan Phượng - Hà Nội',
    latlng: {
      latitude: 21.094422847698965,
      longitude: 105.70301171339119,
    },
  },
  {
    title: 'Cơ Sở 2',
    description: 'Nguyễn Cơ Thạch - Từ Liêm - Hà Nội',
    latlng: {latitude: 21.038101, longitude: 105.767194},
  },
  {
    title: 'Cơ Sở 3',
    description: 'Quan Hoa - Cầu Giấy - Hà Nội',
    latlng: {latitude: 21.036687, longitude: 105.796664},
  },
  {
    title: 'Cơ Sở 4',
    description: 'Nhân Chính - Thanh Xuân - Hà Nội',
    latlng: {latitude: 21.005193, longitude: 105.804222},
  },
];

const ContactScreen = () => {
  const navigation = useNavigation();
  const [markers] = useState(markerList || []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.flexContainer}>
      <SafeAreaView style={[styles.header]}>
        <Text style={styles.titleHeader}>LIÊN HỆ</Text>
      </SafeAreaView>
      <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <MapView
            style={{
              height: '100%',
              width: DriveWidth,
            }}
            zoomEnabled={true}
            scrollEnabled={true}
            showsScale={true}
            region={{
              latitude: 21.038101,
              longitude: 105.767194,
              latitudeDelta: 0.0922 * 2,
              longitudeDelta: 0.0421 * 2,
            }}>
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}>
                <Image
                  source={require('../../assets/map-marker.png')}
                  style={{width: 26, height: 28}}
                  resizeMode="contain"
                />
              </Marker>
            ))}
          </MapView>
        </View>
        <View style={styles.content}>
          <View style={{paddingHorizontal: 10, paddingTop: 20}}>
            <Text style={{fontSize: 16}}>Chi Nhánh Của Khoái Khẩu</Text>
          </View>
          <View style={styles.item}>
            <Text>Cơ Sở 1</Text>
            <Text>Tân Hội - Đan Phượng - Hà Nội</Text>
          </View>
          <Divider style={{marginHorizontal: 20}} />
          <View style={styles.item}>
            <Text>Cơ Sở 2</Text>
            <Text>Nguyễn Cơ Thạch - Từ Liêm - Hà Nội</Text>
          </View>
          <Divider style={{marginHorizontal: 20}} />
          <View style={styles.item}>
            <Text>Cơ Sở 3</Text>
            <Text>Quan Hoa - Cầu Giấy - Hà Nội</Text>
          </View>
          <Divider style={{marginHorizontal: 20}} />
          <View style={styles.item}>
            <Text>Cơ Sở 4</Text>
            <Text>Nhân Chính - Thanh Xuân - Hà Nội</Text>
          </View>
        </View>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Gửi Email"
            onPress={() => console.log('notes tapped!')}>
            <Fontisto name="email" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Gửi Tin Nhắn"
            onPress={() => {}}>
            <Fontisto name="messenger" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#1abc9c"
            title="Gọi Điện"
            onPress={() => {}}>
            <FontAwesome5 name="phone" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
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
    justifyContent: 'center',
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
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: '#f8fffa',
    justifyContent: 'space-around',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
});

export {ContactScreen};
