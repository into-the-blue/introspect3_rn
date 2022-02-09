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
      deleteImage: action.bound,
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
    mime,
  }: {
    imageUrl: string;
    width: number;
    height: number;
    size: number;
    mime: string;
  }) => {
    this.imageUrl = imageUrl;
    this.image = {
      source: 'local',
      width,
      height,
      size,
      imageUrl,
      mime,
    };
  };

  setUnsplashImage = () => {};

  reset = () => {
    CreateTaskStore.removeNamedStore(this.name!);
  };

  deleteImage = () => {
    this.imageUrl = undefined;
    this.image = undefined;
  };
}
