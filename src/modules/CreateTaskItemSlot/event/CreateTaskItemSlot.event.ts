import {CreateTaskItemSlotStore} from '../store/CreateTaskItemSlot.store';
export type CreateTaskItemSlotEvents = {
  CREATE_TASK_ITEM_SLOT_INITIAL_DATA: Pick<CreateTaskItemSlotStore, 'count'>;
};
