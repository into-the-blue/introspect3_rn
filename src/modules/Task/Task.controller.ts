import {IController} from '@/utils';
import {TaskService} from '@/services';
export class TaskController extends IController {
  service: TaskService;
  constructor({service}: {service: TaskService}) {
    super();
    this.service = service;
  }
  static new(params: {service: TaskService}) {
    return new this(params);
  }

  onPressButton = () => {
    this.service.increment();
  };
  viewDidMount = () => {};
  viewWillUnmount = () => {
    this.service.cleanListeners();
    this.service.resetStore();
  };
}
