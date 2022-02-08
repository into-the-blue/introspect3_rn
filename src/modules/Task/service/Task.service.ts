import {IService} from '@/utils';
import {TaskStore} from '@/stores';
import {NavigationProp} from '@react-navigation/native';
import {TaskItemAPI} from '@/API';

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
  };

  queryTaskItems = async () => {
    if (!this.store.task) return;
    try {
      const items = await TaskItemAPI.getAllItems(this.store.task.id);
      this.store.setItems(items);
      console.log(items);
    } catch (err) {
      console.error(err);
    }
  };

  setDerivedData = ({task}: Pick<TaskStore, 'task'>) => {
    this.store.setTask(task!);
    this.queryTaskItems();
  };

  goToCreateItem = () => {
    this.navigation.navigate('CreateTaskItem');
  };

  resetStore = () => {
    this.store.reset();
  };
}
