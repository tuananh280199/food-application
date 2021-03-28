//node_modules
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import Snackbar from 'react-native-snackbar';

//others
import {DriveHeight, DriveWidth} from '../../constants/Dimensions';
import {Spinner} from '../../components/Spinner';
import {getErrorMessage} from '../../utils/HandleError';
import {FoodItem} from '../ListFood/components/FoodItem';
import {fetchFavouriteFood} from './slide/favouriteSlide';

const FavouriteFoodScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const uid = useSelector((state) => state.auth.profile.id);
  const {listFood, currentPage, hasNextPage} = useSelector((state) => {
    const {list, page, hasNext} = state.favourite.favouriteFood;
    return {
      listFood: list,
      currentPage: page,
      hasNextPage: hasNext,
    };
  });

  const [loadingInitData, setLoadingInitData] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getInitData();
  }, []);

  const getInitData = async () => {
    try {
      setLoadingInitData(true);
      await dispatch(fetchFavouriteFood({uid, page: 1}));
      setLoadingInitData(false);
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
      await dispatch(
        fetchFavouriteFood({uid, page: currentPage + 1, isLoadMore: true}),
      );
    } catch (e) {
      Snackbar.show({
        text: getErrorMessage(e),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'rgba(245, 101, 101, 1)',
      });
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <FoodItem
        product_id={item.id}
        name={item.name}
        image={item.image}
        price={item.price}
        priceSale={item.priceSale}
        newFood={item.new}
        saleFood={item.sale}
        like={item.like}
        dislike={item.dislike}
        description={item.description}
        screen={'Favourite'}
      />
    );
  };

  return (
    <View style={styles.flexContainer}>
      <SafeAreaView style={[styles.header]}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" color={'white'} size={25} />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Đồ Ăn Yêu Thích</Text>
        <View style={{width: 25}} />
      </SafeAreaView>
      {loadingInitData ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Spinner color={'#43bb6c'} />
        </View>
      ) : listFood.length === 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: '#43bb6c', fontSize: 20, fontWeight: '500'}}>
            Không Có Sản Phẩm
          </Text>
        </View>
      ) : (
        <View style={[styles.flexContainer]}>
          <FlatList
            style={{paddingTop: 9}}
            maxToRenderPerBatch={50}
            initialNumToRender={30}
            showsVerticalScrollIndicator={false}
            data={listFood}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            renderItem={renderItem}
            onEndReachedThreshold={0.5}
            onEndReached={handleLoadMore}
          />
        </View>
      )}
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
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: DriveWidth,
    height: DriveHeight * 0.12,
    backgroundColor: '#43bb6c',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: -5,
  },
  titleHeader: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
  },
});

export {FavouriteFoodScreen};
