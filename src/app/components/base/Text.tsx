import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

export default function Text({ children, ...props }: TextProps) {
  return <RNText {...props}>{children}</RNText>;
}
