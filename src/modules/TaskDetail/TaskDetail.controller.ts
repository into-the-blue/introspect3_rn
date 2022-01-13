import {IController} from '@/utils';
import {TaskDetailService} from '@/services';
import {NavigationProp} from '@react-navigation/native';
export class TaskDetailController extends IController {
  service: TaskDetailService;
  constructor(service: TaskDetailService) {
    super();
    this.service = service;
  }
  static new(_navigation: NavigationProp<any>) {
    return new this(TaskDetailService.new(_navigation));
  }

  onPressButton = () => {
    this.service.increment();
  };
  viewDidMount = () => {};
  viewWillUnmount = () => {
    this.service.resetStore();
  };
}
