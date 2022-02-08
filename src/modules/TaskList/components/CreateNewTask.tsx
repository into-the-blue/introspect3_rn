import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '@/components';
interface IProps {
  onPress: () => void;
}
export const CreateNewTask = ({onPress}: IProps) => {
  return (
    <View style={styles.container}>
      <Button title={'Create new task'} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {alignItems: 'center'},
});
