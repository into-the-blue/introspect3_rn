/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {Navigation} from 'react-native-navigation';
import {TaskListPage} from './src/pages/TaskList';
import {TaskDetailPage} from './src/pages/TaskDetail';

Navigation.registerComponent('TaskDetail', () => TaskDetailPage);
Navigation.registerComponent('TaskList', () => TaskListPage);
