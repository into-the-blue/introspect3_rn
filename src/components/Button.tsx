import React from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {Text} from './Text';
import {ALIGNMENT, COLORS, flattenStyles} from '@/utils';

type TButtonSize = 'small' | 'middle' | 'large';
type TButtonColor = 'primary' | 'secondary' | 'danger' | 'dangerSecondary';
interface IProps {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  size: TButtonSize;
  color: TButtonColor;
  disabled: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loading?: boolean;
}

const getSizeConfigs = (size: TButtonSize) => {
  const containerSizeStyles = {
    small: styles.small,
    middle: styles.middle,
    large: styles.large,
  };
  const textSizeProps = {
    small: {size: 'h5'},
    middle: {size: 'h5'},
    large: {size: 'h3'},
  };
  return {
    containerSizeStyles: containerSizeStyles[size],
    textProps: textSizeProps[size],
  };
};
const getColorConfigs = (color: TButtonColor) => {
  const containerColorStyles = {
    primary: styles.primary,
    secondary: styles.secondary,
    danger: styles.danger,
    dangerSecondary: styles.dangerSecondary,
  };
  const textColorStyles = {
    primary: styles.textPrimary,
    secondary: styles.textSecondary,
    danger: styles.textDanger,
    dangerSecondary: styles.textDangerSecondary,
  };
  return {
    containerColorStyles: containerColorStyles[color],
    textColorStyles: textColorStyles[color],
  };
};

export const Button = ({
  title,
  onPress,
  color,
  size = 'middle',
  style,
  textStyle,
  disabled = false,
  loading = false,
}: IProps) => {
  const {containerColorStyles, textColorStyles} = getColorConfigs(color);
  const {containerSizeStyles, textProps} = getSizeConfigs(size);
  const containerStyles = flattenStyles(
    styles.container,
    containerColorStyles,
    containerSizeStyles,
    style,
  );
  const textStyles = flattenStyles(textColorStyles, textStyle);
  return (
    <Pressable
      android_ripple={{
        color: COLORS.accent,
        radius: 40,
        foreground: false,
        borderless: true,
      }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({pressed}) => [{opacity: pressed ? 0.7 : 1}]}>
      <View style={containerStyles}>
        <Text style={textStyles} {...textProps}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  small: {
    ...ALIGNMENT.BUTTON.small,
  },
  middle: {
    ...ALIGNMENT.BUTTON.middle,
  },
  large: {
    ...ALIGNMENT.BUTTON.large,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  textPrimary: {
    color: COLORS.white,
  },
  secondary: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  textSecondary: {
    color: COLORS.primary,
  },
  danger: {
    backgroundColor: COLORS.danger,
  },
  textDanger: {
    color: COLORS.white,
  },
  dangerSecondary: {
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  textDangerSecondary: {
    color: COLORS.danger,
  },
  disabled: {
    borderWidth: 1,
  },
});
