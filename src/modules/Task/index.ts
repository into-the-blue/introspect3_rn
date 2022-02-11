import {Task} from './Task.view';
import {TaskController} from './Task.controller';
import {TaskService} from './service/Task.service';
import {TaskStore} from './store/Task.store';
import {connect} from '@/utils';
export * from './event/Task.event';
export {Task, TaskController, TaskService, TaskStore};

export const TaskPage = (() => {
  const generateStoreController = ({navigation}: any) => {
    const store = TaskStore.getNamedStore('Task');
    const service = TaskService.new({store, navigation});
    const controller = TaskController.new({service});
    return {controller, store};
  };
  return connect(generateStoreController)(Task);
})();
