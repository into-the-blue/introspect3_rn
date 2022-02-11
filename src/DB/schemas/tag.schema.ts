import {ObjectSchema} from 'realm';

export const TagSchema: ObjectSchema = {
  name: 'Tags',
  properties: {
    _id: {type: 'objectId'},
    created_at: {type: 'date'},
    updated_at: {type: 'date'},
    //
    title: 'string',
    type: 'string',
    background_color: 'string',
  },
  primaryKey: '_id',
};
