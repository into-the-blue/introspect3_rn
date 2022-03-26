import {IService} from '@/utils';
import {TaskListStore} from '@/stores';
import {ITask} from '@/types/task.type';
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

  /**
   *
   *
   * @memberof TaskListService
   * query all tasks from db
   */
  queryTasks = async () => {
    try {
      const tasks = await TaskAPI.getAllTasks();
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

  initListeners = () => {
    this.on('TASKLIST_NEW_TASK', (task: ITask) => {
      this.store.addNewTask(task);
    });
  };

  deleteTask = async (task: ITask) => {
    try {
      await TaskAPI.deleteTask(task.id);
      this.store.deleteTask(task.id);
    } catch (err) {
      console.error(err);
    }
  };
}
