import {TaskStore} from '../store/Task.store';
export type TaskEvents = {
  TASK_INITIAL_DATA: Pick<TaskStore, 'task'>;
};
