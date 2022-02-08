import {IService} from '@/utils';
import {CreateTaskItemSlotStore} from '@/stores';
import {NavigationProp} from '@react-navigation/native';

export class CreateTaskItemSlotService extends IService {
  store: CreateTaskItemSlotStore;
  navigation: NavigationProp<any>;

  constructor({
    store,
    navigation,
  }: {
    store: CreateTaskItemSlotStore;
    navigation: NavigationProp<any>;
  }) {
    super();
    this.store = store;
    this.navigation = navigation!;
  }
  static new(args: {
    store: CreateTaskItemSlotStore;
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
