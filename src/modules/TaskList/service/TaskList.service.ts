import {IService} from '@/utils';
import {TaskListStore} from '@/stores';
import {ITask} from '@/types';
import {NavigationProp} from '@react-navigation/native';
import {TaskAPI} from '@/API';

export class TaskListService extends IService {
  store: TaskListStore;
  navigation: NavigationProp<any>;

  constructor({
    store,
    navigation,
  }: {
    store: TaskListStore;
    navigation: NavigationProp<any>;
  }) {
    super();
    this.store = store;
    this.navigation = navigation!;
  }
  static new(args: {store: TaskListStore; navigation: NavigationProp<any>}) {
    return new this(args);
  }

  queryTasks = async () => {
    try {
      const tasks = await TaskAPI.getAllTasks();
      console.log(tasks, tasks[0].image);
      this.store.setTasks(tasks);
    } catch (err) {
      console.error(err);
    }
  };

  passTaskToDetailPage = (task: ITask) => {
    this.trigger('TASK_INITIAL_DATA', {task});
  };

  goToTaskDetailPage = (task: ITask) => {
    this.passTaskToDetailPage(task);
    this.navigation.navigate('Task');
  };
  resetStore = () => {
    this.store.reset();
  };

  goToCreateTaskPage = () => {
    this.navigation.navigate('CreateTask');
  };
}
