import {IController} from '@/utils';
import {NewTaskService} from '@/services';
export class NewTaskController extends IController {
  service: NewTaskService;
  constructor({service}: {service: NewTaskService}) {
    super();
    this.service = service;
  }
  static new(params: {service: NewTaskService}) {
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
