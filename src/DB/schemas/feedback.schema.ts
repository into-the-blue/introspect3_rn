import {ObjectId} from 'bson';
import {ObjectSchema} from 'realm';

export const FeedbackSchema: ObjectSchema = {
  name: 'Feedbacks',
  properties: {
    _id: {type: 'objectId', default: new ObjectId()},
    created_at: {type: 'date', default: new Date()},
    updated_at: {type: 'date', default: new Date()},
    //
    target_id: 'objectId',
    content: 'string',
    tag_id: 'objectId',
  },
  primaryKey: '_id',
};
