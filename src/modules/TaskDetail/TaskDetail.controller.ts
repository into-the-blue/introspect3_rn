import {IController} from '@/utils';
import {TaskDetailService} from '@/services';
export class TaskDetailController extends IController {
  service: TaskDetailService;
  constructor(service: TaskDetailService) {
    super();
    this.service = service;
  }
  static new() {
    return new this(TaskDetailService.new());
  }

  onPressButton = () => {
    this.service.increment();
  };
  viewDidMount = () => {};
  viewWillUnmount = () => {
    this.service.resetStore();
  };
}
