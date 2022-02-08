import React from 'react';
import {Pressable} from 'react-native';
import chroma from 'chroma-js';
import {useTailwind} from 'tailwind-rn';

interface IProps {
  color: string;
  isSelected: boolean;
  onPress: (color: string) => void;
}
export const ColorPie = ({color, isSelected, onPress}: IProps) => {
  const tw = useTailwind();
  return (
    <Pressable
      onPress={() => onPress(color)}
      style={[
        tw('w-11 h-11 m-1 rounded-full'),
        {backgroundColor: color},
        isSelected && tw('border-4'),
        isSelected && {
          borderColor: chroma(color).darken(1.5).hex(),
        },
      ]}
    />
  );
};
