import {connect} from '@/utils';
import {TaskListStore} from '@/stores';
import {TaskList, TaskListController} from './TaskList';

export const TaskListPage = connect(TaskListController.new(), {
  store: TaskListStore,
})(TaskList);
