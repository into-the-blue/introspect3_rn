import {TaskItemSlotsStore} from '../store/TaskItemSlots.store';
export type TaskItemSlotsEvents = {
  TASK_ITEM_SLOTS_INITIAL_DATA: Pick<TaskItemSlotsStore, 'count'>;
};
