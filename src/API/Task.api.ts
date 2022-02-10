import {COLLECTIONS, createDoc, retriveDoc, deleteDocFromObjectId} from '@/DB';
import {ITask} from '@/types';
export class TaskAPI {
  static createTask = (
    task: Pick<ITask, 'title' | 'image'>,
  ): Promise<ITask> => {
    return createDoc(COLLECTIONS.Task, task);
  };

  static getAllTasks = () => {
    return retriveDoc<ITask>(COLLECTIONS.Task);
  };

  static deleteTask = (id: string) => {
    return deleteDocFromObjectId(COLLECTIONS.Task, id);
  };
}
