import {CreateTaskItem} from './CreateTaskItem.view';
import {CreateTaskItemController} from './CreateTaskItem.controller';
import {CreateTaskItemService} from './service/CreateTaskItem.service';
import {CreateTaskItemStore} from './store/CreateTaskItem.store';
import {connect} from '@/utils';
export * from './event/CreateTaskItem.event';
export {
  CreateTaskItem,
  CreateTaskItemController,
  CreateTaskItemService,
  CreateTaskItemStore,
};

export const CreateTaskItemPage = (() => {
  const generateStoreController = ({navigation}: any) => {
    const store = CreateTaskItemStore.getNamedStore('CreateTaskItem');
    const service = CreateTaskItemService.new({store, navigation});
    const controller = CreateTaskItemController.new({service});
    return {controller, store};
  };
  return connect(generateStoreController)(CreateTaskItem);
})();
