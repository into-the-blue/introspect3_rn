import {observable, action, makeObservable} from 'mobx';
import {IStore} from '@/utils';
import {ITaskImage} from '@/types';
export class CreateTaskStore extends IStore {
  name?: string = undefined;
  constructor() {
    super();
    makeObservable(this, {
      title: observable,
      setTitle: action.bound,
      setLocalImage: action.bound,
      setUnsplashImage: action.bound,
    });
  }

  title: string = '';
  image?: ITaskImage;

  setTitle = (text: string) => {
    this.title = text;
  };

  setLocalImage = () => {};

  setUnsplashImage = () => {};

  reset = () => {
    CreateTaskStore.removeNamedStore(this.name!);
  };
}
