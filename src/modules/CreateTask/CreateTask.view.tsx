import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {CreateTaskStore} from './store/CreateTask.store';
import {CreateTaskController} from './CreateTask.controller';
import {PickImage} from './components';
import {COLORS} from '@/utils';
import {Button, TextInputWithTitle} from '@/components';
interface ICreateTaskProps {
  navigation: NavigationProp<any>;
  store: CreateTaskStore;
  controller: CreateTaskController;
}

export const CreateTask = (props: ICreateTaskProps) => {
  const {controller} = props;
  const {title, setTitle, imageUrl} = props.store;
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
        imageSource={imageUrl}
        onPressPickImage={controller.onPressPickImage}
        onPressRandomImage={controller.onPressRandomImage}
        onPressDeleteImage={controller.onPressDeleteImage}
      />
      <Button
        disabled={!title.length || !imageUrl}
        title={'Save'}
        onPress={controller.onPressSave}
      />
    </View>
  );
};
CreateTask.displayName = 'CreateTask';
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.viewBackground},
});
