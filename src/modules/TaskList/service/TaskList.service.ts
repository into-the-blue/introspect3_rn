import {IService} from '@/utils';
import {TaskListStore} from '@/stores';

export class TaskListService extends IService {
  store: TaskListStore;
  constructor(store: TaskListStore) {
    super();
    this.store = store;
  }
  static new() {
    return new this(TaskListStore.getReservedStore);
  }

  increment = () => {
    this.store.increment();
  };

  resetStore = () => {
    this.store.reset();
  };
}
