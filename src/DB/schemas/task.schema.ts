import {ObjectId} from 'bson';
import {ObjectSchema} from 'realm';

export const TaskSchema: ObjectSchema = {
  name: 'Tasks',
  primaryKey: '_id',
  properties: {
    _id: {type: 'objectId', default: new ObjectId()},
    created_at: {type: 'date', default: new Date()},
    updated_at: {type: 'date', default: new Date()},
    title: 'string',
    image: '{}',
  },
};
