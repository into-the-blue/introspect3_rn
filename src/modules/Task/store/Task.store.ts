import {observable, action, makeObservable} from 'mobx';
import {IStore} from '@/utils';
import {ITask} from '@/types';
export class TaskStore extends IStore {
  name?: string = undefined;

  constructor() {
    super();
    makeObservable(this, {
      task: observable,
      isLoading: observable,
      setLoading: action.bound,
      setTask: action.bound,
    });
  }
  isLoading: boolean = true;
  task?: ITask = undefined;
  setLoading = (loading: boolean) => {
    this.isLoading = loading;
  };
  setTask = (task: ITask) => {
    this.task = task;
  };

  reset = () => {
    TaskStore.removeNamedStore(this.name!);
  };
}
