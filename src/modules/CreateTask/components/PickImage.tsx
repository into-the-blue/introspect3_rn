import React from 'react';
import {Image, Text, WithTitle} from '@/components';
import {StyleSheet, View} from 'react-native';

interface IProps {
  imageSource: string | any | undefined;
  onPressPickImage: () => void;
}
export const PickImage = ({imageSource, onPressPickImage}: IProps) => {
  return (
    <WithTitle title={'Pick an image'}>
      <View style={styles.imageContainer}>
        {!imageSource && <Text>{'No image'}</Text>}
        {imageSource && (
          <Image resizeMode={'cover'} source={imageSource} url={imageSource} />
        )}
      </View>
    </WithTitle>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    width: 'auto',
    height: 300,
  },
});
