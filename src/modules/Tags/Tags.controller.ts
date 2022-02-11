import {IController} from '@/utils';
import {TagsService} from '@/services';
export class TagsController extends IController {
  service: TagsService;
  constructor({service}: {service: TagsService}) {
    super();
    this.service = service;
  }
  static new(params: {service: TagsService}) {
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
