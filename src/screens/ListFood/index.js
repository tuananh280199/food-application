import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import {BlurView} from '@react-native-community/blur';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import Snackbar from 'react-native-snackbar';

//others
import {FoodItem} from './components/FoodItem';
import {DriveHeight, DriveWidth} from '../../constants/Dimensions';
import {ItemFilter} from './components/ItemFilter';
import {fetchListFoodByCategory, fetchListHotFood} from './slice/listFoodSlice';
import {LIST_FOOD} from '../../constants/StackNavigation';
import {getErrorMessage} from '../../utils/HandleError';
import {CardFood} from '../Home/components/CardFood';
import {Spinner} from '../../components/Spinner';

const ListFood = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const {category_id, category_name} = route.params;
  const {listFood, currentPage, hasNextPage} = useSelector((state) => {
    const {list, page, hasNext} = state.listFoodByCategory.listFood;
    return {
      listFood: list,
      currentPage: page,
      hasNextPage: hasNext,
    };
  });

  const [loadingInitData, setLoadingInitData] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [outOfProduct, setOutOfProduct] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [checkItem, setCheckItem] = useState('all');

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
      setLoadingInitData(true);
      if (category_id === 0) {
        await dispatch(fetchListHotFood({page: 1}));
      } else {
        await dispatch(fetchListFoodByCategory({category_id, page: 1}));
      }
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
      setLoadingMore(true);
      if (!hasNextPage) {
        setLoadingMore(false);
        setOutOfProduct(true);
        return;
      }
      if (category_id === 0) {
        await dispatch(
          fetchListHotFood({page: currentPage + 1, isLoadMore: true}),
        );
      } else {
        await dispatch(
          fetchListFoodByCategory({
            category_id,
            page: currentPage + 1,
            isLoadMore: true,
          }),
        );
      }
      setLoadingMore(false);
    } catch (e) {
      setLoadingMore(false);
      Snackbar.show({
        text: getErrorMessage(e),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'rgba(245, 101, 101, 1)',
      });
    }
  };

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
      />
    );
  };

  const renderFooter = () => {
    return loadingMore ? (
      <View style={{marginBottom: 10, alignItems: 'center'}}>
        <Spinner color={'#43bb6c'} />
      </View>
    ) : (
      outOfProduct && (
        <View style={{marginBottom: 15, alignItems: 'center'}}>
          <Text style={{color: 'red'}}>Hết Đồ Ăn !!!</Text>
        </View>
      )
    );
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
        <Text style={styles.titleHeader}>{category_name.toUpperCase()}</Text>
        <TouchableOpacity onPress={() => setToggle(!toggle)}>
          <FontAwesome name={'filter'} size={25} color={'#fff'} />
        </TouchableOpacity>
      </View>
      {loadingInitData ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Spinner color={'#43bb6c'} />
        </View>
      ) : listFood.length === 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: '#43bb6c', fontSize: 21, fontWeight: '500'}}>
            Không Có Sản Phẩm
          </Text>
        </View>
      ) : (
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
              data={listFood}
              keyExtractor={(item, index) => index.toString()}
              numColumns={1}
              renderItem={renderItem}
              onEndReachedThreshold={0.5}
              onEndReached={handleLoadMore}
              ListFooterComponent={renderFooter}
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
