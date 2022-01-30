import {IController} from '@/utils';
import {CreateTaskService} from '@/services';
export class CreateTaskController extends IController {
  service: CreateTaskService;
  constructor({service}: {service: CreateTaskService}) {
    super();
    this.service = service;
  }
  static new(params: {service: CreateTaskService}) {
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
