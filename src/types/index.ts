import React from 'react';

export type IReactComponent<P = any> =
  | React.ClassicComponentClass<P>
  | React.ComponentClass<P>
  | React.FunctionComponent<P>
  | React.ForwardRefExoticComponent<P>;

export type TTaskSlotFeedback = {
  id: string;
  backgroundColor: string;
  title: string;
  type: '-1' | '0' | '1';
};
interface IMetadata {
  id: string;
  createdAt: string;
  updatedAt: string;
}
export interface ITaskSlot extends IMetadata {
  taskDetailId: string;
  feedbackId: string;
  feedback?: TTaskSlotFeedback;
}
export interface ITaskDetail extends IMetadata {
  taskId: string;
  title: string;
  content: string;
  slots?: ITaskSlot[];
  backgroundColor: string;
}
export interface ITask extends IMetadata {
  title: string;
  imageUrl: string;
  details?: ITaskDetail[];
}
