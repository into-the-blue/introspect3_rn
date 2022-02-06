import React, {useEffect} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {CreateTaskStore} from './store/CreateTask.store';
import {CreateTaskController} from './CreateTask.controller';
import {TextInputWithTitle, PickImage} from './components';
interface ICreateTaskProps {
  navigation: NavigationProp<any>;
  store: CreateTaskStore;
  controller: CreateTaskController;
}

export const CreateTask = (props: ICreateTaskProps) => {
  const {controller} = props;
  const {title, setTitle, image} = props.store;
  useEffect(() => {
    controller.viewDidMount();

    return () => {
      controller.viewWillUnmount();
    };
  }, [controller]);
  return (
    <View style={styles.container}>
      <TextInputWithTitle
        title={'input task name'}
        inputValue={title}
        onChangeText={setTitle}
      />
      <PickImage
        imageSource={undefined}
        onPressPickImage={controller.onPressPickImage}
      />
    </View>
  );
};
CreateTask.displayName = 'CreateTask';
const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
});
