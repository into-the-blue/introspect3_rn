import {IService} from '@/utils';
import {CreateTaskStore} from '@/stores';
import {NavigationProp} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Alert} from 'react-native';
import {
  DocumentDirectoryPath,
  copyFile,
  exists,
  getFSInfo,
} from 'react-native-fs';
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
      const {fileSize, uri, height, width} = assets[0];
      const imageUrl = await this.copyImageToAppDoc(uri!, fileSize!);
      this.store.setLocalImage({
        uri: imageUrl!,
        height: height!,
        width: width!,
        fileSize: fileSize!,
      });
      console.log(assets[0], imageUrl);
    } catch (err) {}
  };

  copyImageToAppDoc = async (pth: string, fileSize: number) => {
    const {freeSpace} = await getFSInfo();
    if (freeSpace < fileSize) {
      Alert.alert('No enough space');
      return;
    }
    const filename = pth.split('/').reverse()[0];
    const destPth = DocumentDirectoryPath + '/' + filename;
    const existed = await exists(destPth);
    if (existed) {
      Alert.alert('File existed');
      return destPth;
    }
    await copyFile(pth, destPth);
    return destPth;
  };

  getRandomImage = async () => {};

  createTask = async () => {};
}
