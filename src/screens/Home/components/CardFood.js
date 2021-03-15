//import node_modules
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import other
import {DriveWidth} from '../../../constants/Dimensions';
import {Rating} from '../../../components/Rating';

type CardFoodProps = {
  newFood?: boolean,
  saleFood?: boolean,
  image?: string,
  name?: string,
  cost?: string,
};

const CardFood = (props: CardFoodProps) => {
  const {newFood = true, saleFood = true} = props;

  const onClickAddCart = () => {
    console.log('add cart');
  };

  return (
    <View style={styles.container}>
      <View>
        <FastImage
          style={styles.cardImage}
          source={{
            uri:
              'https://image.freepik.com/free-photo/herbs-vegetables-white-background_23-2147828984.jpg',
            priority: FastImage.priority.normal,
          }}>
          <View style={styles.containNew}>
            {newFood && (
              <>
                <View style={styles.labelNew} />
                <View style={styles.transformLabel}>
                  <Text style={styles.titleNew}>NEW</Text>
                </View>
              </>
            )}
            {saleFood && (
              <Image
                source={require('../../../assets/sale.jpg')}
                style={styles.iconSale}
              />
            )}
          </View>
        </FastImage>
      </View>
      <View style={styles.cardDetail}>
        <Text style={styles.titleName}>Avocado Toast</Text>
        <Rating
          styleContainer={{marginTop: 2}}
          styleTitle={{fontSize: 15, marginLeft: 4}}
          rating={2.4}
          size={13}
          maxRate={5}
        />
        <View style={styles.footerItem}>
          <Text
            style={[
              styles.titleCost,
              saleFood
                ? {
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'solid',
                  }
                : null,
            ]}>
            150.000₫
          </Text>
          {saleFood ? (
            <Text
              style={[
                styles.titleCost,
                {marginLeft: -15, color: 'red', fontSize: 16},
              ]}>
              120.000₫
            </Text>
          ) : (
            <></>
          )}
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
    backgroundColor: '#FFF',
    shadowColor: 'gray',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 8,
    borderRadius: 10,
    width: DriveWidth * 0.47,
    height: DriveWidth * 0.52,
    marginVertical: 10,
    marginHorizontal: 12,
  },
  cardImage: {
    width: DriveWidth * 0.47,
    height: DriveWidth * 0.35,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardDetail: {
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
    fontSize: 14,
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
    color: 'blue',
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
