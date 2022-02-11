import {ObjectSchema} from 'realm';

export const TaskSchema: ObjectSchema = {
  name: 'Tasks',
  primaryKey: '_id',
  properties: {
    _id: {type: 'objectId'},
    created_at: {type: 'date'},
    updated_at: {type: 'date'},
    title: 'string',
    image: '{}',
  },
};
