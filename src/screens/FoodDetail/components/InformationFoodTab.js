import * as React from 'react';
import {StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import {DescriptionFood} from './DescriptionFood';
import {IntroductionFood} from './IntroductionFood';
import {DriveWidth} from '../../../constants/Dimensions';

const InformationFoodTab = (props) => {
  const {product} = props;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Giới Thiệu'},
    {key: 'second', title: 'Chi Tiết'},
  ]);

  const renderScene = SceneMap({
    first: () => <DescriptionFood product={product} />,
    second: () => <IntroductionFood product={product} />,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      labelStyle={{color: '#000', fontWeight: '500'}}
      indicatorStyle={{backgroundColor: '#43bb6c'}}
      style={{backgroundColor: '#fff', marginTop: 5}}
    />
  );

  return (
    <TabView
      style={styles.container}
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={DriveWidth}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
});

export {InformationFoodTab};
