// import node_modules
import {View, Platform, StyleSheet} from 'react-native';
import React from 'react';

type TabActiveLineProps = {
  focused: boolean,
  color: string,
};

// main
export const TabActiveLine = ({focused, color}: TabActiveLineProps) => (
  <View
    style={[
      styles.tabActive,
      {
        borderColor: focused && Platform.os === 'android' ? color : 'white',
      },
    ]}
  />
);

const styles = StyleSheet.create({
  tabActive: {
    width: '100%',
  },
});
