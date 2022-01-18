import {connect} from '@/utils';
import {
  TaskList,
  TaskListController,
  TaskListStore,
  TaskListService,
} from './TaskList';
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
// <HOOK> connect module here </HOOK>
