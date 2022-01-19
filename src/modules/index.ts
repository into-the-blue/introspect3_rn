import {connect} from '@/utils';
import {
  TaskList,
  TaskListController,
  TaskListStore,
  TaskListService,
} from './TaskList';
import {Task, TaskController, TaskStore, TaskService} from './Task';
// <HOOK> import module properties here </HOOK>

export const TaskListPage = (() => {
  const generateStoreController = ({navigation}: any) => {
    const store = TaskListStore.getNamedStore('TaskList');
    const service = TaskListService.new({store, navigation});
    const controller = TaskListController.new({service});
    return {
      controller,
      store,
    };
  };
  return connect(generateStoreController)(TaskList);
})();
export const TaskPage = (() => {
  const generateStoreController = ({navigation}: any) => {
    const store = TaskStore.getNamedStore('Task');
    const service = TaskService.new({store, navigation});
    const controller = TaskController.new({service});
    return {controller, store};
  };
  return connect(generateStoreController)(Task);
})();
// <HOOK> connect module here </HOOK>
