import { lightenDarkenColor } from '@domains/interface/helpers/Color';
import useTheme from '@domains/interface/hooks/useTheme';
import React, { useState } from 'react';
import { TextProps, TouchableOpacity, TouchableOpacityProps, View, ViewProps } from 'react-native';
import Text from './Text';

interface Props extends ViewProps, TouchableOpacityProps {
  is3D?: boolean;
}

const BUTTON_HEIGHT = 6;
const BUTTON_RADIUS = 6;

export default function Button({ children, style, is3D, onPress, onPressIn, onPressOut, ...props }: Props) {
  const theme = useTheme();
  const [pressed, setPressed] = useState(false);

  return (
    <View style={style} {...props}>
      {is3D && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: lightenDarkenColor(theme.button.primary.background, -20),
            borderRadius: BUTTON_RADIUS,
          }}
        />
      )}
      <TouchableOpacity
        style={{
          backgroundColor: theme.button.primary.background,
          borderColor: theme.button.primary.border,
          borderWidth: 1,
          borderRadius: BUTTON_RADIUS,
          paddingHorizontal: 12,
          paddingVertical: 4,
          alignItems: 'center',
          justifyContent: 'center',
          top: is3D && !pressed ? -BUTTON_HEIGHT : undefined,
          flex: 1,
          flexDirection: 'row',
        }}
        activeOpacity={is3D ? 1 : undefined}
        onPress={onPress}
        onPressIn={(event) => {
          setPressed(true);
          // TODO: animate
          !!onPressIn && onPressIn(event);
        }}
        onPressOut={(event) => {
          setPressed(false);
          // TODO: animate
          !!onPressOut && onPressOut(event);
        }}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
}

function ButtonText({ children, style, ...props }: TextProps) {
  const theme = useTheme();
  return (
    <Text
      style={[
        {
          textAlign: 'center',
          color: theme.button.primary.text,
          textTransform: 'uppercase',
          fontWeight: 'bold',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

Button.Text = ButtonText;
