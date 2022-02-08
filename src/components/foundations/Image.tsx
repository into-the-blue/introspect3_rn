import React from 'react';
import FastImage, {FastImageProps, Source} from 'react-native-fast-image';

interface IProps extends Omit<FastImageProps, 'source'> {
  url?: string;
  source?: Source;
  cachePriority?: 'low' | 'normal' | 'high';
}
export const Image = ({source, url, cachePriority, ...restProps}: IProps) => {
  return (
    <FastImage
      source={url ? {uri: url, priority: cachePriority} : source!}
      {...restProps}
    />
  );
};
