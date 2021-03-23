import React from 'react';
import {TouchableOpacity, StyleSheet, Text, Image} from 'react-native';

type ItemSearchProps = {
  icon?: any,
  name?: string,
  onClick?: Function,
};

const ItemSearch = (props: ItemSearchProps) => {
  const {icon, name, onClick} = props;
  return (
    <TouchableOpacity style={styles.wrapItem} onPress={onClick}>
      {icon}
      <Text style={{textAlign: 'center', marginTop: 5}}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#80ffd4',
    backgroundColor: '#fff',
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 1,
  },
});

export {ItemSearch};
