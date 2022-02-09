import {IService} from '@/utils';
import {CreateTaskItemStore} from '@/stores';
import {NavigationProp} from '@react-navigation/native';
import {getImageColors} from '@/utils';
import chroma from 'chroma-js';
import {flatten} from 'lodash';
import RNFS from 'react-native-fs';

export class CreateTaskItemService extends IService {
  store: CreateTaskItemStore;
  navigation: NavigationProp<any>;

  constructor({
    store,
    navigation,
  }: {
    store: CreateTaskItemStore;
    navigation: NavigationProp<any>;
  }) {
    super();
    this.store = store;
    this.navigation = navigation!;
  }
  static new(args: {
    store: CreateTaskItemStore;
    navigation: NavigationProp<any>;
  }) {
    return new this(args);
  }

  initListeners = () => {
    this.on('CREATE_TASK_ITEM_INITIAL_DATA', this.setDerivedData);
  };
  setDerivedData = async ({task}: Pick<CreateTaskItemStore, 'task'>) => {
    this.store.setTask(task!);
    const imgUrl = task?.image.imageUrl!;
    const img =
      task?.image.source === 'local'
        ? await this.getLocalImage(imgUrl, task.image.mime)
        : imgUrl;
    this.getPaletteColors(img);
  };

  /**
   *
   *
   * @memberof CreateTaskItemService
   * get base64 of local image
   */
  getLocalImage = async (imgUrl: string, mime?: string) => {
    if (!(await RNFS.exists(imgUrl))) {
      console.warn('Local image doesnt exist');
      return undefined;
    }
    if (!mime) {
      mime = 'image/' + imgUrl.split('.').reverse()[0];
    }
    const data = await RNFS.readFile(imgUrl, 'base64');
    return 'data:' + mime + ';' + 'base64,' + data;
  };

  /**
   *
   *
   * @memberof CreateTaskItemService
   * generate palette colors, take 6 random colors if local image doesnt exist
   */
  getPaletteColors = async (image?: string) => {
    const _random6 = () => {
      return Array(6)
        .fill(1)
        .map(_ => chroma.random().hex());
    };
    const _purify = (cs: string[]) => {
      return cs.filter(c => c !== '#FFFFFF' && c !== '#000000');
    };
    if (!image) return _random6();
    try {
      const colors = await getImageColors(image);
      const purified = _purify(colors.allColors);
      if (purified.length === 0) {
        this.store.setPaletteColors(_random6());
        return;
      }
      this.store.setPaletteColors(purified);
    } catch (err) {
      console.error(err);
    }
  };
  onTitleChange = (text: string) => {
    this.store.setTitle(text);
  };
  onContentChange = (text: string) => {
    this.store.setContent(text);
  };

  resetStore = () => {
    this.store.reset();
  };

  setSelectedColor = (c: string) => {
    this.store.setColor(c);
  };
}
