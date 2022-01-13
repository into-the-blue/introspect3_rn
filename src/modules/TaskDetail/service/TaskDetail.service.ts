import {IService} from '@/utils';
import {TaskDetailStore} from '@/stores';
import {NavigationProp} from '@react-navigation/native';

export class TaskDetailService extends IService {
  store: TaskDetailStore;
  navigation: NavigationProp<any>;

  constructor(
    store: TaskDetailStore,
    _navigation: NavigationProp<any>,
    ..._args: any[]
  ) {
    super();
    this.store = store;
    this.navigation = _navigation!;
  }
  static new(_navigation: NavigationProp<any>, ...args: any[]) {
    return new this(TaskDetailStore.getReservedStore, _navigation, ...args);
  }

  increment = () => {
    this.store.increment();
  };

  resetStore = () => {
    this.store.reset();
  };
}
