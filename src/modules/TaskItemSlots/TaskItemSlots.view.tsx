import React, {useEffect} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {TaskItemSlotsStore} from './store/TaskItemSlots.store';
import {TaskItemSlotsController} from './TaskItemSlots.controller';
import {COLORS} from '@/utils';

interface ITaskItemSlotsProps {
  navigation: NavigationProp<any>;
  store: TaskItemSlotsStore;
  controller: TaskItemSlotsController;
}

export const TaskItemSlots = (props: ITaskItemSlotsProps) => {
  const {controller} = props;
  const {count} = props.store;
  useEffect(() => {
    controller.viewDidMount();

    return () => {
      controller.viewWillUnmount();
    };
  }, [controller]);
  return (
    <View style={styles.container}>
      <Text>{`${count}`}</Text>
      <Button title="increase" onPress={props.controller.onPressButton} />
    </View>
  );
};
TaskItemSlots.displayName = 'TaskItemSlots';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.viewBackground,
  },
});
