import {TaskListStore} from './store/TaskList.store';
export type TaskListEvents = {
  TASKLIST_INITIAL_DATA: Pick<TaskListStore, 'tasks'>;
};
