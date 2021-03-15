import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DriveHeight, DriveWidth} from '../../constants/Dimensions';
import {CartItem} from './components/CartItem';
import LinearGradient from 'react-native-linear-gradient';

const CartScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOrder = () => {
    console.log('order');
  };

  const renderItem = ({item, index}) => {
    return <CartItem />;
  };

  return (
    <View style={styles.flexContainer}>
      <View
        style={[
          styles.header,
          Platform.OS === 'ios' ? {paddingTop: 20} : null,
        ]}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" color={'white'} size={25} />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Cart Food</Text>
        <View style={{width: 25}} />
      </View>
      <FlatList
        style={{paddingTop: 9}}
        maxToRenderPerBatch={50}
        initialNumToRender={30}
        showsVerticalScrollIndicator={false}
        data={[1, 2, 3]}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        renderItem={renderItem}
      />
      <View style={styles.footer}>
        <View style={styles.headerFooter}>
          <Text style={styles.textFooter}>Tổng Tiền : </Text>
          <Text style={[styles.textFooter, {fontSize: 28}]}>1.000.000₫</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={styles.order} onPress={() => handleOrder()}>
            <LinearGradient
              colors={['#43bb6c', '#20c969']}
              style={styles.order}>
              <Text
                style={[
                  styles.textOrder,
                  {
                    color: '#fff',
                  },
                ]}>
                ĐẶT HÀNG
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: DriveWidth,
    height: DriveHeight * 0.12,
    backgroundColor: '#43bb6c',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: 3,
  },
  titleHeader: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
  },
  footer: {
    backgroundColor: '#fff',
    height: DriveHeight * 0.15,
    justifyContent: 'space-around',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 5,
    shadowColor: '#43bb6c',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 1.5,
    elevation: 1,
  },
  headerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textFooter: {
    fontSize: 22,
    fontWeight: '500',
  },
  order: {
    width: '95%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textOrder: {
    fontSize: 20,
    fontWeight: '500',
  },
});

export {CartScreen};
