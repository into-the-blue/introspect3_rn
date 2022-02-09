import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import chroma from 'chroma-js';
import {ColorPie} from './ColorPie';
import {useTailwind} from 'tailwind-rn';

interface IProps {
  colors?: string[];
  num?: number;
  onPressColor: (color: string) => void;
}
export const ColorPalette = ({colors, num = 21, onPressColor}: IProps) => {
  const tw = useTailwind();
  const [scaledColors, setColors] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('');
  useEffect(() => {
    const _colors = chroma
      .scale(
        colors && colors.length > 1
          ? colors
          : Array(5)
              .fill(1)
              .map(_ => chroma.random()),
      )
      .mode('lch')
      .colors(num);
    setColors(_colors);
    setSelectedColor(_colors[0]);
    onPressColor(_colors[0]);
  }, [num, colors, onPressColor]);

  const _onPressColor = (c: string) => {
    setSelectedColor(c);
    onPressColor(c);
  };
  return (
    <View style={tw('flex-row flex-wrap justify-center')}>
      {scaledColors.map((color, idx) => (
        <ColorPie
          key={'color-pie' + idx}
          color={color}
          isSelected={selectedColor === color}
          onPress={_onPressColor}
        />
      ))}
    </View>
  );
};
