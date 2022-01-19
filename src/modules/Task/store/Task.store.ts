import {observable, action, makeObservable} from 'mobx';
import {IStore} from '@/utils';
export class TaskStore extends IStore {
  name?: string = undefined;
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

  reset = () => {
    TaskStore.removeNamedStore(this.name!);
  };
}
