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
  viewDidMount = () => {};
  viewWillUnmount = () => {
    this.service.cleanListeners();
    this.service.resetStore();
  };

  onPressPickImage = () => {
    this.service.pickLocalImage();
  };

  onPressRandomImage = () => {
    this.service.getRandomImage();
  };

  onPressSave = () => {
    this.service.createTask();
  };

  onPressDeleteImage = () => {
    this.service.deleteImage();
  };
}
