import {IService} from '@/utils';
import {TaskListStore} from '@/stores';
import {ITask} from '@/types';
import {NavigationProp} from '@react-navigation/native';

const TEST_TASKS: ITask[] = [
  {
    id: '1123123',
    title: 'this is a fake title',
    imageUrl:
      'https://images.unsplash.com/photo-1638401985728-4570ea56992b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0NTI1NXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MTA5MjQ5NA&ixlib=rb-1.2.1&q=80&w=1080',
    createdAt: '2022-01-11',
    updatedAt: '2022-01-11',
  },
];
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
    this.store.setTasks(new Array(10).fill(TEST_TASKS[0]));
  };

  passTaskToDetailPage = () => {};

  goToTaskDetailPage = () => {
    this.navigation.navigate('TaskDetail');
  };
  resetStore = () => {
    this.store.reset();
  };
}
