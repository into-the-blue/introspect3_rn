import {ALIGNMENT} from '@/utils';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from './Text';

interface IProps {
  title: string;
  children?: React.ReactNode;
}
export const WithTitle = ({title, children}: IProps) => {
  return (
    <View style={styles.container}>
      <Text color={'secondary'}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ALIGNMENT.gap,
  },
});
