import {
  FlexStyle,
  TextStyle,
  ViewStyle,
  ImageStyle,
  StyleSheet,
  StyleProp,
} from 'react-native';
import {camelCase, snakeCase} from 'lodash';

export const isDev = process.env.NODE_ENV === 'development';

type AllStyle = StyleProp<TextStyle | FlexStyle | ViewStyle | ImageStyle>;
export const flattenStyles = (...styles: AllStyle[] | AllStyle[][]) => {
  return StyleSheet.flatten(
    styles.map(s => (Array.isArray(s) ? StyleSheet.flatten(s) : s)),
  );
};

export const isObject = (thing: any) => {
  return Object.prototype.toString.call(thing) === '[object Object]';
};

const toCase =
  (
    processor: Function,
    baseKeyhandler?: {[key: string]: (key: string) => string},
  ) =>
  <T>(obj: T, keyHandler?: {[key: string]: (key: string) => string}): T => {
    if (!obj) return obj;
    if (typeof obj === 'string') {
      return processor(obj) as T;
    }
    const _keyHandler = {...baseKeyhandler, ...keyHandler};
    const recursively = (_obj: any): any => {
      if (Array.isArray(_obj)) return _obj.map(recursively);
      if (!isObject(_obj)) return _obj;
      const tmp: any = {};
      Object.keys(_obj).forEach(key => {
        const item = _obj[key];
        let processedKey = processor(key);
        // take key name from key handler
        if (_keyHandler[key]) processedKey = _keyHandler[key](key);
        // if item is type of array, process item
        if (Array.isArray(item)) {
          tmp[processedKey] = item.map(recursively);
          // if item is type of object
        } else if (isObject(item) && Object.keys(item).length) {
          tmp[processedKey] = recursively(item);
          // do nothing to other types
        } else {
          tmp[processedKey] = item;
        }
      });
      return tmp;
    };

    if (isObject(obj)) return recursively(obj);

    return obj;
  };

export const toCamelCase = toCase(camelCase);

export const toSnakeCase = toCase(snakeCase);

export const sleep = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

export const isNull = (value: any) =>
  value === null || typeof value === 'undefined';

export const pick = <T, K extends keyof T>(
  obj: T,
  keys: K[],
  ignoreNull: boolean = false,
): Pick<T, K> => {
  const toReturn: any = {};
  keys.forEach(key => {
    const value = obj[key];
    if (ignoreNull && isNull(value)) return;
    toReturn[key] = value;
  });
  return toReturn;
};

export const omit = <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const toReturn: any = {};
  Object.keys(obj).forEach((key: any) => {
    if (keys.includes(key)) return;
    const value = obj[key as K];
    toReturn[key] = value;
  });
  return toReturn;
};
