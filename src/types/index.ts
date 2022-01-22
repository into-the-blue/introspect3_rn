import React from 'react';
export type {IXenoInjectedProps} from '../utils/xeno';
import {TaskListEvents} from '../modules/TaskList/events';
import {TaskEvents} from '../modules/Task';
import {NewTaskEvents} from '../modules/NewTask';
// <hook> import module events here </hook>

export type IEvents = TaskListEvents & TaskEvents & NewTaskEvents;
// <hook> add event type to end </hook>
export type IReactComponent<P = any> =
  | React.ClassicComponentClass<P>
  | React.ComponentClass<P>
  | React.FunctionComponent<P>
  | React.ForwardRefExoticComponent<P>;

interface ITag extends IMetadata {
  id: string;
  backgroundColor: string;
  title: string;
  type: '-1' | '0' | '1';
}
interface IMetadata {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface TFeedback extends IMetadata {
  id: string;
  content: string;
  locked: boolean;
  targetId: string;
  tag: ITag;
}
export interface ITaskItemSlot extends IMetadata {
  taskItemId: string;
  feedbacks?: TFeedback[];
}
export interface ITaskItem extends IMetadata {
  taskId: string;
  title: string;
  content: string;
  slots?: ITaskItemSlot[];
  backgroundColor: string;
  feedbacks?: TFeedback[];
  delayedTimes: number;
  delayedOn: string[];
}

export interface ITask extends IMetadata {
  title: string;
  imageUrl: string;
  items?: ITaskItem[];
  feedbacks?: TFeedback[];
}

export type childOf<T> = new () => T;
