import {IController} from '@/utils';
import {TaskListService} from '@/services';
import {ITask} from '@/types';
import {NavigationProp} from '@react-navigation/native';
export class TaskListController extends IController {
  service: TaskListService;
  constructor(service: TaskListService) {
    super();
    this.service = service;
  }
  static new(_navigation: NavigationProp<any>) {
    return new this(TaskListService.new(_navigation));
  }

  viewDidMount = () => {
    this.queryTasks();
  };
  viewWillUnmount = () => {
    this.service.resetStore();
  };

  queryTasks = () => {
    this.service.queryTasks();
  };

  onPressTaskCard = (_task: ITask) => {
    this.service.goToTaskDetailPage();
  };
}
