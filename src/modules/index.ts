import {connect} from '@/utils';
import {
  TaskList,
  TaskListController,
  TaskListStore,
  TaskListService,
} from './TaskList';
import {Task, TaskController, TaskStore, TaskService} from './Task';
import {
  CreateTask,
  CreateTaskController,
  CreateTaskStore,
  CreateTaskService,
} from './CreateTask';
import {
  CreateTaskItem,
  CreateTaskItemController,
  CreateTaskItemStore,
  CreateTaskItemService,
} from './CreateTaskItem';
import {
  TaskItemSlots,
  TaskItemSlotsController,
  TaskItemSlotsStore,
  TaskItemSlotsService,
} from './TaskItemSlots';
import {
  CreateTaskItemSlot,
  CreateTaskItemSlotController,
  CreateTaskItemSlotStore,
  CreateTaskItemSlotService,
} from './CreateTaskItemSlot';
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
export const CreateTaskPage = (() => {
  const generateStoreController = ({navigation}: any) => {
    const store = CreateTaskStore.getNamedStore('CreateTask');
    const service = CreateTaskService.new({store, navigation});
    const controller = CreateTaskController.new({service});
    return {controller, store};
  };
  return connect(generateStoreController)(CreateTask);
})();
export const CreateTaskItemPage = (() => {
  const generateStoreController = ({navigation}: any) => {
    const store = CreateTaskItemStore.getNamedStore('CreateTaskItem');
    const service = CreateTaskItemService.new({store, navigation});
    const controller = CreateTaskItemController.new({service});
    return {controller, store};
  };
  return connect(generateStoreController)(CreateTaskItem);
})();
export const TaskItemSlotsPage = (() => {
  const generateStoreController = ({navigation}: any) => {
    const store = TaskItemSlotsStore.getNamedStore('TaskItemSlots');
    const service = TaskItemSlotsService.new({store, navigation});
    const controller = TaskItemSlotsController.new({service});
    return {controller, store};
  };
  return connect(generateStoreController)(TaskItemSlots);
})();
export const CreateTaskItemSlotPage = (() => {
  const generateStoreController = ({navigation}: any) => {
    const store = CreateTaskItemSlotStore.getNamedStore('CreateTaskItemSlot');
    const service = CreateTaskItemSlotService.new({store, navigation});
    const controller = CreateTaskItemSlotController.new({service});
    return {controller, store};
  };
  return connect(generateStoreController)(CreateTaskItemSlot);
})();
// <HOOK> connect module here </HOOK>
