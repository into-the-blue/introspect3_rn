import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {TaskStore} from './store/Task.store';
import {TaskController} from './Task.controller';
import {CreateItemButton} from './components';
import {Text, TaskItem} from '@/components';
import {ITaskItem} from '@/types';
import {useTailwind} from 'tailwind-rn/dist';
interface ITaskProps {
  navigation: NavigationProp<any>;
  store: TaskStore;
  controller: TaskController;
}

export const Task = (props: ITaskProps) => {
  const {controller} = props;
  const {task, isLoading, items} = props.store;
  const tw = useTailwind();
  useEffect(() => {
    controller.viewDidMount();

    return () => {
      controller.viewWillUnmount();
    };
  }, [controller]);

  const _renderTaskItem = ({item}: {item: ITaskItem; index: number}) => {
    return (
      <TaskItem
        key={item.id}
        taskItem={item}
        onPress={controller.onPressTaskItem}
      />
    );
  };
  return (
    <View style={tw('flex-1')}>
      <FlatList
        data={items}
        renderItem={_renderTaskItem}
        keyExtractor={i => i.id}
      />
      <CreateItemButton onPressCreateItem={controller.onPressCreateItem} />
    </View>
  );
};
Task.displayName = 'Task';
