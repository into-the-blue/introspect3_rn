import {CreateTaskItemStore} from '../store/CreateTaskItem.store';
export type CreateTaskItemEvents = {
  CREATE_TASK_ITEM_INITIAL_DATA: Pick<CreateTaskItemStore, 'task'>;
};
