import React from 'react';
export type {IXenoInjectedProps} from '../utils/xeno';
import {TaskListEvents} from '../modules/TaskList';
import {TaskEvents} from '../modules/Task';
import {CreateTaskEvents} from '../modules/CreateTask';
// <hook> import module events here </hook>

export type IEvents = TaskListEvents & TaskEvents & CreateTaskEvents;
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
  tagId: string;
  tag: ITag;
}
export interface ITaskItemSlot extends IMetadata {
  taskItemId: string;
  feedbacks?: TFeedback[];
  content: string;
  delayedTimes: number;
  delayedOn: string[];
}
export interface ITaskItem extends IMetadata {
  taskId: string;
  title: string;
  content: string;
  slots?: ITaskItemSlot[];
  backgroundColor: string;
  feedbacks?: TFeedback[];
}

export interface ITaskImage {
  id: string;
  source: 'unsplash' | 'local' | 'camera';
  imageUrl: string;
  unsplashInfo: {
    color: string;
    rawUrl: string;
    authorName: string;
    portfolioUrl: string;
  };
}
export interface ITask extends IMetadata {
  title: string;
  image: ITaskImage;
  items?: ITaskItem[];
  feedbacks?: TFeedback[];
}

export type childOf<T> = new () => T;
