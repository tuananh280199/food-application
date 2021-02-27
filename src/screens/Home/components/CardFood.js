//import node_modules
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import other
import {DriveWidth} from '../../../constants/Dimensions';

type CardFoodProps = {
  onClickImage?: Function,
  onClickAddCart?: Function,
  newFood?: boolean,
  hotFood?: boolean,
  saleFood?: boolean,
  image?: string,
  name?: string,
  cost?: string,
};

const CardFood = (props: CardFoodProps) => {
  const {
    onClickImage,
    onClickAddCart,
    newFood = false,
    hotFood = false,
    saleFood = true,
  } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClickImage}>
        <FastImage
          style={styles.cardImage}
          source={{
            uri:
              'https://www.greencore.com/wp-content/uploads/2015/08/ChickenPenang-250x250.jpg',
            priority: FastImage.priority.normal,
          }}>
          <View style={styles.containNew}>
            {(newFood || hotFood || saleFood) && (
              <>
                <View style={styles.labelNew} />
                <View style={styles.transformLabel}>
                  <Text style={styles.titleNew}>
                    {newFood ? 'NEW' : hotFood ? 'HOT' : 'SALE'}
                  </Text>
                </View>
              </>
            )}
          </View>
        </FastImage>
      </TouchableOpacity>
      <View style={styles.cardDetail}>
        <Text style={styles.titleName}>Avocado Toast</Text>
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
              color={'#00cc00'}
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
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 8,
    borderRadius: 10,
    width: DriveWidth * 0.48,
    height: DriveWidth * 0.52,
    marginVertical: 10,
    marginHorizontal: 12,
  },
  cardImage: {
    width: DriveWidth * 0.48,
    height: DriveWidth * 0.37,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardDetail: {
    padding: 10,
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
    marginTop: 4,
  },
  titleCost: {
    color: '#00cc00',
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
    color: 'red',
  },
});

export {CardFood};
