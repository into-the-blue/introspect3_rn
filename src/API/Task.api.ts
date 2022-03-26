import {COLLECTIONS, createDoc, retriveDoc, deleteDocFromObjectId} from '@/DB';
import {ITask} from '@/types/task.type';
import {getLocalFilePath} from '@/utils';

const _taskWithLocalImgConverter = (task: ITask) => {
  if (task.image.source === 'unsplash') return task;
  return {
    ...task,
    image: {
      ...task.image,
      imageUrl: getLocalFilePath(task.image.imageUrl),
    },
  };
};
export class TaskAPI {
  static createTask = async (
    task: Pick<ITask, 'title' | 'image'>,
  ): Promise<ITask> => {
    const obj = (await createDoc(COLLECTIONS.Task, task)) as ITask;
    return _taskWithLocalImgConverter(obj);
  };

  static getAllTasks = async () => {
    const tasks = await retriveDoc<ITask>(COLLECTIONS.Task);
    return tasks.map(_taskWithLocalImgConverter);
  };

  static deleteTask = (id: string) => {
    return deleteDocFromObjectId(COLLECTIONS.Task, id);
  };
}
