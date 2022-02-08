import {COLLECTIONS, retriveDoc} from '@/DB';
import {ITaskItem} from '@/types';
import {ObjectId} from 'bson';

export class TaskItemAPI {
  static getAllItems = (taskId: string) => {
    return retriveDoc<ITaskItem>(
      COLLECTIONS.TaskItem,
      'task_id = $0',
      new ObjectId(taskId),
    );
  };
}
