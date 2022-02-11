import {TaskItemSlots} from './TaskItemSlots.view';
import {TaskItemSlotsController} from './TaskItemSlots.controller';
import {TaskItemSlotsService} from './service/TaskItemSlots.service';
import {TaskItemSlotsStore} from './store/TaskItemSlots.store';
import {connect} from '@/utils';
export * from './event/TaskItemSlots.event';
export {
  TaskItemSlots,
  TaskItemSlotsController,
  TaskItemSlotsService,
  TaskItemSlotsStore,
};

export const TaskItemSlotsPage = (() => {
  const generateStoreController = ({navigation}: any) => {
    const store = TaskItemSlotsStore.getNamedStore('TaskItemSlots');
    const service = TaskItemSlotsService.new({store, navigation});
    const controller = TaskItemSlotsController.new({service});
    return {controller, store};
  };
  return connect(generateStoreController)(TaskItemSlots);
})();
