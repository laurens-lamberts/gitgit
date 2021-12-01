import useTheme from '@domains/interface/hooks/useTheme';
import React from 'react';
import { TextProps, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Text from './Text';

export default function Button({ children, style, ...props }: TouchableOpacityProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: theme.button.primary.background,
          borderColor: theme.button.primary.border,
          borderWidth: 1,
          borderRadius: 4,
          paddingHorizontal: 12,
          paddingVertical: 4,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}

function ButtonText({ children, style, ...props }: TextProps) {
  return (
    <Text style={[{ textAlign: 'center' }, style]} {...props}>
      {children}
    </Text>
  );
}

Button.Text = ButtonText;
