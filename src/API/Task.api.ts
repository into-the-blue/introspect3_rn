import {COLLECTIONS, createDoc, retriveDoc, deleteDocFromObjectId} from '@/DB';
import {ITask} from '@/types';
export class TaskAPI {
  static createTask = async (
    task: Pick<ITask, 'imageUrl' | 'title'>,
  ): Promise<ITask> => {
    return await createDoc(COLLECTIONS.Task, task);
  };

  static getAllTasks = async () => {
    return retriveDoc<ITask>(COLLECTIONS.Task);
  };

  static deleteTask = async (id: string) => {
    return deleteDocFromObjectId(COLLECTIONS.Task, id);
  };
}
