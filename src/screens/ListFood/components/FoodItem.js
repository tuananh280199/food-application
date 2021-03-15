//import node_modules
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";

//others
import {DriveWidth} from '../../../constants/Dimensions';
import {Rating} from '../../../components/Rating';
import { FOOD_DETAIL } from "../../../constants/StackNavigation";

type FoodItemProps = {
  newFood?: boolean,
  saleFood?: boolean,
  image?: string,
  name?: string,
  cost?: string,
};

const FoodItem = (props: FoodItemProps) => {
  const {newFood = true, saleFood = true} = props;
  const navigation = useNavigation();

  const onClickAddCart = () => {
    console.log('add cart');
  };

  const handleDetailClick = () => {
    navigation.navigate(FOOD_DETAIL);
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
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.titleName}>Avocado Toast</Text>
              {newFood && (
                <Image
                  source={require('../../../assets/icon-new.png')}
                  style={styles.icon}
                />
              )}
              {saleFood && (
                <Image
                  source={require('../../../assets/icon-sale-cate.png')}
                  style={styles.icon}
                />
              )}
            </View>
            <TouchableOpacity onPress={onClickAddCart}>
              <MaterialCommunityIcons
                name={'cart-plus'}
                size={23}
                color={'#43bb6c'}
              />
            </TouchableOpacity>
          </View>
          <Rating
            styleContainer={{marginBottom: 2}}
            styleTitle={{fontSize: 15, marginLeft: 4}}
            rating={2.4}
            size={13}
            maxRate={5}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                  {marginLeft: 5, color: 'red', fontSize: 16},
                ]}>
                120.000₫
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
              Mo ta thuc an sach se, thom ngon, lanh manh
            </Text>
            <TouchableOpacity onPress={handleDetailClick}>
              <Text style={{color: 'tomato', marginRight: 2,}}>Chi Tiết</Text>
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
    fontSize: 16,
    fontWeight: '500',
  },
  icon: {width: 23, height: 23, marginLeft: 10},
  titleCost: {
    color: '#43bb6c',
    fontSize: 14,
    fontWeight: '500',
  },
});

export {FoodItem};
