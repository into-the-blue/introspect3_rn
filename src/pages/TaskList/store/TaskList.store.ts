import {observable, action, makeObservable} from 'mobx';
// import React, {useContext} from 'react';
import {IStore} from '@/utils/baseStore';
export class TaskListStore extends IStore {
  constructor() {
    super();
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
// export const store = new TaskListStore();
// export const useTaskListStore = () => {
//   const context = React.createContext(store);
//   return useContext(context);
// };
