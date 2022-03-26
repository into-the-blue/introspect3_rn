import {ITask} from '@/types/task.type';
import {CreateTaskStore} from '../store/CreateTask.store';
export type CreateTaskEvents = {
  CREATE_TASK_INITIAL_DATA: ITask;
};
