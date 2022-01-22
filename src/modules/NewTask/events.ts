import {NewTaskStore} from './store/NewTask.store';
export type NewTaskEvents = {
  NEW_TASK_INITIAL_DATA: Pick<NewTaskStore, 'count'>;
};
