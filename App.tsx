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
import {
  TaskListPage,
  TaskDetailPage,
  // <HOOK> import new Page here </HOOK>
} from './src/modules';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'TaskList'}>
        <Stack.Screen name={'TaskList'} component={TaskListPage} />
        <Stack.Screen name={'TaskDetail'} component={TaskDetailPage} />
        {/* <HOOK> register new page here </HOOK> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
