import {ObjectSchema} from 'realm';

export const FeedbackSchema: ObjectSchema = {
  name: 'Feedbacks',
  properties: {
    _id: 'objectId',
    created_at: 'date',
    updated_at: 'date',
    //
    target_id: 'objectId',
    content: 'string',
    tag_id: 'objectId',
  },
  primaryKey: '_id',
};
