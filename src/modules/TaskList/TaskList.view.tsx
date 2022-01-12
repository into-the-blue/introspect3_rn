import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {TaskListStore} from './store/TaskList.store';
import {TaskListController} from './TaskList.controller';
import {ITask} from '@/types';
import {TaskListCard} from './components/TaskListCard';
interface ITaskListProps {
  store: TaskListStore;
  controller: TaskListController;
}

export const TaskList = (props: ITaskListProps) => {
  const {controller} = props;
  const {tasks} = props.store;
  useEffect(() => {
    controller.viewDidMount();

    return () => {
      controller.viewWillUnmount();
    };
  }, [controller]);
  const renderTaskCard = ({item}: {item: ITask; index: number}) => {
    return <TaskListCard task={item} onPress={controller.onPressTaskCard} />;
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={tasks}
        renderItem={renderTaskCard}
        keyExtractor={(_, idx) => `task_card_${idx}`}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
TaskList.displayName = 'TaskList';
const styles = StyleSheet.create({
  container: {flex: 1},
  flatList: {flex: 1},
});
