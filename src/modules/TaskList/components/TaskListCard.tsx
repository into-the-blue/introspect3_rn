import React from 'react';
import {observer} from 'mobx-react';
import {StyleSheet, View, Text, Image, TouchableHighlight} from 'react-native';
import {ITask} from '@/types';
interface IProps {
  task: ITask;
  onPress: (task: ITask) => void;
}

export const TaskListCard = observer(({task, onPress}: IProps) => {
  return (
    <TouchableHighlight onPress={() => onPress(task)}>
      <View style={styles.cardContainer}>
        <Image style={styles.image} source={{uri: task.imageUrl}} />
        <Text>{task.title}</Text>
      </View>
    </TouchableHighlight>
  );
});

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
});