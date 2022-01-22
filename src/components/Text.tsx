import React from 'react';
import {StyleSheet, Text as OriginText, TextProps} from 'react-native';
import {flattenStyles, COLORS, FONT_SIZE} from '@/utils';

type ITextType = 'h2' | 'h3' | 'h5';
type ITextColor = 'primary' | 'secondary' | 'danger';
interface IProps extends TextProps {
  type?: ITextType;
  color?: ITextColor;
}

const getTextTypeStyles = (type: ITextType) => {
  const textTypeStyles = {
    h2: styles.h2,
    h3: styles.h3,
    h5: styles.h5,
  };
  return textTypeStyles[type];
};

const getTextColorStyles = (color: ITextColor) => {
  const textColorStyles = {
    primary: styles.primary,
    secondary: styles.secondary,
    danger: styles.danger,
  };
  return textColorStyles[color];
};
export const Text = ({
  children,
  type = 'h5',
  color = 'primary',
  style,
  ...restProps
}: IProps) => {
  const styles = [getTextTypeStyles(type), getTextColorStyles(color)];
  return (
    <OriginText
      allowFontScaling={false}
      style={flattenStyles(styles, style)}
      {...restProps}>
      {children}
    </OriginText>
  );
};

const styles = StyleSheet.create({
  default: {
    color: COLORS.primaryText,
  },
  h2: {
    fontSize: FONT_SIZE.h2,
  },
  h3: {
    fontSize: FONT_SIZE.h3,
  },
  h5: {
    fontSize: FONT_SIZE.h5,
  },
  primary: {
    color: COLORS.primaryText,
  },
  secondary: {
    color: COLORS.secondaryText,
  },
  danger: {
    color: COLORS.danger,
  },
});
