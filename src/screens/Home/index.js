//import node_modules
import React, {useLayoutEffect} from 'react';
import {
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

//import components
import {CardFood} from './components/CardFood';
import {CategoryFood} from './components/CategoryFood';

//import others
import {DriveHeight, DriveWidth} from '../../constants/Dimensions';
import USER_PLACEHOLDER from '../../assets/user-placeholder.png';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const renderItemRecommend = (item, index) => {
    return <CardFood />;
  };

  const renderItemCategory = (item, index) => {
    return (
      <TouchableOpacity>
        <CategoryFood />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.flexContainer}>
      <View style={styles.header}>
        <Ionicons name={'fast-food'} size={35} color={'#faf55c'} />
        <Text style={styles.titleHeader}>Trang Chủ</Text>
        <FastImage style={styles.avatar} source={USER_PLACEHOLDER} />
      </View>
      <View style={styles.search}>
        <View style={styles.searchWrapper}>
          <Ionicons name={'search'} size={20} color={'black'} />
          <TextInput
            placeholder={'Nhập tên đồ ăn bạn muốn tìm kiếm !'}
            style={styles.searchInput}
          />
        </View>
      </View>
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.sliderContainer}>
          <Swiper
            autoplay
            horizontal
            height={200}
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
            <Text style={styles.titleItem}>Đồ Ăn Bán Chạy</Text>
            <TouchableOpacity style={styles.seeMore}>
              <Text style={styles.titleSeeMore}>Xem thêm</Text>
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
              // keyExtractor={(item) => item.id.toString()}
              numColumns={1}
              renderItem={renderItemRecommend}
            />
          </View>
        </View>
        <View style={styles.category}>
          <View style={[styles.headerRecommend, {justifyContent: 'center'}]}>
            <Text style={[styles.titleItem]}>Các Loại Đồ Ăn</Text>
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
    height: DriveHeight * 0.16,
    backgroundColor: '#43bb6c',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
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
    fontSize: 24,
    fontWeight: '700',
  },
  search: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    marginTop: -30,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 8,
  },
  searchWrapper: {
    flexDirection: 'row',
  },
  searchInput: {
    marginLeft: 10,
  },
  body: {
    flex: 1,
  },
  sliderContainer: {
    height: 200,
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
    height: 200,
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  seeMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleSeeMore: {
    fontSize: 16,
    color: 'tomato',
    marginRight: 2,
  },
});

export {HomeScreen};
