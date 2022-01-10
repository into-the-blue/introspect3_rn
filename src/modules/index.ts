import {connect} from '@/utils';
import {
  TaskListStore,
  // <HOOK> import module store here </HOOK>
} from '@/stores';
import {TaskList, TaskListController} from './TaskList';
// <HOOK> import module view controller here </HOOK>

export const TaskListPage = connect(TaskListController.new(), {
  store: TaskListStore,
})(TaskList);
// <HOOK> connect module here </HOOK>
