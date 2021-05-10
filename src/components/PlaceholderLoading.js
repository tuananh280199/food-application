import React from 'react';
import {Platform, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {DriveHeight, DriveWidth} from '../constants/Dimensions';

export const AdvertisementPlaceholder = () => {
  return (
    <View
      style={{
        flex: 1,
        height: DriveHeight * (Platform.OS === 'ios' ? 0.21 : 0.24),
        width: DriveWidth * 0.92,
      }}>
      <SkeletonPlaceholder>
        <View>
          <View
            style={{
              height: DriveHeight * (Platform.OS === 'ios' ? 0.21 : 0.24),
              width: DriveWidth * 0.92,
              borderRadius: 8,
            }}
          />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export const CardPlaceholderProductHot = () => {
  return (
    <View
      style={{
        flex: 1,
        margin: 11,
        width: DriveWidth * 0.47,
        height: DriveWidth * 0.52,
      }}>
      <SkeletonPlaceholder>
        <View>
          <View
            style={{
              width: DriveWidth * 0.47,
              height: DriveWidth * 0.33,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />
          <View
            style={{
              marginTop: 3,
              width: DriveWidth * 0.47,
              height: DriveWidth * 0.06,
            }}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                marginTop: 3,
                width: DriveWidth * 0.21,
                height: DriveWidth * 0.06,
              }}
            />
            <View
              style={{
                marginTop: 3,
                width: DriveWidth * 0.25,
                height: DriveWidth * 0.06,
              }}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                marginTop: 3,
                width: DriveWidth * 0.18,
                height: DriveWidth * 0.06,
                borderBottomLeftRadius: 5,
              }}
            />
            <View
              style={{
                marginTop: 3,
                width: DriveWidth * 0.18,
                height: DriveWidth * 0.06,
              }}
            />
            <View
              style={{
                marginTop: 3,
                width: DriveWidth * 0.09,
                height: DriveWidth * 0.06,
                borderBottomRightRadius: 5,
              }}
            />
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export const CardPlaceholderProductHint = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        marginVertical: 8,
        width: DriveWidth * 0.45,
        height: DriveWidth * 0.51,
      }}>
      <SkeletonPlaceholder>
        <View>
          <View
            style={{
              width: DriveWidth * 0.45,
              height: DriveWidth * 0.51,
              borderRadius: 10,
            }}
          />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export const CategoryPlaceholder = () => {
  return (
    <View
      style={{
        flex: 1,
        marginTop: 10,
        marginHorizontal: 10,
        width: DriveWidth / 3 - 30,
        height: DriveWidth / 3 - 30,
      }}>
      <SkeletonPlaceholder>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              width: DriveWidth / 3 - 30,
              height: DriveWidth / 3 - 65,
              borderRadius: 10,
            }}
          />
          <View
            style={{
              marginTop: 10,
              width: DriveWidth / 3 - 30,
              height: 25,
              borderRadius: 10,
            }}
          />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};
