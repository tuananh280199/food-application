//import node_modules
import React, {useLayoutEffect} from 'react';
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

//import components
import {CardFood} from './components/CardFood';
import {CategoryFood} from './components/CategoryFood';

//import others
import {DriveHeight, DriveWidth} from '../../constants/Dimensions';
import USER_PLACEHOLDER from '../../assets/user-placeholder.png';
import {FOOD_DETAIL, LIST_FOOD} from '../../constants/StackNavigation';

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleClickCardFood = (item) => {
    navigation.navigate(FOOD_DETAIL);
  };

  const handleClickCategoryFood = (item) => {
    navigation.navigate(LIST_FOOD);
  };

  const handleSeeMore = () => {
    navigation.navigate(LIST_FOOD);
  };

  const renderItemRecommend = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => handleClickCardFood(item)}>
        <CardFood />
      </TouchableOpacity>
    );
  };

  const renderItemCategory = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => handleClickCategoryFood(item)}>
        <CategoryFood />
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
      <View
        style={[
          styles.search,
          Platform.OS === 'android' ? {height: 42} : null,
          Platform.OS === 'ios' ? {padding: 12} : null,
        ]}>
        <View style={styles.searchWrapper}>
          <Ionicons
            name={'search'}
            size={20}
            color={'black'}
            style={{paddingHorizontal: 10}}
          />
          <TextInput
            placeholder={'Nhập tên đồ ăn bạn muốn tìm kiếm !'}
            style={[styles.searchInput]}
          />
        </View>
      </View>
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
            <TouchableOpacity style={styles.seeMore} onPress={handleSeeMore}>
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
              data={[1, 2, 3]}
              keyExtractor={(item, index) => index.toString()}
              numColumns={1}
              renderItem={renderItemRecommend}
            />
          </View>
        </View>
        <View style={styles.category}>
          <View style={[styles.headerRecommend, {justifyContent: 'center'}]}>
            <Text style={[styles.titleItem]}>DANH MỤC</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 10,
          }}>
          {[1, 2, 3].map((item, index) => {
            {
              return renderItemCategory(item, index);
            }
          })}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {[1, 2, 3].map((item, index) => {
            {
              return renderItemCategory(item, index);
            }
          })}
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
    height: DriveHeight * 0.15,
    backgroundColor: '#43bb6c',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
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
    marginTop: -30,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 8,
    marginBottom: 3,
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
