import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {TaskStore} from './store/Task.store';
import {TaskController} from './Task.controller';
import {TaskItem, CreateItemButton} from './components';
import {Text} from '@/components';
import {ITaskItem} from '@/types';
interface ITaskProps {
  navigation: NavigationProp<any>;
  store: TaskStore;
  controller: TaskController;
}

export const Task = (props: ITaskProps) => {
  const {controller} = props;
  const {task, isLoading, items} = props.store;
  useEffect(() => {
    controller.viewDidMount();

    return () => {
      controller.viewWillUnmount();
    };
  }, [controller]);

  const _renderTaskItem = ({item}: {item: ITaskItem; index: number}) => {
    return <TaskItem item={item} />;
  };
  return (
    <View style={styles.container}>
      <Text>{task?.title}</Text>
      <FlatList
        data={items}
        renderItem={_renderTaskItem}
        keyExtractor={i => i.id}
        ListFooterComponent={
          <CreateItemButton onPressCreateItem={controller.onPressCreateItem} />
        }
      />
    </View>
  );
};
Task.displayName = 'Task';
const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
});
