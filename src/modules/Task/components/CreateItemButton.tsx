import {Button} from '@/components';
import React from 'react';
import {View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';

interface IProps {
  onPressCreateItem: () => void;
}

export const CreateItemButton = ({onPressCreateItem}: IProps) => {
  const tw = useTailwind();
  return (
    <Button
      style={tw('absolute bottom-16 right-6 w-12 h-12 rounded-full')}
      title={'+'}
      onPress={onPressCreateItem}
    />
  );
};
