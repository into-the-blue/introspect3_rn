import {ObjectSchema} from 'realm';

export const TagSchema: ObjectSchema = {
  name: 'Tags',
  properties: {
    _id: 'objectId',
    created_at: 'date',
    updated_at: 'date',
    //
    title: 'string',
    type: 'string',
    background_color: 'string',
  },
  primaryKey: '_id',
};
