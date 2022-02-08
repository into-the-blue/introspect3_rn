import {Button} from '@/components';
import React from 'react';
import {View} from 'react-native';

interface IProps {
  onPressCreateItem: () => void;
}

export const CreateItemButton = ({onPressCreateItem}: IProps) => {
  return (
    <View>
      <Button title={'Create an item'} onPress={onPressCreateItem} />
    </View>
  );
};
