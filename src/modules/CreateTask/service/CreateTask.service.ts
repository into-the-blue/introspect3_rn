import {IService} from '@/utils';
import {CreateTaskStore} from '@/stores';
import {NavigationProp} from '@react-navigation/native';

export class CreateTaskService extends IService {
  store: CreateTaskStore;
  navigation: NavigationProp<any>;

  constructor({
    store,
    navigation,
  }: {
    store: CreateTaskStore;
    navigation: NavigationProp<any>;
  }) {
    super();
    this.store = store;
    this.navigation = navigation!;
  }
  static new(args: {store: CreateTaskStore; navigation: NavigationProp<any>}) {
    return new this(args);
  }

  increment = () => {
    this.store.increment();
  };

  resetStore = () => {
    this.store.reset();
  };
}
