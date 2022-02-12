import {IController} from '@/utils';
import {TaskItemSlotsService} from '@/services';
export class TaskItemSlotsController extends IController {
  service: TaskItemSlotsService;
  constructor({service}: {service: TaskItemSlotsService}) {
    super();
    this.service = service;
  }
  static new(params: {service: TaskItemSlotsService}) {
    return new this(params);
  }

  viewDidMount = () => {
    this.service.initListeners();
  };
  viewWillUnmount = () => {
    this.service.cleanListeners();
    this.service.resetStore();
  };
}
