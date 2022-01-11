import {connect} from '@/utils';
import {
  TaskListStore,
  TaskDetailStore,
  // <HOOK> import module store here </HOOK>
} from '@/stores';
import {TaskList, TaskListController} from './TaskList';
import {TaskDetail, TaskDetailController} from './TaskDetail';
// <HOOK> import module view controller here </HOOK>

export const TaskListPage = connect(TaskListController.new(), {
  store: TaskListStore.getReservedStore,
})(TaskList);
export const TaskDetailPage = connect(TaskDetailController.new(), {
  store: TaskDetailStore.getReservedStore,
})(TaskDetail);
// <HOOK> connect module here </HOOK>
