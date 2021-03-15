// import node_modules
import React from 'react';
import {View, StyleSheet} from 'react-native';

//main
type DividerProps = {
  style?: Object,
};
const Divider = (props: DividerProps) => {
  const {style = {}} = props;
  return <View style={[styles.customDivider, style]} />;
};

const styles = StyleSheet.create({
  customDivider: {
    height: 1,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(212, 212, 212, 1)',
  },
});
export {Divider};
