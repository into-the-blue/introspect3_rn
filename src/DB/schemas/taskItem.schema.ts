import {ObjectId} from 'bson';
import {ObjectSchema} from 'realm';

export const TaskItemSchema: ObjectSchema = {
  name: 'TaskItems',
  properties: {
    _id: {type: 'objectId', default: new ObjectId()},
    created_at: {type: 'date', default: new Date()},
    updated_at: {type: 'date', default: new Date()},
    //
    task_id: 'objectId',
    title: 'string',
    content: 'string',
    background_color: 'string',
  },
  primaryKey: '_id',
};
