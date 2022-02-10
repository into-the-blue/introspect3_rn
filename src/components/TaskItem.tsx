import {ITaskItem} from '@/types';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Pressable, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {Text} from './foundations/Text';
import chroma from 'chroma-js';
interface IProps {
  taskItem: ITaskItem;
  onPress: (item: ITaskItem) => void;
}

interface IPropsDisplay {
  taskItem: Pick<ITaskItem, 'content' | 'backgroundColor' | 'title'>;
  onPress?: any;
}

export const TaskItem = observer(
  ({taskItem, onPress}: IProps | IPropsDisplay) => {
    const tw = useTailwind();
    return (
      <Pressable
        style={[tw('w-auto h-16 mx-8 mt-4 rounded-xl flex-row shadow')]}
        onPress={() => onPress && onPress(taskItem)}>
        <View
          style={[
            tw('w-4 rounded-tl-xl rounded-bl-xl'),
            {backgroundColor: taskItem.backgroundColor},
          ]}
        />
        <View
          style={tw(
            'flex-1 justify-center items-center bg-white rounded-tr-xl rounded-br-xl',
          )}>
          <Text style={tw('text-black')}>{taskItem.title}</Text>
        </View>
      </Pressable>
    );
  },
);
