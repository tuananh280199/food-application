//import node_modules
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Snackbar from 'react-native-snackbar';

//others
import {DriveWidth} from '../../../constants/Dimensions';
import {Rating} from '../../../components/Rating';
import {
  FOOD_DETAIL,
  FOOD_DETAIL_FAVOURITE,
} from '../../../constants/StackNavigation';
import {roundHalfRate} from '../../../utils/RoundHalfRate';
import {getErrorMessage} from '../../../utils/HandleError';
import productAPI from '../../../services/product';
import {deleteFavouriteFood} from '../../FavouriteFood/slide/favouriteSlide';

type FoodItemProps = {
  newFood?: boolean,
  saleFood?: boolean,
  image?: string,
  product_id?: number,
  name?: string,
  price?: number,
  priceSale?: number,
  like?: number,
  dislike?: number,
  description?: string,
  screen?: string,
};

const FoodItem = (props: FoodItemProps) => {
  const {
    product_id,
    name,
    image,
    price,
    priceSale,
    like,
    dislike,
    description,
    newFood = true,
    saleFood = true,
    screen,
  } = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {id} = useSelector((state) => state.auth.profile);

  const onClickAddCart = () => {
    console.log('add cart');
  };

  const handleDeleteItem = () => {
    Alert.alert(
      'Thông báo',
      'Bạn có thật sự muốn xoá đồ ăn này khỏi danh sách yêu thích của mình ?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await productAPI.deleteFavouriteProduct(id, product_id);
              await dispatch(deleteFavouriteFood({product_id}));
            } catch (e) {
              Snackbar.show({
                text: getErrorMessage(e),
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'rgba(245, 101, 101, 1)',
              });
            }
          },
        },
      ],
    );
  };

  const handleDetailClick = () => {
    if (screen === 'Favourite') {
      navigation.navigate(FOOD_DETAIL_FAVOURITE, {
        product_id,
      });
    } else {
      navigation.navigate(FOOD_DETAIL, {
        product_id,
      });
    }
  };

  return (
    <View style={styles.flexContainer}>
      <View style={styles.container}>
        <FastImage
          style={styles.image}
          source={{
            uri: image,
            priority: FastImage.priority.normal,
          }}
        />
        <View style={styles.content}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.titleName}>{name}</Text>
              {newFood === 1 && (
                <Image
                  source={require('../../../assets/icon-new.png')}
                  style={styles.icon}
                />
              )}
              {saleFood === 1 && (
                <Image
                  source={require('../../../assets/icon-sale-cate.png')}
                  style={styles.icon}
                />
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={onClickAddCart}>
                <MaterialCommunityIcons
                  name={'cart-plus'}
                  size={21}
                  color={'#43bb6c'}
                />
              </TouchableOpacity>
              {screen === 'Favourite' && (
                <TouchableOpacity
                  onPress={handleDeleteItem}
                  style={{marginLeft: 5}}>
                  <Ionicons name={'trash'} size={21} color={'gray'} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Rating
            styleContainer={{marginBottom: 2}}
            styleTitle={{fontSize: 15, marginLeft: 4}}
            rating={roundHalfRate(like, dislike)}
            like={like}
            dislike={dislike}
            size={15}
            maxRate={5}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={[
                styles.titleCost,
                saleFood === 1
                  ? {
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid',
                    }
                  : null,
              ]}>
              {price?.toLocaleString('vi', {
                style: 'currency',
                currency: 'VND',
              })}
            </Text>
            {saleFood === 1 ? (
              <Text
                style={[
                  styles.titleCost,
                  {marginLeft: 5, color: 'red', fontSize: 16},
                ]}>
                {priceSale?.toLocaleString('vi', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </Text>
            ) : (
              <></>
            )}
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={{width: '78%'}}>
              {description}
            </Text>
            <TouchableOpacity onPress={handleDetailClick}>
              <Text style={{color: 'tomato', marginRight: 2}}>Chi Tiết</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 8,
    marginBottom: 12,
  },
  container: {
    flexDirection: 'row',
    width: DriveWidth * 0.95,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  image: {
    width: DriveWidth * 0.25,
    height: DriveWidth * 0.25,
    borderTopLeftRadius: 15,
  },
  content: {
    width: DriveWidth * 0.66,
    marginLeft: 10,
    justifyContent: 'space-around',
  },
  titleName: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  icon: {width: 21, height: 21, marginLeft: 10},
  titleCost: {
    color: '#43bb6c',
    fontSize: 14,
    fontWeight: '500',
  },
});

export {FoodItem};
