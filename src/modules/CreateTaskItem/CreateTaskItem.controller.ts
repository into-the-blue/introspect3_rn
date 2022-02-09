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

  viewDidMount = () => {
    this.service.initListeners();
  };
  viewWillUnmount = () => {
    this.service.cleanListeners();
    this.service.resetStore();
  };

  onTitleChange = (text: string) => {
    this.service.onTitleChange(text);
  };
  onContentChange = (text: string) => {
    this.service.onContentChange(text);
  };

  onPressCreate = () => {};

  onPressColor = (c: string) => {
    this.service.setSelectedColor(c);
  };
}
