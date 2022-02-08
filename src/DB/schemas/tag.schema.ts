import {ObjectId} from 'bson';
import {ObjectSchema} from 'realm';

export const TagSchema: ObjectSchema = {
  name: 'Tags',
  properties: {
    _id: {type: 'objectId', default: new ObjectId()},
    created_at: {type: 'date', default: new Date()},
    updated_at: {type: 'date', default: new Date()},
    //
    title: 'string',
    type: 'string',
    background_color: 'string',
  },
  primaryKey: '_id',
};
