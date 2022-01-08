import {observable, action, makeObservable} from 'mobx';
import React, {useContext} from 'react';
export class TaskListStore {
  constructor() {
    makeObservable(this, {
      count: observable,
      increment: action.bound,
    });
  }

  count: number = 0;

  increment() {
    this.count += 1;
  }
}
const store = new TaskListStore();
export const useTaskListStore = () => {
  const context = React.createContext(store);
  return useContext(context);
};
