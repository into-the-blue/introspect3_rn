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

  onPressButton = () => {
    this.service.increment();
  };
  viewDidMount = () => {};
  viewWillUnmount = () => {
    this.service.cleanListeners();
    this.service.resetStore();
  };
}
