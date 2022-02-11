import {CreateTask} from './CreateTask.view';
import {CreateTaskController} from './CreateTask.controller';
import {CreateTaskService} from './service/CreateTask.service';
import {CreateTaskStore} from './store/CreateTask.store';
import {connect} from '@/utils';
export * from './event/CreateTask.event';
export {CreateTask, CreateTaskController, CreateTaskService, CreateTaskStore};

export const CreateTaskPage = (() => {
  const generateStoreController = ({navigation}: any) => {
    const store = CreateTaskStore.getNamedStore('CreateTask');
    const service = CreateTaskService.new({store, navigation});
    const controller = CreateTaskController.new({service});
    return {controller, store};
  };
  return connect(generateStoreController)(CreateTask);
})();
