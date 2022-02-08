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

  viewDidMount = () => {
    this.service.queryTaskItems();
    this.service.initListeners();
  };
  viewWillUnmount = () => {
    this.service.cleanListeners();
    this.service.resetStore();
  };
}
