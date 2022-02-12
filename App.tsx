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
  CreateTaskItemPage,
  TaskItemSlotsPage,
  CreateTaskItemSlotPage,
  TagsPage,
  // <HOOK> import new Page here </HOOK>
} from './src/modules';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet, LogBox} from 'react-native';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import {setupSentry} from './src/configs';
import * as Sentry from '@sentry/react-native';
LogBox.ignoreLogs(['Require cycle:']);

setupSentry();
const Stack = createNativeStackNavigator();
// https://ethercreative.github.io/react-native-shadow-generator/
const tailwindExtensions = {
  shadow: {
    style: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 13,
    },
  },
};
const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <TailwindProvider utilities={{...utilities, ...tailwindExtensions}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'TaskList'}>
            <Stack.Screen name={'TaskList'} component={TaskListPage} />
            <Stack.Screen name={'Task'} component={TaskPage} />
            <Stack.Screen name={'CreateTask'} component={CreateTaskPage} />
            <Stack.Screen
              name={'CreateTaskItem'}
              component={CreateTaskItemPage}
            />
            <Stack.Screen
              name={'TaskItemSlots'}
              component={TaskItemSlotsPage}
            />
            <Stack.Screen
              name={'CreateTaskItemSlot'}
              component={CreateTaskItemSlotPage}
            />
            <Stack.Screen name={'Tags'} component={TagsPage} />
            {/* <HOOK> register new page here </HOOK> */}
          </Stack.Navigator>
        </NavigationContainer>
      </TailwindProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Sentry.wrap(App);
