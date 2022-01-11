import {observable, action, makeObservable} from 'mobx';
import {IStore} from '@/utils';
import {ITask} from '@/types';
export class TaskListStore extends IStore {
  constructor() {
    super();
    makeObservable(this, {
      tasks: observable,
      setTasks: action.bound,
    });
  }

  tasks: ITask[] = [];

  setTasks = (data: ITask[]) => {
    this.tasks = data;
  };
}
