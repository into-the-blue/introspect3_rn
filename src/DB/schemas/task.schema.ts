import {ObjectSchema} from 'realm';

export const TaskSchema: ObjectSchema = {
  name: 'Tasks',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    created_at: 'date',
    updated_at: 'date',
    title: 'string',
    image: '{}',
  },
};
