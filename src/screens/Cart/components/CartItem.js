//import node_modules
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';

//others
import {DriveWidth} from '../../../constants/Dimensions';
import {Rating} from '../../../components/Rating';

type CartItemProps = {
  image?: string,
  name?: string,
  cost?: string,
};

const CartItem = (props: CartItemProps) => {
  const handleRemove = () => {
    console.log('remove item cart');
  };

  const handlePlusQuantity = () => {
    console.log('plus quantity');
  };

  const handleMinusQuantity = () => {
    console.log('minus quantity');
  };

  return (
    <View style={styles.flexContainer}>
      <View style={styles.container}>
        <FastImage
          style={styles.image}
          source={{
            uri:
              'https://www.greencore.com/wp-content/uploads/2015/08/ChickenPenang-250x250.jpg',
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
            <Text style={styles.titleName}>Avocado Toast</Text>
            <TouchableOpacity onPress={handleRemove}>
              <Feather name={'delete'} size={20} color={'tomato'} />
            </TouchableOpacity>
          </View>
          <Rating
            styleContainer={{marginTop: 2}}
            styleTitle={{fontSize: 15, marginLeft: 4}}
            rating={2.4}
            size={13}
            maxRate={5}
          />
          <View style={styles.footerItem}>
            <Text style={styles.titleCost}>120.000₫</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {borderTopLeftRadius: 15, borderBottomLeftRadius: 15},
                ]}
                onPress={() => handleMinusQuantity()}>
                <Text style={{color: '#fff', fontSize: 21}}>-</Text>
              </TouchableOpacity>
              <Text style={styles.titleQuantity}>0</Text>
              <TouchableOpacity
                style={[
                  styles.button,
                  {borderTopRightRadius: 15, borderBottomRightRadius: 15},
                ]}
                onPress={() => handlePlusQuantity()}>
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
    width: DriveWidth * 0.23,
    height: 100,
    borderTopLeftRadius: 15,
  },
  content: {
    width: DriveWidth * 0.68,
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
    alignItems: 'center',
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
