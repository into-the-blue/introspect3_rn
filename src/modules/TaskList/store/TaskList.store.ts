import {observable, action, makeObservable} from 'mobx';
import {IStore} from '@/utils';
import {ITask} from '@/types';
export class TaskListStore extends IStore {
  constructor() {
    super();
    makeObservable(this, {
      tasks: observable,
      setTasks: action.bound,
      addNewTask: action.bound,
      deleteTask: action.bound,
    });
  }

  tasks: ITask[] = [];

  setTasks = (data: ITask[]) => {
    this.tasks = data;
  };

  addNewTask = (task: ITask) => {
    this.tasks = this.tasks.concat([task]);
  };

  deleteTask = (taskId: string) => {
    this.tasks = this.tasks.filter(o => o.id !== taskId);
  };
}
