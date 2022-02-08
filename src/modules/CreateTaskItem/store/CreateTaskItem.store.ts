import {observable, action, makeObservable} from 'mobx';
import {IStore} from '@/utils';
export class CreateTaskItemStore extends IStore {
  name?: string = undefined;
  constructor() {
    super();
    makeObservable(this, {
      title: observable,
      content: observable,

      setTitle: action.bound,
      setContent: action.bound,
    });
  }

  title: string = '';
  content: string = '';
  setTitle = (text: string) => {
    this.title = text;
  };
  setContent = (text: string) => {
    this.content = text;
  };

  reset = () => {
    CreateTaskItemStore.removeNamedStore(this.name!);
  };
}
