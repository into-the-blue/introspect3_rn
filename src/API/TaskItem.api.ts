import {COLLECTIONS, retriveDoc, createDoc} from '@/DB';
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

  static createItem = (
    taskId: string,
    item: Pick<ITaskItem, 'content' | 'title' | 'backgroundColor'>,
  ): Promise<ITaskItem> => {
    return createDoc(COLLECTIONS.TaskItem, {
      taskId,
      ...item,
    });
  };
}
