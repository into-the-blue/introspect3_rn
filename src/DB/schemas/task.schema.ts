import {ObjectSchema} from 'realm';

export const TaskSchema: ObjectSchema = {
  name: 'Tasks',
  properties: {
    _id: 'objectId',
    created_at: 'date',
    updated_at: 'date',
    title: 'string',
    image_url: 'string',
  },
  primaryKey: '_id',
};