import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ITaskItem} from '@/types';

interface ITaskItemProps {
  item: ITaskItem;
}
export const TaskItem = ({item}: ITaskItemProps) => {
  return (
    <View style={styles.container}>
      <Text>{item.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
