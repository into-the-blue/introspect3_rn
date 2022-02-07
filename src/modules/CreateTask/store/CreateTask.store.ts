import {observable, action, makeObservable} from 'mobx';
import {IStore} from '@/utils';
import {ITaskImage} from '@/types';
export class CreateTaskStore extends IStore {
  name?: string = undefined;
  constructor() {
    super();
    makeObservable(this, {
      title: observable,
      imageUrl: observable,
      image: observable,
      // actions
      setTitle: action.bound,
      setLocalImage: action.bound,
      setUnsplashImage: action.bound,
    });
  }

  title: string = '';
  image?: ITaskImage = undefined;
  imageUrl?: string = undefined;

  setTitle = (text: string) => {
    this.title = text;
  };

  setLocalImage = ({
    imageUrl,
    width,
    height,
    size,
  }: {
    imageUrl: string;
    width: number;
    height: number;
    size: number;
  }) => {
    this.imageUrl = imageUrl;
    this.image = {
      source: 'local',
      width,
      height,
      size,
      imageUrl,
    };
  };

  setUnsplashImage = () => {};

  reset = () => {
    CreateTaskStore.removeNamedStore(this.name!);
  };
}
