import React from 'react';
import {ActivityIndicator} from 'react-native';

type SpinnerProps = {
  color?: string,
  size?: string,
};
export const Spinner = (props: SpinnerProps) => {
  return <ActivityIndicator size={props.size || 'small'} color={props.color} />;
};
