import {ITaskItem} from '@/types';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Pressable} from 'react-native';
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
        style={[
          tw('w-auto h-24 mx-8 mt-2 rounded-xl justify-center items-center'),
          {backgroundColor: taskItem.backgroundColor},
        ]}
        onPress={() => onPress && onPress(taskItem)}>
        <Text style={tw('text-white')}>{taskItem.title}</Text>
      </Pressable>
    );
  },
);
