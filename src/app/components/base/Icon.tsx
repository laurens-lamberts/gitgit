import React from 'react';
import { IconProps } from 'react-native-vector-icons/Icon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props extends IconProps {
  name: string;
}
export default function MyIcon({ name, color, size, ...props }: Props) {
  return <Icon name={name} size={size ?? 30} color={color ?? 'black'} {...props} />;
}
