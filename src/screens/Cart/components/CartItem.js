//import node_modules
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';

//others
import {DriveWidth} from '../../../constants/Dimensions';
import {Rating} from '../../../components/Rating';
import {roundHalfRate} from '../../../utils/RoundHalfRate';
import { formatNumber } from "../../../utils/formatNumberVND";

type CartItemProps = {
  image?: string,
  name?: string,
  price?: number,
  quantity?: number,
  like?: number,
  dislike?: number,
  unit?: string,
  handleRemove?: Function,
  handlePlusQuantity?: Function,
  handleMinusQuantity?: Function,
};

const CartItem = (props: CartItemProps) => {
  const {
    name,
    image,
    price,
    quantity,
    like,
    dislike,
    unit,
    handleRemove,
    handlePlusQuantity,
    handleMinusQuantity,
  } = props;

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
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.titleName}>{name}</Text>
            <TouchableOpacity onPress={handleRemove}>
              <Feather name={'delete'} size={20} color={'tomato'} />
            </TouchableOpacity>
          </View>
          <Rating
            styleContainer={{flex: 1, marginTop: 2}}
            styleTitle={{fontSize: 15, marginLeft: 4}}
            rating={roundHalfRate(like, dislike)}
            like={like}
            dislike={dislike}
            size={13}
            maxRate={5}
          />
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Text style={{fontSize: 14}}>Đơn vị tính: {unit}</Text>
          </View>
          <View style={styles.footerItem}>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Text style={{fontSize: 16}}>Giá : </Text>
              <Text style={styles.titleCost}>
                {`${formatNumber(price || 0)} ₫`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 2,
              }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {borderTopLeftRadius: 15, borderBottomLeftRadius: 15},
                ]}
                onPress={handleMinusQuantity}>
                <Text style={{color: '#fff', fontSize: 21}}>-</Text>
              </TouchableOpacity>
              <Text style={styles.titleQuantity}>{quantity}</Text>
              <TouchableOpacity
                style={[
                  styles.button,
                  {borderTopRightRadius: 15, borderBottomRightRadius: 15},
                ]}
                onPress={handlePlusQuantity}>
                <Text style={{color: '#fff', fontSize: 21}}>+</Text>
              </TouchableOpacity>
            </View>
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
    elevation: 1,
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
    height: DriveWidth * 0.255,
    borderTopLeftRadius: 15,
  },
  content: {
    width: DriveWidth * 0.66,
    marginLeft: 10,
    justifyContent: 'space-around',
  },
  titleName: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  titleCost: {
    color: 'tomato',
    fontSize: 18,
    fontWeight: '500',
  },
  titleQuantity: {
    fontSize: 18,
    marginHorizontal: 10,
    fontWeight: '500',
  },
  footerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  button: {
    width: 44,
    height: 30,
    backgroundColor: '#43bb6c',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {CartItem};
