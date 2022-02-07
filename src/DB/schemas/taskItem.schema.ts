import {ObjectSchema} from 'realm';

export const TaskItemSchema: ObjectSchema = {
  name: 'TaskItems',
  properties: {
    _id: 'objectId',
    created_at: 'date',
    updated_at: 'date',
    //
    task_id: 'objectId',
    title: 'string',
    content: 'string',
    background_color: 'string',
  },
  primaryKey: '_id',
};
