import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

type RadioButtonProps = {
  options: Array,
  horizontal?: boolean,
  onChangeSelect?: Function,
  selected?: Number,
  styleContainer?: any,
  styleItem?: any,
  styleOutlineCircle?: any,
  styleInnerCircle?: any,
  styleText?: any,
};

export const RadioButton = (props: RadioButtonProps) => {
  const {
    options,
    horizontal,
    onChangeSelect,
    selected,
    styleContainer,
    styleItem,
    styleOutlineCircle,
    styleInnerCircle,
    styleText,
  } = props;
  return (
    <View style={[horizontal && styles.horizontal, styleContainer]}>
      {options.map((opt, index) => (
        <View style={[{flexDirection: 'row'}, styleItem]}>
          <TouchableOpacity
            onPress={() => onChangeSelect(opt, index)}
            style={styles.optContainer}>
            <View style={[styles.outlineCircle, styleOutlineCircle]}>
              {selected === index && (
                <View style={[styles.innerCircle, styleInnerCircle]} />
              )}
            </View>
          </TouchableOpacity>
          <Text
            style={[
              styles.txt,
              {color: selected === index ? '#444' : '#777'},
              styleText,
            ]}>
            {opt}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  optContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outlineCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  txt: {
    fontSize: 14,
    marginLeft: 7,
  },
});
