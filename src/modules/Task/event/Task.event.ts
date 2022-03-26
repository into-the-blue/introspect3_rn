import {ITaskItem} from '@/types/task.type';
import {TaskStore} from '../store/Task.store';
export type TaskEvents = {
  TASK_INITIAL_DATA: Pick<TaskStore, 'task'>;
  TASK_ON_NEW_ITEM: ITaskItem;
};
