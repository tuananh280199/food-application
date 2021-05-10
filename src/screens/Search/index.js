//node_modules
import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
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
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Snackbar from 'react-native-snackbar';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-easy-toast';

//others
import {DriveHeight, DriveWidth} from '../../constants/Dimensions';
import {ItemSearch} from './components/ItemSearch';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CardFood} from '../Home/components/CardFood';
import {FOOD_DETAIL} from '../../constants/StackNavigation';
import {getErrorMessage} from '../../utils/HandleError';
import {
  fetchDataSearchByName,
  fetchDataSearchByType,
} from './slice/searchSlide';
import {Spinner} from '../../components/Spinner';
import {
  deleteHistorySearch,
  setListKeyWordSearch,
} from './slice/historySearchSlice';
import {addItemToCart} from '../Cart/slice/cartSlice';
import {Image} from 'react-native-animatable';

const SearchScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toastRef = useRef();

  const listFoodInCart = useSelector((state) => state.cart.cartFood);
  const {listFood, currentPage, hasNextPage} = useSelector((state) => {
    const {list, page, hasNext} = state.search.food;
    return {
      listFood: list,
      currentPage: page,
      hasNextPage: hasNext,
    };
  });
  const historySearch = useSelector((state) => state.historySearch.listKeyWord);

  const [visibleClearText, setVisibleClearText] = useState(false);
  const [valueTextInput, setValueTextInput] = useState('');
  const [visibleFlatList, setVisibleFlatList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typeFood, setTypeFood] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getDataSearchByName = async (keyWord) => {
    try {
      setLoading(true);
      await dispatch(fetchDataSearchByName({keyWord, page: 1}));
      setLoading(false);
    } catch (e) {
      Snackbar.show({
        text: getErrorMessage(e),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'rgba(245, 101, 101, 1)',
      });
    }
  };

  const getDataSearchByType = async (type) => {
    try {
      setLoading(true);
      await dispatch(fetchDataSearchByType({type, page: 1}));
      setLoading(false);
    } catch (e) {
      Snackbar.show({
        text: getErrorMessage(e),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'rgba(245, 101, 101, 1)',
      });
    }
  };

  const handleLoadMore = async () => {
    try {
      if (!hasNextPage) {
        return;
      }
      if (typeFood === '') {
        await dispatch(
          fetchDataSearchByName({
            keyWord: valueTextInput,
            page: currentPage + 1,
            isLoadMore: true,
          }),
        );
      } else {
        await dispatch(
          fetchDataSearchByType({
            type: typeFood,
            page: currentPage + 1,
            isLoadMore: true,
          }),
        );
      }
    } catch (e) {
      Snackbar.show({
        text: getErrorMessage(e),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'rgba(245, 101, 101, 1)',
      });
    }
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
    setVisibleFlatList(false);
  };

  const handleClearHistorySearch = () => {
    dispatch(deleteHistorySearch());
  };

  const handleSearchByName = (keyWord) => {
    setValueTextInput(keyWord);
    setVisibleClearText(true);
    setVisibleFlatList(true);
    setTypeFood('');
    dispatch(setListKeyWordSearch({data: [keyWord]}));
    return getDataSearchByName(keyWord);
  };

  const handleSearchByType = (type) => {
    setVisibleFlatList(true);
    setTypeFood(type);
    return getDataSearchByType(type);
  };

  const handleClickCardFood = (item) => {
    navigation.navigate(FOOD_DETAIL, {
      product_id: item.id,
    });
  };

  const onClickAddCart = async (item) => {
    if (listFoodInCart.find((o) => o.product.id === item.id)) {
      Alert.alert('Thông báo', `Đã có ${item.name} trong giỏ hàng !`, [
        {text: 'OK'},
      ]);
      return;
    }
    await dispatch(addItemToCart({product: item, quantity: 1}));
    toastRef.current.show(
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 130,
          height: 80,
        }}>
        <AntDesign name={'check'} size={40} color={'white'} />
        <Text style={{color: 'white', marginTop: 5, textAlign: 'center'}}>
          Thêm Thành Công
        </Text>
      </View>,
      700,
    );
  };

  const renderItemRecommend = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => handleClickCardFood(item)}>
        <CardFood
          product_id={item.id}
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
            height: DriveWidth * 0.51,
            margin: 8,
          }}
          styleImage={{
            width: DriveWidth * 0.45,
            height: DriveWidth * 0.32,
          }}
          onClickAddCart={() => onClickAddCart(item)}
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
              <TouchableOpacity
                onPress={() => handleSearchByName(valueTextInput)}>
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
                {historySearch.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={styles.wrapTextSearch}
                      key={index}
                      onPress={() => handleSearchByName(item)}>
                      <Text
                        style={{
                          paddingVertical: 7,
                          paddingHorizontal: 10,
                          color: '#262626',
                        }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View style={styles.divider} />
              <View style={styles.headerContent}>
                <Text style={styles.title}>Tìm Kiếm Đồ Ăn</Text>
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
                  onClick={() => handleSearchByType('new')}
                />
                <ItemSearch
                  icon={<AntDesign name={'star'} size={50} color={'#ffff66'} />}
                  name={'Yêu Thích'}
                  onClick={() => handleSearchByType('hot')}
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
                  onClick={() => handleSearchByType('sale')}
                />
              </View>
            </View>
          )}
          {visibleFlatList &&
            (loading ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Spinner color={'#43bb6c'} />
              </View>
            ) : (
              <View style={{flex: 1, marginVertical: 5}}>
                <View style={{margin: 10}}>
                  <Text style={{fontSize: 16}}>Kết Quả Tìm Kiếm</Text>
                </View>
                {listFood.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../../assets/logo-khoaikhau.png')}
                      style={{
                        width: DriveHeight * 0.065,
                        height: DriveHeight * 0.065,
                        marginBottom: 10,
                      }}
                    />
                    <Text
                      style={{
                        color: '#43bb6c',
                        fontSize: 21,
                        fontWeight: '500',
                      }}>
                      Không Tim Thấy Sản Phẩm
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    maxToRenderPerBatch={50}
                    initialNumToRender={30}
                    showsHorizontalScrollIndicator={false}
                    data={listFood}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    renderItem={renderItemRecommend}
                    onEndReachedThreshold={0.5}
                    onEndReached={handleLoadMore}
                  />
                )}
              </View>
            ))}
        </View>
        <Toast
          ref={toastRef}
          style={{backgroundColor: '#000'}}
          position="top"
          fadeInDuration={200}
          fadeOutDuration={700}
          positionValue={320}
          opacity={0.8}
        />
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
    height: 40,
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
