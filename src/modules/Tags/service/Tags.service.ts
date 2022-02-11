import {IService} from '@/utils';
import {TagsStore} from '@/stores';
import {NavigationProp} from '@react-navigation/native';

export class TagsService extends IService {
  store: TagsStore;
  navigation: NavigationProp<any>;

  constructor({
    store,
    navigation,
  }: {
    store: TagsStore;
    navigation: NavigationProp<any>;
  }) {
    super();
    this.store = store;
    this.navigation = navigation!;
  }
  static new(args: {store: TagsStore; navigation: NavigationProp<any>}) {
    return new this(args);
  }

  increment = () => {
    this.store.increment();
  };

  resetStore = () => {
    this.store.reset();
  };
}
