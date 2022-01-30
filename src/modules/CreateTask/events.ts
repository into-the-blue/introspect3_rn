import {CreateTaskStore} from './store/CreateTask.store';
export type CreateTaskEvents = {
  CREATE_TASK_INITIAL_DATA: Pick<CreateTaskStore, 'count'>;
};
