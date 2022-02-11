import {CreateTaskItemSlot} from './CreateTaskItemSlot.view';
import {CreateTaskItemSlotController} from './CreateTaskItemSlot.controller';
import {CreateTaskItemSlotService} from './service/CreateTaskItemSlot.service';
import {CreateTaskItemSlotStore} from './store/CreateTaskItemSlot.store';
import {connect} from '@/utils';
export * from './event/CreateTaskItemSlot.event';
export {
  CreateTaskItemSlot,
  CreateTaskItemSlotController,
  CreateTaskItemSlotService,
  CreateTaskItemSlotStore,
};

export const CreateTaskItemSlotPage = (() => {
  const generateStoreController = ({navigation}: any) => {
    const store = CreateTaskItemSlotStore.getNamedStore('CreateTaskItemSlot');
    const service = CreateTaskItemSlotService.new({store, navigation});
    const controller = CreateTaskItemSlotController.new({service});
    return {controller, store};
  };
  return connect(generateStoreController)(CreateTaskItemSlot);
})();
