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
import {
  TaskListPage,
  TaskDetailPage,
  // <HOOK> import new Page here </HOOK>
} from './src/modules';

Navigation.registerComponent('TaskList', () => TaskListPage);
Navigation.registerComponent('TaskDetail', () => TaskDetailPage);
// <HOOK> register new page here </HOOK>
