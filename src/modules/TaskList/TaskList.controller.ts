import {IController} from '@/utils';
import {TaskListService} from '@/services';
import {ITask} from '@/types';
export class TaskListController extends IController {
  service: TaskListService;
  constructor(service: TaskListService) {
    super();
    this.service = service;
  }
  static new() {
    return new this(TaskListService.new());
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

  onPressTaskCard = (task: ITask) => {};
}
