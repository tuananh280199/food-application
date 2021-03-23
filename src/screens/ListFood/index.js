import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import {BlurView} from '@react-native-community/blur';
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
  const [toggle, setToggle] = useState(false);
  const [checkItem, setCheckItem] = useState('all');
  const [conditionFilter, setConditionFilter] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    getInitData();
  }, [conditionFilter]);

  const getInitData = async () => {
    try {
      setLoadingInitData(true);
      if (category_id === 0) {
        await dispatch(fetchListHotFood({page: 1, filter: conditionFilter}));
      } else {
        await dispatch(
          fetchListFoodByCategory({
            category_id,
            page: 1,
            filter: conditionFilter,
          }),
        );
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
        return;
      }
      if (category_id === 0) {
        await dispatch(
          fetchListHotFood({
            page: currentPage + 1,
            filter: conditionFilter,
            isLoadMore: true,
          }),
        );
      } else {
        await dispatch(
          fetchListFoodByCategory({
            category_id,
            page: currentPage + 1,
            filter: conditionFilter,
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
    setConditionFilter('');
    setToggle(!toggle);
  };

  const filterNew = () => {
    setCheckItem('new');
    setConditionFilter('new');
    setToggle(!toggle);
  };

  const filterSale = () => {
    setCheckItem('sale');
    setConditionFilter('sale');
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
    return (
      loadingMore && (
        <View style={{marginBottom: 10, alignItems: 'center'}}>
          <Spinner color={'#43bb6c'} />
        </View>
      )
    );
  };

  return (
    <View style={styles.flexContainer}>
      <SafeAreaView style={[styles.header]}>
        <TouchableOpacity onPress={handleGoBack} style={{marginLeft: 20}}>
          <Ionicons name="arrow-back" color={'white'} size={25} />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>{category_name.toUpperCase()}</Text>
        <TouchableOpacity onPress={() => setToggle(!toggle)}>
          <FontAwesome name={'filter'} size={25} color={'#fff'} style={{marginRight: 20}}/>
        </TouchableOpacity>
      </SafeAreaView>
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
  blur: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});

export {ListFood};
