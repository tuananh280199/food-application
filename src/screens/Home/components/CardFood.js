//import node_modules
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import other
import {DriveWidth} from '../../../constants/Dimensions';
import {Rating} from '../../../components/Rating';
import {roundHalfRate} from '../../../utils/RoundHalfRate';

type CardFoodProps = {
  newFood?: number,
  saleFood?: number,
  image?: string,
  name?: string,
  price?: number,
  priceSale?: number,
  like?: number,
  dislike?: number,
  styleContainer?: any,
  styleImage?: any,
};

const CardFood = (props: CardFoodProps) => {
  const {
    name,
    image,
    price,
    priceSale,
    newFood,
    saleFood,
    like,
    dislike,
    styleContainer,
    styleImage,
  } = props;

  const onClickAddCart = () => {
    console.log('add cart');
  };

  return (
    <View style={[styles.container, styleContainer]}>
      <View>
        <FastImage
          style={[styles.cardImage, styleImage]}
          source={{
            uri: image,
            priority: FastImage.priority.normal,
          }}>
          <View style={styles.containNew}>
            {newFood === 1 && (
              <>
                <View style={styles.labelNew} />
                <View style={styles.transformLabel}>
                  <Text style={styles.titleNew}>NEW</Text>
                </View>
              </>
            )}
            {saleFood === 1 && (
              <Image
                source={require('../../../assets/sale.jpg')}
                style={styles.iconSale}
              />
            )}
          </View>
        </FastImage>
      </View>
      <View style={styles.cardDetail}>
        <Text style={styles.titleName}>{name}</Text>
        <Rating
          styleContainer={{marginTop: 2}}
          styleTitle={{fontSize: 15, marginLeft: 4}}
          rating={roundHalfRate(like, dislike)}
          like={like}
          dislike={dislike}
          size={13}
          maxRate={5}
        />
        <View style={styles.footerItem}>
          <View style={{flexDirection: 'row'}}>
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
          <TouchableOpacity onPress={onClickAddCart}>
            <MaterialCommunityIcons
              name={'cart-plus'}
              size={20}
              color={'#43bb6c'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    shadowColor: 'gray',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 1,
    borderRadius: 10,
    width: DriveWidth * 0.47,
    height: DriveWidth * 0.54,
    margin: 11,
  },
  cardImage: {
    width: DriveWidth * 0.47,
    height: DriveWidth * 0.35,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardDetail: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 5,
  },
  titleName: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  footerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  titleCost: {
    color: '#43bb6c',
    fontSize: 15,
    fontWeight: '500',
  },
  containNew: {
    flex: 1,
    position: 'relative',
  },
  labelNew: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'transparent',
    borderRightWidth: 50,
    borderTopWidth: 50,
    borderRightColor: 'transparent',
    borderTopColor: 'white',
  },
  transformLabel: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    width: 36,
    borderRadius: 5,
    transform: [{rotate: '315deg'}],
  },
  titleNew: {
    fontSize: 10,
    fontWeight: '500',
    color: 'purple',
  },
  iconSale: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    transform: [{rotate: '30deg'}],
  },
});

export {CardFood};
