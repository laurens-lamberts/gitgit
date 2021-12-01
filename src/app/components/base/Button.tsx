import useTheme from '@domains/interface/hooks/useTheme';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

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
