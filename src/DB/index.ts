import {toCamelCase, toSnakeCase} from '@/utils';

import Realm from 'realm';
import {
  TaskSchema,
  TagSchema,
  TaskItemSchema,
  TaskItemSlotSchema,
  FeedbackSchema,
} from './schemas';

export const DB = new Realm({
  path: 'introspect_3',
  schema: [
    TaskSchema,
    TagSchema,
    TaskItemSchema,
    TaskItemSlotSchema,
    FeedbackSchema,
  ],
});
export const COLLECTIONS = {
  Task: TaskSchema.name,
  Tag: TagSchema.name,
  TaskItem: TaskItemSchema.name,
  TaskItemSlot: TaskItemSchema.name,
  Feedback: FeedbackSchema.name,
};

type TCOLL = typeof COLLECTIONS;

export const retriveDoc = <T>(name: string, query?: string): Promise<T[]> =>
  new Promise((resolve, reject) => {
    try {
      const docs = DB.objects(name);
      if (query)
        return resolve(docs.filtered(query).map(o => toCamelCase(o.toJSON())));
      return resolve(docs.map(o => toCamelCase(o.toJSON())));
    } catch (err) {
      reject(err);
    }
  });

export const createDoc = <K extends keyof TCOLL, T>(
  name: TCOLL[K],
  properties: T,
): Promise<any> =>
  new Promise((resolve, reject) => {
    try {
      DB.write(() => {
        const res = DB.create(name, toSnakeCase(properties));
        resolve(toCamelCase(res.toJSON()));
      });
    } catch (err) {
      reject(err);
    }
  });

export const deleteDocFromObjectId = (name: string, objectId: string) =>
  new Promise((resolve, reject) => {
    try {
      DB.write(() => {
        const obj = DB.objectForPrimaryKey(name, objectId);
        DB.delete(obj);
        resolve(undefined);
      });
    } catch (err) {
      reject(err);
    }
  });

export const deleteDoc = (object: Realm.Object): Promise<void> =>
  new Promise((resolve, reject) => {
    try {
      DB.write(() => {
        DB.delete(object);
        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });

export const updateDoc = (
  colName: string,
  objId: string,
  modifier: (obj?: Realm.Object) => Realm.Object,
) =>
  new Promise((resolve, reject) => {
    try {
      const obj = DB.objectForPrimaryKey(colName, objId);
      modifier(obj);
      resolve;
    } catch (err) {
      reject(err);
    }
  });
