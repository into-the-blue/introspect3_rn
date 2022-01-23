import React from 'react';
import {Image as RNImage, ImageProps, ImageSourcePropType} from 'react-native';

interface IProps extends Omit<ImageProps, 'source'> {
  url?: string;
  source?: ImageSourcePropType;
}

export const Image = ({source, url}: IProps) => {
  return <RNImage source={url ? {uri: url} : source!} />;
};
