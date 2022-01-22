import React, {useEffect} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {NewTaskStore} from './store/NewTask.store';
import {NewTaskController} from './NewTask.controller';
interface INewTaskProps {
  navigation: NavigationProp<any>;
  store: NewTaskStore;
  controller: NewTaskController;
}

export const NewTask = (props: INewTaskProps) => {
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
NewTask.displayName = 'NewTask';
const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
});
