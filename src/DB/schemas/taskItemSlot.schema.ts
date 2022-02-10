import {ObjectId} from 'bson';
import {ObjectSchema} from 'realm';

export const TaskItemSlotSchema: ObjectSchema = {
  name: 'TaskItemSlots',
  properties: {
    _id: {type: 'objectId', default: new ObjectId()},
    created_at: {type: 'date', default: new Date()},
    updated_at: {type: 'date', default: new Date()},
    //
    task_item_id: 'objectId',
    content: 'string',
    delayed_times: {type: 'int', default: 0},
    delayed_on: {type: 'date[]', default: []},
  },
  primaryKey: '_id',
};
