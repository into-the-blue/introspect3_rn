import {IService} from '@/utils';
import {NewTaskStore} from '@/stores';
import {NavigationProp} from '@react-navigation/native';

export class NewTaskService extends IService {
  store: NewTaskStore;
  navigation: NavigationProp<any>;

  constructor({
    store,
    navigation,
  }: {
    store: NewTaskStore;
    navigation: NavigationProp<any>;
  }) {
    super();
    this.store = store;
    this.navigation = navigation!;
  }
  static new(args: {store: NewTaskStore; navigation: NavigationProp<any>}) {
    return new this(args);
  }

  increment = () => {
    this.store.increment();
  };

  resetStore = () => {
    this.store.reset();
  };
}
