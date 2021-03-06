import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {CreateTaskItemStore} from './store/CreateTaskItem.store';
import {CreateTaskItemController} from './CreateTaskItem.controller';
import {ALIGNMENT, COLORS} from '@/utils';
import {Button, ColorPalette, TextInputWithTitle, TaskItem} from '@/components';
import {useTailwind} from 'tailwind-rn/dist';

interface ICreateTaskItemProps {
  navigation: NavigationProp<any>;
  store: CreateTaskItemStore;
  controller: CreateTaskItemController;
}

export const CreateTaskItem = (props: ICreateTaskItemProps) => {
  const {controller, store} = props;
  const {title, content, paletteColors, backgroundColor} = store;
  const tw = useTailwind();
  useEffect(() => {
    controller.viewDidMount();
    return () => {
      controller.viewWillUnmount();
    };
  }, [controller]);
  return (
    <View style={styles.container}>
      {backgroundColor && (
        <TaskItem
          taskItem={{
            title: title.length ? title : 'Your title here',
            content,
            backgroundColor,
          }}
        />
      )}
      <TextInputWithTitle
        title={`item name (${title.length}/20)`}
        inputValue={title}
        onChangeText={controller.onTitleChange}
        textInputProps={{
          maxLength: 20,
        }}
      />
      <TextInputWithTitle
        title={`Description (optional ${content.length}/100)`}
        inputValue={content}
        onChangeText={controller.onContentChange}
        textInputProps={{
          multiline: true,
          style: tw('h-32'),
          maxLength: 100,
          numberOfLines: 5,
        }}
      />
      {!!paletteColors.length && (
        <ColorPalette
          onPressColor={controller.onPressColor}
          colors={paletteColors}
          num={21}
        />
      )}
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
