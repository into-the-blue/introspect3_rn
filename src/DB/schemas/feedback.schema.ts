import {ObjectSchema} from 'realm';

export const FeedbackSchema: ObjectSchema = {
  name: 'Feedbacks',
  properties: {
    _id: {type: 'objectId'},
    created_at: {type: 'date'},
    updated_at: {type: 'date'},
    //
    target_id: 'objectId',
    content: 'string',
    tag_id: 'objectId',
  },
  primaryKey: '_id',
};
