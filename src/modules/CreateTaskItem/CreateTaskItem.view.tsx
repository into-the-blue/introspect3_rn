import React, {useEffect} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {CreateTaskItemStore} from './store/CreateTaskItem.store';
import {CreateTaskItemController} from './CreateTaskItem.controller';
import {COLORS} from '@/utils';

interface ICreateTaskItemProps {
  navigation: NavigationProp<any>;
  store: CreateTaskItemStore;
  controller: CreateTaskItemController;
}

export const CreateTaskItem = (props: ICreateTaskItemProps) => {
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
CreateTaskItem.displayName = 'CreateTaskItem';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.viewBackground,
  },
});
