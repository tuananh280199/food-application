// import node_modules
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

// import components
import {Divider} from '../../../components/Divider';

// main
type ItemFilterProps = {
  children?: any,
  nameIcon: string,
  style?: Object,
  title: string,
  checked: boolean,
  onSelectItem: Function,
};
const ItemFilter = (props: ItemFilterProps) => {
  const {style = {}, checked = false, title, onSelectItem, children} = props;
  return (
    <TouchableOpacity onPress={onSelectItem}>
      <View style={[styles.customList, style]}>
        <View style={styles.wrapperContain}>
          {children}
          <Text style={checked ? styles.textCheck : styles.textNoCheck}>
            {title}
          </Text>
        </View>
        {checked && (
          <AntDesign style={styles.iconCheck} name="check" size={20} />
        )}
      </View>
      <Divider />
    </TouchableOpacity>
  );
};

export {ItemFilter};

const styles = StyleSheet.create({
  customList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 50,
    marginHorizontal: 12
  },
  wrapperContain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCheck: {
    color: 'black',
    fontSize: 14,
    marginLeft: 12,
  },
  textNoCheck: {
    color: 'gray',
    fontSize: 14,
    marginLeft: 12,
  },
  iconCheck: {
    color: '#43bb6c',
  },
});
