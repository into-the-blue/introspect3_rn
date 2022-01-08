import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {Navigation} from 'react-native-navigation';

export const TaskList = (props: any) => {
  const {count, increment} = props.taskListStore;
  useEffect(() => {}, []);
  return (
    <View style={{flex: 1}}>
      <Text>{`count: ${count}`}</Text>
      <Button title="increase" onPress={increment} />
      <Button
        title="go to detail"
        onPress={() =>
          Navigation.push(props.componentId, {
            component: {
              name: 'TaskDetail',
            },
          })
        }
      />
    </View>
  );
};
