import {observable, action, makeObservable} from 'mobx';
import {IStore} from '@/utils';
export class CreateTaskItemStore extends IStore {
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
    CreateTaskItemStore.removeNamedStore(this.name!);
  };
}
