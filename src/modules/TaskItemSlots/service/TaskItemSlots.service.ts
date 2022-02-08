import {IService} from '@/utils';
import {TaskItemSlotsStore} from '@/stores';
import {NavigationProp} from '@react-navigation/native';

export class TaskItemSlotsService extends IService {
  store: TaskItemSlotsStore;
  navigation: NavigationProp<any>;

  constructor({
    store,
    navigation,
  }: {
    store: TaskItemSlotsStore;
    navigation: NavigationProp<any>;
  }) {
    super();
    this.store = store;
    this.navigation = navigation!;
  }
  static new(args: {
    store: TaskItemSlotsStore;
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
