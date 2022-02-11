import {ObjectSchema} from 'realm';

export const TaskItemSlotSchema: ObjectSchema = {
  name: 'TaskItemSlots',
  properties: {
    _id: {type: 'objectId'},
    created_at: {type: 'date'},
    updated_at: {type: 'date'},
    //
    task_item_id: 'objectId',
    content: 'string',
    delayed_times: {type: 'int', default: 0},
    delayed_on: {type: 'date[]', default: []},
  },
  primaryKey: '_id',
};
