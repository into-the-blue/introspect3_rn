import {ALIGNMENT, flattenStyles} from '@/utils';
import React from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import {Text} from './foundations/Text';

interface IProps {
  title: string;
  children?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}
export const WithTitle = ({title, children, containerStyle}: IProps) => {
  return (
    <View style={[styles.container, flattenStyles(containerStyle)]}>
      <Text color={'secondary'}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ALIGNMENT.gap,
    marginTop: ALIGNMENT.gap,
  },
});
