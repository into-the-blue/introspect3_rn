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
  TaskPage,
  CreateTaskPage,
  // <HOOK> import new Page here </HOOK>
} from './src/modules';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'TaskList'}>
          <Stack.Screen name={'TaskList'} component={TaskListPage} />
          <Stack.Screen name={'Task'} component={TaskPage} />
          <Stack.Screen name={'CreateTask'} component={CreateTaskPage} />
          {/* <HOOK> register new page here </HOOK> */}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
