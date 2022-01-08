import {TaskList} from './TaskList.view';
import {connect} from '@/utils/connect';
import {TaskListStore} from './store/TaskList.store';
export const TaskListPage = connect({
  taskListStore: TaskListStore.instance(),
})(TaskList);
