import { lightenDarkenColor } from '@domains/interface/helpers/Color';
import useTheme from '@domains/interface/hooks/useTheme';
import React, { useRef, useState } from 'react';
import {
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  Animated,
  Easing,
} from 'react-native';
import Pressable from 'react-native-macos/Libraries/Components/Pressable/Pressable';
import Text from './Text';

interface Props extends ViewProps, TouchableOpacityProps {
  backgroundColor?: string;
  is3D?: boolean;
}

const BUTTON_HEIGHT = 6;
const BUTTON_RADIUS = 6;

export default function Button({
  children,
  style,
  backgroundColor,
  is3D,
  onPress,
  onPressIn,
  onPressOut,
  ...props
}: Props) {
  const theme = useTheme();
  const pressAnim = useRef(new Animated.Value(-BUTTON_HEIGHT)).current;

  const backgroundColorToUse = backgroundColor ?? theme.button.primary.background;

  return (
    <View style={style} {...props}>
      {is3D && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: lightenDarkenColor(backgroundColorToUse, -20),
            borderRadius: BUTTON_RADIUS,
          }}
        />
      )}
      <Animated.View
        style={{
          flex: 1,
          top: is3D ? pressAnim : undefined,
        }}
      >
        <Pressable
          style={{
            backgroundColor: backgroundColorToUse,
            borderColor: theme.button.primary.border,
            borderWidth: 1,
            borderRadius: BUTTON_RADIUS,
            paddingHorizontal: 12,
            paddingVertical: 4,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            flexDirection: 'row',
          }}
          //activeOpacity={is3D ? 1 : undefined}
          onPress={onPress}
          onPressIn={(event) => {
            if (is3D) {
              Animated.timing(pressAnim, {
                toValue: -2,
                duration: 40,
                easing: Easing.linear,
                useNativeDriver: false,
              }).start();
            }
            onPressIn?.(event);
          }}
          onPressOut={(event) => {
            if (is3D) {
              Animated.sequence([
                Animated.timing(pressAnim, {
                  toValue: -BUTTON_HEIGHT - 1,
                  duration: 140,
                  easing: Easing.ease,
                  useNativeDriver: false,
                }),
                Animated.timing(pressAnim, {
                  toValue: -BUTTON_HEIGHT,
                  duration: 140,
                  easing: Easing.ease,
                  useNativeDriver: false,
                }),
              ]).start();
            }
            onPressOut?.(event);
          }}
          /* onHoverIn={() => {
            if (is3D) {
              Animated.timing(pressAnim, {
                toValue: -BUTTON_HEIGHT + 1,
                duration: 40,
                easing: Easing.linear,
                useNativeDriver: false,
              }).start();
            }
          }}
          onHoverOut={() => {
            if (is3D) {
              Animated.timing(pressAnim, {
                toValue: -BUTTON_HEIGHT,
                duration: 40,
                easing: Easing.linear,
                useNativeDriver: false,
              }).start();
            }
          }} */
        >
          {children}
        </Pressable>
      </Animated.View>
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
