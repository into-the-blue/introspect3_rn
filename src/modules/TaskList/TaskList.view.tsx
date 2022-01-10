import React, {useEffect} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {NavigationComponentProps} from 'react-native-navigation';
import {TaskListStore} from './store/TaskList.store';
import {TaskListController} from './TaskList.controller';
interface ITaskListProps extends NavigationComponentProps {
  store: TaskListStore;
  controller: TaskListController;
}

export const TaskList = (props: ITaskListProps) => {
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
TaskList.displayName = 'TaskList';
const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
});
