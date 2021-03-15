import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import {BlurView} from '@react-native-community/blur';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//others
import {FoodItem} from './components/FoodItem';
import {DriveHeight, DriveWidth} from '../../constants/Dimensions';
import {ItemFilter} from './components/ItemFilter';

const ListFood = () => {
  const navigation = useNavigation();

  const [toggle, setToggle] = useState(false);
  const [checkItem, setCheckItem] = useState('all');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const filterAll = () => {
    setCheckItem('all');
    setToggle(!toggle);
  };

  const filterNew = () => {
    setCheckItem('new');
    setToggle(!toggle);
  };

  const filterSale = () => {
    setCheckItem('sale');
    setToggle(!toggle);
  };

  const renderItem = ({item, index}) => {
    return <FoodItem />;
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
        <Text style={styles.titleHeader}>FAST FOOD</Text>
        <TouchableOpacity onPress={() => setToggle(!toggle)}>
          <FontAwesome name={'filter'} size={25} color={'#fff'} />
        </TouchableOpacity>
      </View>
      <View style={[styles.flexContainer]}>
        <BlurView
          style={styles.blur}
          blurType={toggle ? 'ultraThinMaterialDark' : 'light'}
          blurAmount={10}
          reducedTransparencyFallbackColor="white">
          <FlatList
            pointerEvents={toggle ? 'none' : 'auto'}
            style={{paddingTop: 9}}
            maxToRenderPerBatch={50}
            initialNumToRender={30}
            showsVerticalScrollIndicator={false}
            data={[1, 2, 3]}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            renderItem={renderItem}
          />
        </BlurView>
        <Collapsible
          style={{backgroundColor: '#f8fffa', marginTop: -3}}
          collapsed={!toggle}>
          <View>
            <ItemFilter
              title={'Tất Cả'}
              checked={checkItem === 'all'}
              onSelectItem={filterAll}>
              <Ionicons name={'menu'} size={24} color={'#1ad1ff'} />
            </ItemFilter>
            <ItemFilter
              title={'Đồ Ăn Mới'}
              checked={checkItem === 'new'}
              onSelectItem={filterNew}>
              <Entypo name={'new'} size={22} color={'#ff99e6'} />
            </ItemFilter>
            <ItemFilter
              title={'Đồ Ăn Giảm Giá'}
              checked={checkItem === 'sale'}
              onSelectItem={filterSale}>
              <Foundation name={'burst-sale'} size={28} color={'#ff8533'} />
            </ItemFilter>
            <ItemFilter
              title={'Đồ Ăn Bán Chạy'}
              checked={checkItem === 'hot'}
              onSelectItem={filterSale}>
              <MaterialCommunityIcons name={'fire'} size={25} color={'red'} />
            </ItemFilter>
          </View>
        </Collapsible>
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
  blur: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});

export {ListFood};
