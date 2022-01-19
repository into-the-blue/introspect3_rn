import {IService} from '@/utils';
import {TaskStore} from '@/stores';
import {NavigationProp} from '@react-navigation/native';

export class TaskService extends IService {
  store: TaskStore;
  navigation: NavigationProp<any>;

  constructor({
    store,
    navigation,
  }: {
    store: TaskStore;
    navigation: NavigationProp<any>;
  }) {
    super();
    this.store = store;
    this.navigation = navigation!;
  }
  static new(args: {store: TaskStore; navigation: NavigationProp<any>}) {
    return new this(args);
  }

  increment = () => {
    this.store.increment();
  };

  resetStore = () => {
    this.store.reset();
  };
}
