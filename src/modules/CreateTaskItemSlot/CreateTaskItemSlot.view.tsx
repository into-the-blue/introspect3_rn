import React, {useEffect} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {CreateTaskItemSlotStore} from './store/CreateTaskItemSlot.store';
import {CreateTaskItemSlotController} from './CreateTaskItemSlot.controller';
import {COLORS} from '@/utils';
interface ICreateTaskItemSlotProps {
  navigation: NavigationProp<any>;
  store: CreateTaskItemSlotStore;
  controller: CreateTaskItemSlotController;
}

export const CreateTaskItemSlot = (props: ICreateTaskItemSlotProps) => {
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
CreateTaskItemSlot.displayName = 'CreateTaskItemSlot';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.viewBackground,
  },
});
