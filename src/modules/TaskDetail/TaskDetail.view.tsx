import React, {useEffect} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {TaskDetailStore} from './store/TaskDetail.store';
import {TaskDetailController} from './TaskDetail.controller';
interface ITaskDetailProps {
  store: TaskDetailStore;
  controller: TaskDetailController;
}

export const TaskDetail = (props: ITaskDetailProps) => {
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
TaskDetail.displayName = 'TaskDetail';
const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
});
