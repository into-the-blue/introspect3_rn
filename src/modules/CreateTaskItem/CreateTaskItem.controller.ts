import {IController} from '@/utils';
import {CreateTaskItemService} from '@/services';
export class CreateTaskItemController extends IController {
  service: CreateTaskItemService;
  constructor({service}: {service: CreateTaskItemService}) {
    super();
    this.service = service;
  }
  static new(params: {service: CreateTaskItemService}) {
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
