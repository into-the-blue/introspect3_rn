import {ObjectSchema} from 'realm';

export const TaskItemSchema: ObjectSchema = {
  name: 'TaskItems',
  properties: {
    _id: {type: 'objectId'},
    created_at: {type: 'date'},
    updated_at: {type: 'date'},
    //
    task_id: 'objectId',
    title: 'string',
    content: 'string',
    background_color: 'string',
  },
  primaryKey: '_id',
};
