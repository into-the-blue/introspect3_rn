import {IController} from '@/utils';
import {TaskListService} from '@/services';
export class TaskListController extends IController {
  service: TaskListService;
  constructor(service: TaskListService) {
    super();
    this.service = service;
  }
  static new() {
    return new this(TaskListService.new());
  }

  onPressButton = () => {
    this.service.increment();
  };
  viewDidMount = () => {};
  viewWillUnmount = () => {
    this.service.resetStore();
  };
}
