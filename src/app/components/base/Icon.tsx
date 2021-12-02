import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  name: string;
}
export default function MyIcon({ name, ...props }: Props) {
  return <Icon name={name} size={30} color="black" {...props} />;
}
