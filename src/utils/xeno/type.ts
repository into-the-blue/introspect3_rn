import {ReplaySubject} from 'rxjs';
import React from 'react';
export type TFutureTask = {
  params: any;
  subject: ReplaySubject<any>;
};

export type TXenoMessage = {
  eventName: string;
  uniqKey?: string;
  payload: any;
};

export type IReactComponent<P = any> =
  | React.ClassicComponentClass<P>
  | React.ComponentClass<P>
  | React.FunctionComponent<P>
  | React.ForwardRefExoticComponent<P>;

export interface IXenoInjectedProps {
  on: (eventName: string, handler: Function) => void;
  trigger: (eventName: string, params?: any) => ReplaySubject<any>;
}

export type HandlerFunction<T, K extends keyof T> = (params: T[K]) => void;
