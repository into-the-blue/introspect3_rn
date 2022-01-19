import React, {useEffect} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {TaskStore} from './store/Task.store';
import {TaskController} from './Task.controller';
interface ITaskProps {
  navigation: NavigationProp<any>;
  store: TaskStore;
  controller: TaskController;
}

export const Task = (props: ITaskProps) => {
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
Task.displayName = 'Task';
const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
});
