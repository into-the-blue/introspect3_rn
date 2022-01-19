import {from, of} from 'rxjs';
export const isPromise = (obj: any) => {
  return String(obj) === '[object Promise]';
};

export const toObservable = (res: any) => {
  return isPromise(res) ? from(res) : of(res);
};
export const zip = (arr1: any[], arr2: any[]) => {
  const maxLen = Math.max(arr1.length, arr2.length);
  const res = [];
  for (let i = 0; i < maxLen; i++) {
    res.push([arr1[i], arr2[i]]);
  }
  return res;
};

export const map2Array = (
  _map: Map<any, any>,
  valueExtractor: (v: any) => any = _ => _,
) => {
  const res = [];
  const entries = _map.entries();
  let item = entries.next();
  while (!item.done) {
    res.push(valueExtractor(item.value));
    item = entries.next();
  }
  return res;
};
export const isDev = process.env.NODE_ENV === 'development';
