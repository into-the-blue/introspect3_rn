import {IService} from '@/utils';
import {TaskDetailStore} from '@/stores';

export class TaskDetailService extends IService {
  store: TaskDetailStore;
  constructor(store: TaskDetailStore) {
    super();
    this.store = store;
  }
  static new() {
    return new this(TaskDetailStore.getReservedStore);
  }

  increment = () => {
    this.store.increment();
  };

  resetStore = () => {
    this.store.reset();
  };
}
