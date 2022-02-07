import {ObjectSchema} from 'realm';

export const TaskItemSlotSchema: ObjectSchema = {
  name: 'TaskItemSlots',
  properties: {
    _id: 'objectId',
    created_at: 'date',
    updated_at: 'date',
    //
    task_item_id: 'objectId',
    content: 'string',
    delayed_times: 'int',
    delayed_on: 'date[]',
  },
  primaryKey: '_id',
};
