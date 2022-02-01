import {Button} from '@/components';
import React from 'react';
import {View, Text} from 'react-native';

interface IProps {
  onPress: () => void;
}
export const CreateNewTask = ({onPress}: IProps) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Button title={'Create new task'} onPress={onPress} />
    </View>
  );
};
