import {observable, action, makeObservable} from 'mobx';
// import React, {useContext} from 'react';
import {IStore} from '@/utils';
export class TaskDetailStore extends IStore {
  constructor() {
    super();
    makeObservable(this, {
      count: observable,
      increment: action.bound,
    });
  }

  count: number = 0;

  increment = () => {
    this.count += 1;
  };
}
