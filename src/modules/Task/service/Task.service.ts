import {IService} from '@/utils';
import {TaskStore} from '@/stores';
import {NavigationProp} from '@react-navigation/native';
import {TaskItemAPI} from '@/API';
import {ITaskItem} from '@/types';

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
  initListeners = () => {
    this.on('TASK_INITIAL_DATA', this.setDerivedData);
    this.on('TASK_ON_NEW_ITEM', this.onNewItem);
  };

  queryTaskItems = async () => {
    if (!this.store.task) return;
    try {
      const items = await TaskItemAPI.getAllItems(this.store.task.id);
      this.store.setItems(items);
    } catch (err) {
      console.error(err);
    }
  };

  setDerivedData = ({task}: Pick<TaskStore, 'task'>) => {
    this.store.setTask(task!);
    this.queryTaskItems();
  };

  onNewItem = (item: ITaskItem) => {
    this.store.addItem(item);
  };

  /**
   *
   *
   * @memberof TaskService
   * when press create item
   * 1. pass `task` to create item page
   * 2. go to page
   */
  goToCreateItem = () => {
    this.trigger('CREATE_TASK_ITEM_INITIAL_DATA', {task: this.store.task});
    this.navigation.navigate('CreateTaskItem');
  };

  /**
   *
   *
   * @memberof TaskService
   * when press task item
   */
  goToItemSlot = (item: ITaskItem) => {};

  resetStore = () => {
    this.store.reset();
  };
}
