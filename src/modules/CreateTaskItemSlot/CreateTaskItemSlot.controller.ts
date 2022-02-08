import {IController} from '@/utils';
import {CreateTaskItemSlotService} from '@/services';
export class CreateTaskItemSlotController extends IController {
  service: CreateTaskItemSlotService;
  constructor({service}: {service: CreateTaskItemSlotService}) {
    super();
    this.service = service;
  }
  static new(params: {service: CreateTaskItemSlotService}) {
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
