import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {CreateTaskItemStore} from './store/CreateTaskItem.store';
import {CreateTaskItemController} from './CreateTaskItem.controller';
import {ALIGNMENT, COLORS} from '@/utils';
import {Button, ColorPalette, Text, TextInputWithTitle} from '@/components';

interface ICreateTaskItemProps {
  navigation: NavigationProp<any>;
  store: CreateTaskItemStore;
  controller: CreateTaskItemController;
}

export const CreateTaskItem = (props: ICreateTaskItemProps) => {
  const {controller, store} = props;
  useEffect(() => {
    controller.viewDidMount();

    return () => {
      controller.viewWillUnmount();
    };
  }, [controller]);
  return (
    <View style={styles.container}>
      <TextInputWithTitle
        title={'item name'}
        inputValue={store.title}
        onChangeText={controller.onTitleChange}
      />
      <TextInputWithTitle
        title={'Description (optional)'}
        inputValue={store.content}
        onChangeText={controller.onContentChange}
      />
      <ColorPalette />
      <Button
        style={styles.buttonCreate}
        title={'Create'}
        onPress={controller.onPressCreate}
      />
    </View>
  );
};
CreateTaskItem.displayName = 'CreateTaskItem';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.viewBackground,
  },
  buttonCreate: {
    marginTop: ALIGNMENT.gap,
  },
});
