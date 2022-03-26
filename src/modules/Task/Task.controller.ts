import {IController} from '@/utils';
import {TaskService} from '@/services';
import {ITaskItem} from '@/types/task.type';
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

  onPressCreateItem = () => {
    this.service.goToCreateItem();
  };

  onPressTaskItem = (item: ITaskItem) => {
    this.service.goToItemSlot(item);
  };
}
