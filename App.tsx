/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import {Text, View} from 'react-native';
import {
  TaskListPage,
  TaskDetailPage,
  // <HOOK> import new Page here </HOOK>
} from './src/modules';
import {NavigationContainer} from '@react-navigation/native';
// Navigation.registerComponent('TaskList', () => TaskListPage);
// Navigation.registerComponent('TaskDetail', () => TaskDetailPage);
// <HOOK> register new page here </HOOK>

export default function App() {
  return (
    <NavigationContainer>
      <View>
        <Text>{'hello world'}</Text>
      </View>
    </NavigationContainer>
  );
}
