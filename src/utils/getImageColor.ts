import chroma from 'chroma-js';
import {uniq} from 'lodash';
import ImageColor from 'react-native-image-colors';
import {omit} from './util';
import {
  AndroidImageColors,
  IOSImageColors,
  ImageColors,
} from '@/types/image.type';

const _pickAndroidSecondaryColor = (colors: AndroidImageColors): string => {
  const candidates = Object.values(
    omit(colors as AndroidImageColors, ['platform', 'average', 'dominant']),
  ).filter(v => v.toLowerCase() !== '#ffffff' && v !== '#000000');
  if (!candidates.length) return colors.vibrant!;
  let flag = 99999;
  let res = candidates[0];
  candidates.forEach(color => {
    const e = chroma.deltaE(color, colors.average!);
    if (e < flag) {
      flag = e;
      res = color;
    }
  });
  return res;
};
export const getImageColors = async (url: string): Promise<ImageColors> => {
  const res = await ImageColor.getColors(url);
  const platform = res.platform;
  const resp = {};
  const allColors = uniq(Object.values(omit(res, ['platform']))) as string[];
  if (platform === 'android') {
    return {
      allColors,
      origin: res,
      average: res.average!,
      primary: res.dominant!,
      secondary: _pickAndroidSecondaryColor(res),
    };
  }

  return {
    allColors,
    origin: res as IOSImageColors,
    primary: (resp as IOSImageColors).background,
    secondary: (resp as IOSImageColors).primary,
    average: chroma.average(allColors).hex(),
  };
};
