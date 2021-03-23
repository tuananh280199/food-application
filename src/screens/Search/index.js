//node_modules
import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

//others
import {DriveHeight, DriveWidth} from '../../constants/Dimensions';
import {ItemSearch} from './components/ItemSearch';
import newImage from '../../assets/icon-new.png';
import saleImage from '../../assets/icon-sale-cate.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CardFood} from '../Home/components/CardFood';
import {FOOD_DETAIL} from '../../constants/StackNavigation';

const mockData = [
  {
    id: 1,
    text: 'Khoai Tay Chien',
  },
  {
    id: 2,
    text: 'Khoai Lang',
  },
  {
    id: 3,
    text: 'Khoai Mon',
  },
  {
    id: 3,
    text: 'Nem Chua Ran',
  },
];

const SearchScreen = () => {
  const navigation = useNavigation();

  const [visibleClearText, setVisibleClearText] = useState(false);
  const [valueTextInput, setValueTextInput] = useState('');
  const [visibleFlatList, setVisibleFlatlist] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleChangeTextInput = (text) => {
    if (text.length) {
      setVisibleClearText(true);
    } else {
      setVisibleClearText(false);
    }
    setValueTextInput(text);
  };

  const handleClearTextInput = () => {
    setValueTextInput('');
    setVisibleClearText(false);
    setVisibleFlatlist(false);
  };

  const handleClearHistorySearch = () => {};

  const handleSearch = () => {
    setVisibleFlatlist(true);
  };

  const handleClickCardFood = (item) => {
    navigation.navigate(FOOD_DETAIL, {
      product_id: item.id,
    });
  };

  const renderItemRecommend = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => handleClickCardFood(item)}>
        <CardFood
          name={item.name}
          image={item.image}
          price={item.price}
          priceSale={item.priceSale}
          newFood={item.new}
          saleFood={item.sale}
          like={item.like}
          dislike={item.dislike}
          styleContainer={{
            width: DriveWidth * 0.45,
            height: DriveWidth * 0.5,
            margin: 8,
          }}
          styleImage={{
            width: DriveWidth * 0.45,
            height: DriveWidth * 0.3,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.flexContainer}>
        <SafeAreaView style={[styles.header]}>
          <TouchableOpacity
            onPress={handleGoBack}
            style={{width: DriveWidth * 0.1}}>
            <Ionicons name="arrow-back" color={'white'} size={25} />
          </TouchableOpacity>
          <View style={styles.wrapTextInput}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: DriveWidth * 0.65,
              }}>
              <TouchableOpacity onPress={handleSearch}>
                <Ionicons
                  name={'search'}
                  size={20}
                  color={'#595959'}
                  style={{marginHorizontal: 5}}
                />
              </TouchableOpacity>
              <TextInput
                style={styles.textInput}
                placeholder={'Nhập tên đồ ăn'}
                value={valueTextInput}
                onChangeText={(text) => handleChangeTextInput(text)}
                autoFocus
              />
            </View>
            {visibleClearText && (
              <TouchableOpacity onPress={handleClearTextInput}>
                <Feather
                  name={'x-circle'}
                  size={20}
                  color={'#8c8c8c'}
                  style={{marginHorizontal: 5}}
                />
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
        <View style={styles.content}>
          {!visibleFlatList && (
            <View>
              <View style={styles.headerContent}>
                <Text style={styles.title}>Lịch Sử Tìm Kiếm</Text>
                <TouchableOpacity
                  onPress={handleClearHistorySearch}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Ionicons name={'trash'} size={15} color={'gray'} />
                  <Text style={{color: 'gray', fontSize: 15, marginLeft: 2}}>
                    Xoá
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  marginTop: 10,
                  marginBottom: 15,
                  width: DriveWidth,
                }}>
                {mockData.map((item, index) => {
                  return (
                    <View style={styles.wrapTextSearch} key={index}>
                      <Text
                        style={{
                          paddingVertical: 7,
                          paddingHorizontal: 10,
                          color: '#262626',
                        }}>
                        {item.text}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <View style={styles.divider} />
              <View style={styles.headerContent}>
                <Text style={styles.title}>Tìm Kiếm Theo</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 20,
                  marginBottom: 15,
                  marginHorizontal: 10,
                }}>
                <ItemSearch
                  icon={
                    <Foundation
                      name={'burst-new'}
                      size={50}
                      color={'#ff944d'}
                    />
                  }
                  name={'Mới Nhất'}
                  onClick={() => {}}
                />
                <ItemSearch
                  icon={<AntDesign name={'star'} size={50} color={'#ffff66'} />}
                  name={'Yêu Thích'}
                  onClick={() => {}}
                />
                <ItemSearch
                  icon={
                    <Foundation
                      name={'burst-sale'}
                      size={50}
                      color={'#ff3300'}
                    />
                  }
                  name={'Giảm Giá'}
                  onClick={() => {}}
                />
              </View>
            </View>
          )}
          {visibleFlatList && (
            <View style={{marginVertical: 5}}>
              <FlatList
                contentContainerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                maxToRenderPerBatch={50}
                initialNumToRender={30}
                showsHorizontalScrollIndicator={false}
                data={[1, 2, 3, 4]}
                keyExtractor={(item) => `hot-${item.id}`}
                numColumns={2}
                renderItem={renderItemRecommend}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: '#f8fffa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: DriveWidth,
    height: DriveHeight * 0.12,
    backgroundColor: '#43bb6c',
    marginTop: -5,
  },
  wrapTextInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: DriveWidth * 0.8,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginRight: 5,
  },
  textInput: {
    height: 35,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    borderRadius: 5,
  },
  content: {
    flex: 1,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 16,
  },
  wrapTextSearch: {
    borderRadius: 15,
    borderColor: '#80ffd4',
    borderWidth: 1,
    marginLeft: 10,
    marginTop: 10,
  },
  divider: {
    width: DriveWidth,
    height: 10,
    backgroundColor: '#e6e6e6',
  },
});

export {SearchScreen};
