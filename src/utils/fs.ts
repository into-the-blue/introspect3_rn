import {DocumentDirectoryPath} from 'react-native-fs';

export const getLocalFilePath = (filename: string) => {
  return DocumentDirectoryPath + '/' + filename;
};

export const getFilename = (pth: string) => {
  const splited = pth.split('/').reverse();
  if (!splited.length) return pth;
  return splited[0];
};
