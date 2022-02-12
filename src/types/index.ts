import React from 'react';
export type {IXenoInjectedProps} from '../utils/xeno';
import {TaskListEvents} from '../modules/TaskList';
import {TaskEvents} from '../modules/Task';
import {CreateTaskEvents} from '../modules/CreateTask';
import {CreateTaskItemEvents} from '../modules/CreateTaskItem';
import {TaskItemSlotsEvents} from '../modules/TaskItemSlots';
import {CreateTaskItemSlotEvents} from '../modules/CreateTaskItemSlot';
import {TagsEvents} from '../modules/Tags';
// <hook> import module events here </hook>

export type IEvents = TaskListEvents &
  TaskEvents &
  CreateTaskEvents &
  CreateTaskItemEvents &
  TaskItemSlotsEvents &
  CreateTaskItemSlotEvents &
  TagsEvents;
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
  finished: boolean;
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
  id?: string;
  source: 'unsplash' | 'local' | 'camera';
  // if it is local image, only save filename to DB, when retrieve from DB, generate path with DocumentDirectoryPath
  imageUrl: string;
  width: number;
  height: number;
  size?: number;
  mime?: string;
  unsplashInfo?: {
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

export interface AndroidImageColors {
  dominant?: string;
  average?: string;
  vibrant?: string;
  darkVibrant?: string;
  lightVibrant?: string;
  darkMuted?: string;
  lightMuted?: string;
  muted?: string;
  platform: 'android';
}

export interface IOSImageColors {
  background: string;
  primary: string; // optional
  secondary: string; // optional
  detail: string; // optional
  platform: 'ios';
}

export interface ImageColors {
  primary: string;
  secondary: string;
  //
  average: string;
  allColors: string[];
  origin: AndroidImageColors | IOSImageColors;
}
