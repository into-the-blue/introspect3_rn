import {observable, action, makeObservable} from 'mobx';
import {IStore} from '@/utils';
import {ITask, ITaskItem} from '@/types/task.type';
export class TaskStore extends IStore {
  name?: string = undefined;

  constructor() {
    super();
    makeObservable(this, {
      task: observable,
      isLoading: observable,
      items: observable,
      //
      setLoading: action.bound,
      setTask: action.bound,
      setItems: action.bound,
      addItem: action.bound,
    });
  }
  isLoading: boolean = true;
  task?: ITask = undefined;
  items: ITaskItem[] = [];

  setLoading = (loading: boolean) => {
    this.isLoading = loading;
  };
  setTask = (task: ITask) => {
    this.task = task;
  };
  setItems = (items: ITaskItem[]) => {
    this.items = items;
  };
  addItem = (item: ITaskItem) => {
    this.items = this.items.concat(item);
  };

  reset = () => {
    TaskStore.removeNamedStore(this.name!);
  };
}
