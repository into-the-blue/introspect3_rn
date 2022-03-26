import {IController} from '@/utils';
import {TaskListService} from '@/services';
import {ITask} from '@/types/task.type';
export class TaskListController extends IController {
  service: TaskListService;
  constructor({service}: {service: TaskListService}) {
    super();
    this.service = service;
  }
  static new(params: {service: TaskListService}) {
    return new this(params);
  }

  viewDidMount = () => {
    this.queryTasks();
    this.service.initListeners();
  };
  viewWillUnmount = () => {
    this.service.cleanListeners();
    this.service.resetStore();
  };

  queryTasks = () => {
    this.service.queryTasks();
  };

  onPressTaskCard = (task: ITask) => {
    this.service.goToTaskDetailPage(task);
  };

  onPressCreateNewTask = () => {
    this.service.goToCreateTaskPage();
  };

  onPressDeleteTask = (task: ITask) => {
    this.service.deleteTask(task);
  };
}
