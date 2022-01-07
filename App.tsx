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
import {TaskList} from './src/pages/TaskList';
import {TaskDetail} from './src/pages/TaskDetail';

Navigation.registerComponent('TaskDetail', () => TaskDetail);
Navigation.registerComponent('TaskList', () => TaskList);
