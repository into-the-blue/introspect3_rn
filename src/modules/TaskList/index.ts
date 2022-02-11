import {TaskList} from './TaskList.view';
import {TaskListController} from './TaskList.controller';
import {TaskListService} from './service/TaskList.service';
import {TaskListStore} from './store/TaskList.store';
import {connect} from '@/utils';
export * from './event/TaskList.event';
export {TaskList, TaskListController, TaskListService, TaskListStore};

export const TaskListPage = (() => {
  const generateStoreController = ({navigation}: any) => {
    const store = TaskListStore.getNamedStore('TaskList');
    const service = TaskListService.new({store, navigation});
    const controller = TaskListController.new({service});
    return {controller, store};
  };
  return connect(generateStoreController)(TaskList);
})();
