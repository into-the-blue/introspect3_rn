import {getFilename, getLocalFilePath, IService} from '@/utils';
import {CreateTaskStore} from '@/stores';
import {NavigationProp} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Alert} from 'react-native';
import RNFS from 'react-native-fs';
import {TaskAPI} from '@/API';
import {ITask} from '@/types/task.type';
export class CreateTaskService extends IService {
  store: CreateTaskStore;
  navigation: NavigationProp<any>;

  constructor({
    store,
    navigation,
  }: {
    store: CreateTaskStore;
    navigation: NavigationProp<any>;
  }) {
    super();
    this.store = store;
    this.navigation = navigation!;
  }
  static new(args: {store: CreateTaskStore; navigation: NavigationProp<any>}) {
    return new this(args);
  }

  resetStore = () => {
    this.store.reset();
  };

  /**
   *
   *
   * @memberof CreateTaskService
   * example result: {"fileName": "0BB50DB8-EAEE-445F-AD8F-9D4948ADFB05.jpg", "fileSize": 4572474, "height": 2848, "type": "image/jpg", "uri": "file:///Users/origami/Library/Developer/CoreSimulator/Devices/41657F61-04F9-4F11-878E-E876023DC31E/data/Containers/Data/Application/FE6BACC6-F80C-4049-B926-ED31438C17B9/tmp/0BB50DB8-EAEE-445F-AD8F-9D4948ADFB05.jpg", "width": 4288}
   */
  pickLocalImage = async () => {
    try {
      const res = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 1080,
        maxHeight: 3000,
        selectionLimit: 1,
        // includeExtra: true,
      });
      const {didCancel, errorCode, errorMessage, assets} = res;
      if (didCancel) {
        // user cancel selection
        return;
      }
      if (errorCode === 'permission') {
        // permission not granted
        return;
      }
      if (errorCode === 'others') {
        // see error message
        Alert.alert(errorMessage!);
        return;
      }
      if (!assets || !assets.length) {
        // no selected image
        return;
      }
      const {fileSize, uri, height, width, type, fileName} = assets[0];
      const imageUrl = await this.copyImageToAppDocDir(uri!, fileSize!);
      this.store.setLocalImage({
        imageUrl: imageUrl!,
        height: height!,
        width: width!,
        size: fileSize!,
        mime: type!,
      });
    } catch (err) {}
  };

  /**
   *
   *
   * @memberof CreateTaskService
   * save to local DB
   * convert local pth to filename
   */
  saveImage = () => {
    return TaskAPI.createTask({
      title: this.store.title,
      image: {
        ...this.store.image!,
        imageUrl: getFilename(this.store.image!.imageUrl),
      },
    });
  };

  copyImageToAppDocDir = async (pth: string, fileSize: number) => {
    const {freeSpace} = await RNFS.getFSInfo();
    if (freeSpace < fileSize) {
      Alert.alert('No enough space');
      return;
    }
    const filename = getFilename(pth);
    const destPth = getLocalFilePath(filename);
    const existed = await RNFS.exists(destPth);
    if (existed) {
      Alert.alert('File existed');
      return destPth;
    }
    await RNFS.copyFile(pth, destPth);
    return destPth;
  };

  getRandomImage = async () => {};

  addNewTaskToList = (task: ITask) => {
    this.trigger('TASKLIST_NEW_TASK', task);
  };
  createTask = async () => {
    if (!this.store.image || !this.store.title.length) {
      return Alert.alert('Require image and title');
    }
    try {
      const taskObj = await this.saveImage();
      this.addNewTaskToList(taskObj);
      this.navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  };

  deleteImage = () => {
    this.store.deleteImage();
  };
}
