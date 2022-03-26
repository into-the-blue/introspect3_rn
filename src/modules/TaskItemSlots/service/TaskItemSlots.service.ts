import {IService} from '@/utils';
import {TaskItemSlotsStore} from '@/stores';
import {NavigationProp} from '@react-navigation/native';
import {ITaskItem} from '@/types/task.type';

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

  initListeners = () => {
    this.on('TASK_ITEM_SLOTS_INITIAL_DATA', this.setDerivedData);
  };

  setDerivedData = ({taskItem}: {taskItem: ITaskItem}) => {
    this.store.setTaskItem(taskItem);
  };

  resetStore = () => {
    this.store.reset();
  };
}
