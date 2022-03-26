import React from 'react';
import {observer} from 'mobx-react-lite';
import {StyleSheet, View, Pressable} from 'react-native';
import {ITask} from '@/types/task.type';
import {Text, Image, Button} from '@/components';
interface IProps {
  task: ITask;
  onPress: (task: ITask) => void;
  onPressDeleteTask: (task: ITask) => void;
  index: number;
}

export const TaskListCard = observer(
  ({task, onPress, onPressDeleteTask}: IProps) => {
    return (
      <Pressable onPress={() => onPress(task)}>
        <View style={styles.cardContainer}>
          <Image style={styles.image} source={{uri: task.image.imageUrl}} />
          <Button
            style={styles.deleteTask}
            title={'delete Task'}
            onPress={() => onPressDeleteTask(task)}
          />
          <Text>{task.title}</Text>
        </View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 15,
    height: 200,
    width: 'auto',
    marginTop: 20,
  },
  image: {
    flex: 1,
    width: 'auto',
  },
  deleteTask: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
