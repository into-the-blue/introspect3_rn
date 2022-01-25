import {TaskItem} from '@/modules/Task/components/TaskItem';
import Realm from 'realm';
import {
  TaskSchema,
  TagSchema,
  TaskItemSchema,
  TaskItemSlotSchema,
  FeedbackSchema,
} from './schemas';

export const DB = new Realm({
  path: 'introspect_3',
  schema: [
    TaskSchema,
    TagSchema,
    TaskItemSchema,
    TaskItemSlotSchema,
    FeedbackSchema,
  ],
});
export const COLLECTIONS = {
  Task: TaskSchema.name,
  Tag: TagSchema.name,
  TaskItem: TaskItemSchema.name,
  TaskItemSlot: TaskItemSchema.name,
  Feedback: FeedbackSchema.name,
};
