import {IService} from '@/utils';
import {CreateTaskItemStore} from '@/stores';
import {NavigationProp} from '@react-navigation/native';

export class CreateTaskItemService extends IService {
  store: CreateTaskItemStore;
  navigation: NavigationProp<any>;

  constructor({
    store,
    navigation,
  }: {
    store: CreateTaskItemStore;
    navigation: NavigationProp<any>;
  }) {
    super();
    this.store = store;
    this.navigation = navigation!;
  }
  static new(args: {
    store: CreateTaskItemStore;
    navigation: NavigationProp<any>;
  }) {
    return new this(args);
  }

  increment = () => {
    this.store.increment();
  };

  resetStore = () => {
    this.store.reset();
  };
}
