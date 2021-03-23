//node_modules
import React, {useLayoutEffect} from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, SafeAreaView } from "react-native";
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//others
import {DriveHeight, DriveWidth} from '../../constants/Dimensions';

const ContactScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.flexContainer}>
      <SafeAreaView style={[styles.header]}>
        <Text style={styles.titleHeader}>LIÊN HỆ</Text>
      </SafeAreaView>
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
    justifyContent: 'center',
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
});

export {ContactScreen};
