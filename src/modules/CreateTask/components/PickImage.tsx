import React from 'react';
import {Image, Button, WithTitle} from '@/components';
import {StyleSheet, View} from 'react-native';
import {SCREEN_WIDTH} from '@/utils';

interface IProps {
  imageSource: string | any | undefined;
  onPressPickImage: () => void;
  onPressRandomImage: () => void;
}
export const PickImage = ({
  imageSource,
  onPressPickImage,
  onPressRandomImage,
}: IProps) => {
  return (
    <WithTitle title={'Pick an image'} containerStyle={styles.wrapper}>
      <View style={styles.imageContainer}>
        {!imageSource && (
          <View style={styles.imagePickerContainer}>
            <Button
              title={'Pick image from gallery'}
              onPress={onPressPickImage}
            />
            <Button title={'Get a random one'} onPress={onPressRandomImage} />
          </View>
        )}
        {imageSource && (
          <Image
            style={styles.image}
            // resizeMode={'cover'}
            url={imageSource}
          />
        )}
      </View>
    </WithTitle>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    width: SCREEN_WIDTH,
  },
  imageContainer: {
    height: 260,
    width: 'auto',
    marginTop: 10,
  },
  imagePickerContainer: {
    flexDirection: 'row',
  },
  image: {flex: 1},
});
