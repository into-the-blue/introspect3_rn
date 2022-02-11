import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {TagsStore} from './store/Tags.store';
import {TagsController} from './Tags.controller';
import {COLORS} from '@/utils';
import {Button, Text} from '@/components';

interface ITagsProps {
  navigation: NavigationProp<any>;
  store: TagsStore;
  controller: TagsController;
}

export const Tags = (props: ITagsProps) => {
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
Tags.displayName = 'Tags';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.viewBackground,
  },
});
