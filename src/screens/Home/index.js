//import node_modules
import React, {useLayoutEffect, useState, useEffect, useRef} from 'react';
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
  Alert,
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
import {
  FOOD_DETAIL,
  LIST_FOOD,
  PROFILE_USER_NAVIGATION,
  SEARCH,
} from '../../constants/StackNavigation';
import productAPI from '../../services/product';
import categoryAPI from '../../services/category';
import {getErrorMessage} from '../../utils/HandleError';
import {addItemToCart} from '../Cart/slice/cartSlice';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-easy-toast';
import {
  AdvertisementPlaceholder,
  CardPlaceholderProductHint,
  CardPlaceholderProductHot,
  CategoryPlaceholder,
} from '../../components/PlaceholderLoading';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toastRef = useRef();

  const listFoodInCart = useSelector((state) => state.cart.cartFood);
  const {profile} = useSelector((state) => {
    return {
      profile: state.auth.profile,
    };
  });

  const [listHotProduct, setListHotProduct] = useState([]);
  const [listHintProduct, setListHintProduct] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [loadingAdvertisement, setLoadingAdvertisement] = useState(true);
  const [loadingListHotProduct, setLoadingListHotProduct] = useState(true);
  const [loadingListHintProduct, setLoadingListHintProduct] = useState(true);
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
      setLoadingAdvertisement(false);
      setListHotProduct(hotProducts.data);
      setLoadingListHotProduct(false);
      setListCategory(categories.data);
      setLoadingListCategory(false);
      const hintProduct = await productAPI.getHintProductHomeScreen();
      setListHintProduct(hintProduct.data);
      setLoadingListHintProduct(false);
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
          name={item.name}
          image={item.image}
          price={item.price}
          priceSale={item.priceSale}
          newFood={item.new}
          saleFood={item.sale}
          like={item.like}
          dislike={item.dislike}
          outOfProduct={item.out_of_product}
          onClickAddCart={() => onClickAddCart(item)}
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

  const renderItemHint = ({item, index}) => {
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
          outOfProduct={item.out_of_product}
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
    <View style={styles.flexContainer}>
      <View
        style={[
          styles.header,
          Platform.OS === 'android' ? {paddingBottom: 20} : null,
        ]}>
        <Image
          source={require('./../../assets/logo-khoaikhau.png')}
          style={{height: 38, width: 38, marginTop: -8}}
        />
        <Text style={styles.titleHeader}>TRANG CHỦ</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(PROFILE_USER_NAVIGATION)}>
          <FastImage
            style={styles.avatar}
            source={
              profile?.avatar
                ? {uri: profile.avatar, priority: FastImage.priority.normal}
                : USER_PLACEHOLDER
            }
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[
          styles.search,
          Platform.OS === 'android' ? {height: 42} : null,
          Platform.OS === 'ios' ? {padding: 10} : null,
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
          {loadingAdvertisement ? (
            <AdvertisementPlaceholder />
          ) : (
            <Swiper
              autoplay
              horizontal
              height={DriveHeight * (Platform.OS === 'ios' ? 0.21 : 0.24)}
              width={DriveWidth * 0.92}
              activeDotColor="#43bb6c">
              <TouchableOpacity
                style={styles.slide}
                onPress={() =>
                  handleClickCategoryFood({
                    id: 1,
                    name: 'Đồ Ăn Vặt',
                  })
                }>
                <Image
                  source={require('../../assets/banner3.jpg')}
                  resizeMode="stretch"
                  style={styles.sliderImage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.slide}
                onPress={() =>
                  handleClickCategoryFood({
                    id: 6,
                    name: 'Cơm Văn Phòng',
                  })
                }>
                <Image
                  source={require('../../assets/banner2.jpg')}
                  resizeMode="stretch"
                  style={styles.sliderImage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.slide}
                onPress={() =>
                  handleClickCategoryFood({
                    id: 3,
                    name: 'Nước Uống',
                  })
                }>
                <Image
                  source={require('../../assets/banner1.jpg')}
                  resizeMode="stretch"
                  style={styles.sliderImage}
                />
              </TouchableOpacity>
            </Swiper>
          )}
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
            {loadingListHotProduct ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[1, 2, 3, 4, 5, 6].map(() => (
                  <CardPlaceholderProductHot />
                ))}
              </ScrollView>
            ) : (
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
            )}
          </View>
        </View>
        <View style={styles.category}>
          <View style={[styles.headerRecommend, {justifyContent: 'center'}]}>
            <Text style={[styles.titleItem]}>DANH MỤC</Text>
          </View>
          {loadingListCategory ? (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {[1, 2, 3].map(() => (
                  <CategoryPlaceholder />
                ))}
              </View>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {[1, 2, 3].map(() => (
                  <CategoryPlaceholder />
                ))}
              </View>
            </View>
          ) : (
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
          )}
        </View>
        <View style={styles.listRecommend}>
          <View style={styles.headerRecommend}>
            <Text style={styles.titleItem}>GỢI Ý CHO BẠN</Text>
          </View>
          <View>
            {loadingListHintProduct ? (
              <FlatList
                maxToRenderPerBatch={50}
                initialNumToRender={30}
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                keyExtractor={(index) => `hint-${index}`}
                numColumns={2}
                renderItem={() => <CardPlaceholderProductHint />}
              />
            ) : (
              <FlatList
                maxToRenderPerBatch={50}
                initialNumToRender={30}
                data={listHintProduct}
                keyExtractor={(item) => `hint-${item.id}`}
                numColumns={2}
                renderItem={renderItemHint}
              />
            )}
          </View>
        </View>
      </ScrollView>
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
    marginTop: -8,
  },
  titleHeader: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    marginTop: -7,
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
    marginTop: 10,
  },
  headerRecommend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  titleItem: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 5,
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
