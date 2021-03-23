import React, {useLayoutEffect, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Platform,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import {Image} from 'react-native-animatable';
import Snackbar from 'react-native-snackbar';

//others
import {InformationFoodTab} from './components/InformationFoodTab';
import {DriveHeight, DriveWidth} from '../../constants/Dimensions';
import {Rating} from '../../components/Rating';
import {getErrorMessage} from '../../utils/HandleError';
import productAPI from '../../services/product';
import {roundHalfRate} from '../../utils/RoundHalfRate';
import {useSelector} from 'react-redux';

const FoodDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {product_id} = route.params;

  const {id} = useSelector((state) => state.auth.profile);

  const [product, setProduct] = useState({});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    try {
      const {data} = await productAPI.getDetailProduct(product_id);
      setProduct(data);
    } catch (e) {
      Snackbar.show({
        text: getErrorMessage(e),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'rgba(245, 101, 101, 1)',
      });
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAddFavourite = async () => {
    if (!id) {
      Alert.alert(
        'Thông báo',
        'Vui lòng đăng nhập trước khi thêm đồ ăn vào danh sách yêu thích!',
        [{text: 'OK'}],
      );
      return;
    }
    try {
      //TODO
    } catch (e) {
      Snackbar.show({
        text: getErrorMessage(e),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'rgba(245, 101, 101, 1)',
      });
    }
  };

  const handleAddToCart = () => {
    console.log('add to cart');
  };

  const renderItemSubImage = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => {}}>
        <FastImage
          style={styles.subImage}
          source={{
            uri: product?.image,
            priority: FastImage.priority.normal,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.flexContainer}>
      <FastImage
        style={styles.imageBackground}
        source={{
          uri: product?.image,
          priority: FastImage.priority.normal,
        }}>
        <SafeAreaView>
          <View
            style={[
              styles.headerImage,
              Platform.OS === 'android' ? {marginTop: 15} : null,
            ]}>
            <TouchableOpacity style={styles.btnHeader} onPress={handleGoBack}>
              <AntDesign name={'arrowleft'} size={24} color={'#fff'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnHeader}
              onPress={handleAddFavourite}>
              <AntDesign name={'heart'} size={24} color={'#fff'} />
            </TouchableOpacity>
          </View>
          <View style={styles.bodyImage}>
            <Text style={[styles.text, {fontSize: 32, fontWeight: '700'}]}>
              {product?.name}
            </Text>
            <View style={styles.divider} />
            <Rating
              styleContainer={{marginTop: 10}}
              styleTitle={[styles.text, {fontSize: 18, fontWeight: '500'}]}
              rating={roundHalfRate(product?.like, product?.dislike)}
              like={product?.like}
              dislike={product?.dislike}
              size={19}
              maxRate={5}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  styles.text,
                  {fontSize: 18, fontWeight: '600', marginTop: 7},
                  product?.sale === 1
                    ? {
                        textDecorationLine: 'line-through',
                        textDecorationStyle: 'solid',
                      }
                    : null,
                ]}>
                {product?.price?.toLocaleString('vi', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </Text>
              {product?.sale === 1 ? (
                <Text
                  style={[
                    styles.text,
                    {
                      fontSize: 21,
                      fontWeight: '600',
                      marginTop: 7,
                      marginLeft: 5,
                      color: 'red',
                    },
                  ]}>
                  {product?.priceSale?.toLocaleString('vi', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </Text>
              ) : (
                <></>
              )}
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonAddCart}
            onPress={handleAddToCart}>
            <Text
              style={[
                styles.text,
                {fontSize: 16, fontWeight: '600', color: 'purple'},
              ]}>
              THÊM VÀO GIỎ HÀNG
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </FastImage>
      <View style={styles.footer}>
        <Image source={require('../../assets/line.png')} style={styles.line} />
        <View>
          <FlatList
            horizontal
            maxToRenderPerBatch={50}
            initialNumToRender={30}
            data={[1, 2, 3]}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            renderItem={renderItemSubImage}
          />
        </View>
      </View>
      <InformationFoodTab product={product} />
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageBackground: {
    width: DriveWidth,
  },
  btnHeader: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 8,
  },
  headerImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bodyImage: {
    marginTop: DriveHeight * 0.12,
    marginBottom: 28,
    paddingLeft: 32,
  },
  text: {
    color: 'whitesmoke',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 8,
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    width: 150,
    marginTop: 8,
  },
  buttonAddCart: {
    backgroundColor: 'rgba(255, 255, 255 , 0.7)',
    alignSelf: 'flex-start',
    marginBottom: 56,
    marginLeft: 32,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 100,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 8,
  },
  footer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -32,
    paddingHorizontal: 24,
    paddingTop: 18,
  },
  subImage: {
    width: DriveWidth / 4 - 20,
    height: DriveWidth / 4 - 20,
    marginRight: 10,
  },
  line: {
    width: DriveWidth * 0.9,
    height: 39,
    marginBottom: 20,
  },
});

export {FoodDetail};
