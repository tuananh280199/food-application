//import node_modules
import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  Platform,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Snackbar from 'react-native-snackbar';

//import components
import {CardFood} from './components/CardFood';
import {CategoryFood} from './components/CategoryFood';

//import others
import {DriveHeight, DriveWidth} from '../../constants/Dimensions';
import USER_PLACEHOLDER from '../../assets/user-placeholder.png';
import {FOOD_DETAIL, LIST_FOOD, SEARCH} from '../../constants/StackNavigation';
import productAPI from '../../services/product';
import categoryAPI from '../../services/category';
import {getErrorMessage} from '../../utils/HandleError';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [listHotProduct, setListHotProduct] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [loadingListHotProduct, setLoadingListHotProduct] = useState(true);
  const [loadingListCategory, setLoadingListCategory] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    getInitData();
  }, []);

  const getInitData = async () => {
    try {
      const hotProducts = await productAPI.getHotProductHomeScreen();
      const categories = await categoryAPI.getCategoryHomeScreen();
      setListHotProduct(hotProducts.data);
      setListCategory(categories.data);
      setLoadingListHotProduct(false);
      setLoadingListCategory(false);
    } catch (e) {
      Snackbar.show({
        text: getErrorMessage(e),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'rgba(245, 101, 101, 1)',
      });
    }
  };

  const handleClickCardFood = (item) => {
    navigation.navigate(FOOD_DETAIL, {
      product_id: item.id,
    });
  };

  const handleClickCategoryFood = (item) => {
    navigation.navigate(LIST_FOOD, {
      category_id: item.id,
      category_name: item.name,
    });
  };

  const handleSeeMoreHotProduct = () => {
    navigation.navigate(LIST_FOOD, {
      category_id: 0,
      category_name: 'Đồ Ăn Bán Chạy',
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
        />
      </TouchableOpacity>
    );
  };

  const renderCategory = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => handleClickCategoryFood(item)}>
        <CategoryFood name={item.name} image={item.image} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.flexContainer}>
      <View
        style={[
          styles.header,
          Platform.OS === 'android' ? {paddingBottom: 20} : null,
        ]}>
        <Ionicons name={'fast-food'} size={35} color={'#c3e8f7'} />
        <Text style={styles.titleHeader}>TRANG CHỦ</Text>
        <FastImage style={styles.avatar} source={USER_PLACEHOLDER} />
      </View>
      <TouchableOpacity
        style={[
          styles.search,
          Platform.OS === 'android' ? {height: 42} : null,
          Platform.OS === 'ios' ? {padding: 11} : null,
        ]}
        onPress={() => navigation.navigate(SEARCH)}>
        <View style={styles.searchWrapper}>
          <Ionicons
            name={'search'}
            size={20}
            color={'black'}
            style={{paddingHorizontal: 10}}
          />
          <Text style={{color: 'gray'}}>Tìm kiếm đồ ăn !</Text>
        </View>
      </TouchableOpacity>
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.sliderContainer}>
          <Swiper
            autoplay
            horizontal
            height={DriveHeight * (Platform.OS === 'ios' ? 0.21 : 0.24)}
            width={DriveWidth * 0.92}
            activeDotColor="#43bb6c">
            <View style={styles.slide}>
              <Image
                source={require('../../assets/banner3.jpg')}
                resizeMode="stretch"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require('../../assets/banner2.jpg')}
                resizeMode="stretch"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require('../../assets/banner1.jpg')}
                resizeMode="stretch"
                style={styles.sliderImage}
              />
            </View>
          </Swiper>
        </View>
        <View style={styles.listRecommend}>
          <View style={styles.headerRecommend}>
            <Text style={styles.titleItem}>ĐỒ ĂN BÁN CHẠY</Text>
            <TouchableOpacity
              style={styles.seeMore}
              onPress={handleSeeMoreHotProduct}>
              <Text style={styles.titleSeeMore}>XEM THÊM</Text>
              <AntDesign name={'forward'} size={15} color={'tomato'} />
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              horizontal
              maxToRenderPerBatch={50}
              initialNumToRender={30}
              showsHorizontalScrollIndicator={false}
              data={listHotProduct}
              keyExtractor={(item) => `hot-${item.id}`}
              numColumns={1}
              renderItem={renderItemRecommend}
            />
          </View>
        </View>
        <View style={styles.category}>
          <View style={[styles.headerRecommend, {justifyContent: 'center'}]}>
            <Text style={[styles.titleItem]}>DANH MỤC</Text>
          </View>
          <View
            style={{
              marginTop: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FlatList
              contentContainerStyle={{
                flexDirection: 'column',
              }}
              numColumns={3}
              data={listCategory}
              renderItem={renderCategory}
              keyExtractor={(item) => `category-${item.id}`}
            />
          </View>
        </View>
      </ScrollView>
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
    paddingHorizontal: 15,
    width: DriveWidth,
    height: DriveHeight * 0.145,
    backgroundColor: '#43bb6c',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#c3e8f7',
  },
  titleHeader: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
  },
  search: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: -28,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 8,
    marginBottom: 3,
    justifyContent: 'center',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    marginRight: 45,
  },
  body: {
    flex: 1,
  },
  sliderContainer: {
    height: DriveHeight * (Platform.OS === 'ios' ? 0.21 : 0.24),
    width: DriveWidth * 0.92,
    marginTop: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: DriveHeight * (Platform.OS === 'ios' ? 0.21 : 0.24),
    width: DriveWidth * 0.92,
    alignSelf: 'center',
    borderRadius: 8,
  },
  listRecommend: {
    marginTop: 10,
  },
  category: {
    marginTop: 5,
  },
  headerRecommend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 5,
  },
  titleItem: {
    fontSize: 20,
    fontWeight: '600',
  },
  seeMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleSeeMore: {
    fontSize: 14,
    color: 'tomato',
    marginRight: 5,
  },
});

export {HomeScreen};
