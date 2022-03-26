import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {TaskListStore} from './store/TaskList.store';
import {TaskListController} from './TaskList.controller';
import {ITask} from '@/types/task.type';
import {TaskListCard, CreateNewTask} from './components';
interface ITaskListProps {
  navigation: NavigationProp<any>;
  store: TaskListStore;
  controller: TaskListController;
}

export const TaskList = (props: ITaskListProps) => {
  const {controller, store} = props;
  useEffect(() => {
    controller.viewDidMount();
    return () => {
      controller.viewWillUnmount();
    };
  }, [controller]);
  const renderTaskCard = ({item, index}: {item: ITask; index: number}) => {
    return (
      <TaskListCard
        task={item}
        onPress={controller.onPressTaskCard}
        onPressDeleteTask={controller.onPressDeleteTask}
        index={index}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        contentContainerStyle={styles.listContainer}
        data={store.tasks}
        renderItem={renderTaskCard}
        ListFooterComponent={
          <CreateNewTask onPress={controller.onPressCreateNewTask} />
        }
        keyExtractor={_ => _.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
TaskList.displayName = 'TaskList';
const styles = StyleSheet.create({
  container: {flex: 1},
  flatList: {flex: 1},
  listContainer: {
    paddingBottom: 50,
  },
});
